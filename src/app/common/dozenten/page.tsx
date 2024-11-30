import LecturerCard from '@/components/LecturerCard';
import { Stack } from '@mui/material';
import { Lecturer } from '@prisma/client';

const rows: Lecturer[] = [
    //GENERATE TEST DATA
]

export default function Veranstaltungsverzeichnisse() {
    return (

        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {rows.map((row) => (
                <LecturerCard {...row} />
            ))}
        </Stack>
    );
}