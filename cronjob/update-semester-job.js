const fetch = require('node-fetch');

// Get environment variables
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/updatesemester';
const API_KEY = process.env.API_KEY || '';

async function callUpdateSemesterAPI() {
    console.log(`[${new Date().toISOString()}] Running update semester cronjob...`);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`[${new Date().toISOString()}] Success:`, data.message);
        } else {
            console.error(`[${new Date().toISOString()}] Error:`, data.error);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to call API:`, error.message);
    }
}

callUpdateSemesterAPI();
