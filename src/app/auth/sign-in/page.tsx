import { signIn } from "@/auth";
import { TextField, Button, Box } from "@mui/material";

export default function SignIn() {
    return (
        <form
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
                console.log("Sign in successful")
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