const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();

const port = 3002;

app.use(express.json());

// Simple Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.post('/deploy', (req, res) => {
    const scriptPath = process.env.SCRIPT_PATH || 'deploy.sh';

    console.log(`Führe Skript aus: ${scriptPath}`);

    exec(`./${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler beim Ausführen: ${error.message}`);
            return res.status(500).json({
                success: false,
                error: error.message,
                stderr: stderr
            });
        }

        if (stderr) {
            console.warn(`Stderr: ${stderr}`);
        }

        return res.json({
            success: true,
            output: stdout,
            warnings: stderr
        });
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Produktionsserver läuft auf Port ${port}`);
});