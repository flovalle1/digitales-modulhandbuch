"use client"
import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignIn() {
    return (
        <form
            action={async (formData) => {
                const formDataObj = Object.fromEntries(formData.entries());
                await signIn('credentials', formDataObj, { redirectTo: '/admin' });
            }}
        >
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Addresse"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </form>
    )
}