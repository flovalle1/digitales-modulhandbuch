import LecturerCard from '@/components/LecturerCard';
import { Stack } from '@mui/material';
import { Lecturer } from '@prisma/client';

const rows: Lecturer[] = [
    {
        id: 1,
        name: 'John Doe',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z'),
    },
    {
        id: 2,
        name: 'Jane Smith',
        createdAt: new Date('2023-02-01T00:00:00Z'),
        updatedAt: new Date('2023-02-01T00:00:00Z'),
    }
]

export default function Veranstaltungsverzeichnisse() {
    return (

        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {rows.map((row) => (
                <LecturerCard key={row.id} {...row} />
            ))}
        </Stack>
    );
}