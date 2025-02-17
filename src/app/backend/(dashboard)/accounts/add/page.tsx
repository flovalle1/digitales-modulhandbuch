"use client";
import { createUser } from '@/actions/mutations';
import { Button, Container, TextField, Typography } from '@mui/material';
import { NotificationsProvider, useNotifications } from '@toolpad/core';
import { useState } from 'react';




export default function AddUserPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const notification = useNotifications();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resp = await createUser(formData);

        setFormData({ name: '', email: '', password: '' });
        notification.show(resp.name + ' wurde erfolgreich angelegt.', {
            severity: "success",
            autoHideDuration: 3000,
        });
    };

    return (
        <NotificationsProvider>
            <Container>
                <Typography variant="h4" sx={{ mb: 2 }}>Neuen Benutzer anlegen</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="email"
                        label="E-Mail"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="password"
                        label="Passwort"
                        type="password"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit">Erstellen</Button>
                </form>
            </Container>
        </NotificationsProvider>

    );
}
