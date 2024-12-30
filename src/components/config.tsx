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

export const cs: FieldOfStudy = {
    id: "Informatik",
    content: [
        {
            field: 'mandatory_cs',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_mathematics_cs',
            headerName: 'Pflichtbereich Mathematik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_proseminar_cs',
            headerName: 'Pflichtbereich Proseminar',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_practical_cs',
            headerName: 'Praktische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_theoretical_cs',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_technical_cs',
            headerName: 'Technische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_cs',
            headerName: 'Technische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const bio_cs: FieldOfStudy = {
    id: "Bioinformatik",
    content: [
        {
            field: 'mandatory_bio_cs',
            headerName: 'Pflichtbereich',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_proseminar_bio_cs',
            headerName: 'Pflichtbereich Proseminar',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_bio_cs',
            headerName: 'Wahlpflicht Bioinformatik',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_bioinfo_bio_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const media_cs: FieldOfStudy = {
    id: "Medieninformatik",
    content: [
        {
            field: 'mandatory_media_cs',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_proseminar_media_cs',
            headerName: 'Pflichtbereich Proseminar',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_mediascience_media_cs',
            headerName: 'Wahlpflicht Medienwissenschaften',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_mediainfo_media_cs',
            headerName: 'Wahlpflicht Medieninformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_media_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const medic_cs: FieldOfStudy = {
    id: "Medizininformatik",
    content: [
        {
            field: 'mandatory_medic_cs',
            headerName: 'Pflichtbereich',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_proseminar_medic_cs',
            headerName: 'Pflichtbereich Proseminar',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_medic_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_mediabioinf_medic_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}