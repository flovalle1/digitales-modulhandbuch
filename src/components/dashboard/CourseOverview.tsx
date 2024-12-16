'use client';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';

export interface CourseOverwievProps {
    courses: Course[];
}

export default function CourseOverwiev({ courses }: CourseOverwievProps) {
    const router = useRouter();

    const columns: GridColDef[] = [

        { field: 'id', headerName: 'ID' },
        { field: 'code', headerName: 'Kennung' },
        { field: 'title', headerName: 'Vorlsungstitel' },
        { field: 'lecturer', headerName: 'Dozent' },
        {
            field: 'edit',
            headerName: 'Kurs Bearbeiten',

            renderCell: (params) => (
                <Button
                    variant='contained'
                    size='small'
                    href={`/backend/courses/edit/${params.row.id}`}
                    style={{ marginLeft: 'auto' }}
                >
                    Öffnen
                </Button>
            ),
        },
    ];

    const rows = courses.map((course) => {
        return { id: course.id, code: course.code, title: course.title, lecturer: course.lecturer };
    });

    // const handleRowClick = (params: GridRowParams) => {
    //     router.push(`backend/courses/edit/${params.row.id}`);
    // };

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                autosizeOptions={{
                    columns: ['id', 'code', 'title', 'lecturer', 'edit'],
                    includeOutliers: true,
                    includeHeaders: true,
                }}
                sx={{ border: 0 }}
                //onRowClick={handleRowClick}
                autosizeOnMount
            />
        </Paper>
    );
}


