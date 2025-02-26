"use client";
import { createUser } from '@/actions/mutations';
import { getLecturers } from '@/actions/queries';
import { Button, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Lecturer } from '@prisma/client';
import { NotificationsProvider, useNotifications } from '@toolpad/core';
import { useEffect, useState } from 'react';




export default function AddUserPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', lecturerId: 0 });
    const notification = useNotifications();
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);

    useEffect(() => {
        getLecturers().then(data => setLecturers(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLecturerChange = (event: SelectChangeEvent<number>) => {
        setFormData(prevForm => ({
            ...prevForm,
            lecturerId: event.target.value as number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.lecturerId === 0) {
            notification.show('Bitte wählen Sie einen Dozenten aus.', {
                severity: "error",
                autoHideDuration: 3000,
            });
            return;
        }

        try {
            await createUser(formData);
            notification.show(formData.name + ' wurde erfolgreich angelegt.', {
                severity: "success",
                autoHideDuration: 3000,
            });
            setFormData({ name: '', email: '', password: '', lecturerId: 0 });
        }
        catch (error) {
            notification.show('Es ist ein Fehler aufgetreten: ' + error, {
                severity: "error",
                autoHideDuration: 3000,
            });
        }

    };

    return (
        <NotificationsProvider>
            <Container>
                <Typography variant="h4" sx={{ mb: 2 }}>Neuen Benutzer anlegen</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="email"
                        value={formData.email}
                        label="E-Mail"
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="password"
                        label="Passwort"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControl sx={{ width: '100%', mb: 2 }} >
                        <InputLabel id="lecturer-label">Verknüpfter Dozent</InputLabel>
                        <Select
                            labelId="lecturer-label"
                            name="lecturerId"
                            input={<OutlinedInput id="lecturer-label" label="Verknüpfter Dozent" />}
                            value={formData.lecturerId || 0}
                            onChange={handleLecturerChange}
                            fullWidth
                        >
                            {lecturers.map((lecturer) => (
                                <MenuItem key={lecturer.id} value={lecturer.id}>
                                    {lecturer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">Erstellen</Button>
                </form>
            </Container>
        </NotificationsProvider>

    );
}
