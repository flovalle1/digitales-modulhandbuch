"use client";
import { createLecturer, updateLecturer } from "@/actions/mutations";
import { Button, TextField } from "@mui/material";
import { Lecturer } from "@prisma/client";
import { useNotifications } from "@toolpad/core";
import { useState } from "react";

export interface CreateLecturerFormProps {
    lecturerData?: Lecturer;
}

export default function CreateLecturerForm({ lecturerData }: CreateLecturerFormProps) {
    const [name, setName] = useState(lecturerData?.name || "");
    const notification = useNotifications();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name };

        if (lecturerData?.id) {
            const resp = await updateLecturer(lecturerData.id, data);
            notification.show(resp.name + ' wurde erfolgreich aktualisiert.', {
                severity: "success",
                autoHideDuration: 3000,
            });
        } else {
            const resp = await createLecturer({ ...data });
            notification.show(resp.name + ' wurde erfolgreich angelegt.', {
                severity: "success",
                autoHideDuration: 3000,
            });
        }
        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                {lecturerData ? "Dozent aktualisieren" : "Dozent erstellen"}
            </Button>
        </form>
    );
}
