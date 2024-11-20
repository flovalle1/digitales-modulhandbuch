"use client"
import { useSession } from "next-auth/react";

export default function Admin() {
    const { data: session } = useSession()

    console.log(session)
    if (session?.user) {
        return <p>You are an admin, welcome!</p>
    }
    return (
        <div>
            <h1>Admin</h1>
        </div>
    );
}