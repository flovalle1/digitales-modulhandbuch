import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export type FieldOfStudy = {
    id: string,
    content: GridColDef[]
}

export const getFieldOfStudy = (id: string) => {
    switch (id) {
        case "cs":
            return cs;
        case "bio-cs":
            return bio_cs;
        case "media-cs":
            return media_cs;
        case "medic-cs":
            return medic_cs;
        default:
            return cs;
    }
}

export const cs = {
    id: "Informatik",
    content: [
        {
            field: 'mandatory',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'practical_cs',
            headerName: 'Praktische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'theoretical_cs',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'technical_cs',
            headerName: 'Technische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'proseminar',
            headerName: 'Proseminar',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        }
    ]
}

export const bio_cs = {
    id: "Bioinformatik",
    content: [
        {
            field: 'mandatory',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'bioinfo',
            headerName: 'Wahlpflicht Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const media_cs = {
    id: "Medieninformatik",
    content: [
        {
            field: 'mandatory',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mediascience',
            headerName: 'Wahlpflicht Medienwissenschaften',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mediainfo',
            headerName: 'Wahlpflicht Medieninformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const medic_cs = {
    id: "Medizininformatik",
    content: [
        {
            field: 'mandatory',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mediascience',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mediainfo',
            headerName: 'Wahlpflicht Medizininformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}