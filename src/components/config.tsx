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
        case "cs-master":
            return cs_master;
        case "bio-cs-master":
            return bio_cs_master;
        case "media-cs-master":
            return media_cs_master;
        case "medic-cs-master":
            return medic_cs_master;
        case "machine-learning-master":
            return ml_master;
        default:
            return cs;
    }
}

export const getHeaderName = (field: string): { assignment: string, fieldOfStudy: string } | null => {
    for (const fieldOfStudy of allTypeOfStudies) {
        const column = fieldOfStudy.content.find(col => col.field === field);
        if (column) {
            return {
                assignment: column.headerName || '',
                fieldOfStudy: fieldOfStudy.id
            };
        }
    }
    return null;
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
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'mandatory_proseminar_cs',
            headerName: 'Pflichtbereich Proseminar',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_practical_cs',
            headerName: 'Praktische Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_theoretical_cs',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_technical_cs',
            headerName: 'Technische Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_cs',
            headerName: 'Technische Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
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
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_bioinfo_bio_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 200,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
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
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_mediainfo_media_cs',
            headerName: 'Wahlpflicht Medieninformatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_info_media_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
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
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'elective_mediabioinf_medic_cs',
            headerName: 'Wahlpflicht Informatik',
            width: 150,
            renderHeader: (params) => (
                <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.colDef.headerName}
                </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }
                } /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

//_____________________MASTERS______________________

export const cs_master: FieldOfStudy = {
    id: "Informatik Master",
    content: [
        {
            field: 'practical_cs_master',
            headerName: 'Praktische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'theoretical_cs_master',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'technical_cs_master',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info_cs_master',
            headerName: 'Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
    ]
}

export const bio_cs_master: FieldOfStudy = {
    id: "Bioinformatik Master",
    content: [
        {
            field: 'sequence_bio_cs_master',
            headerName: 'Sequence Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'structure_system_bio_cs_master',
            headerName: 'Struktur und System Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'bio_cs_master',
            headerName: 'Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'research_bio_cs_master',
            headerName: 'Bioinformatik, Forschungsmodul',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'practical_bio_cs_master',
            headerName: 'Praktische Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'practical_info_bio_cs_master',
            headerName: 'Praktische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'theoretical_info_bio_cs_master',
            headerName: 'Theoretische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info_bio_cs_master',
            headerName: 'Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        }
    ]
}

export const media_cs_master: FieldOfStudy = {
    id: "Medieninformatik Master",
    content: [
        {
            field: 'hci_media_production_media_cs_master',
            headerName: 'Mensch- Computer- Interaktion und Medienproduktion',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'web_internet_media_cs_master',
            headerName: 'Webprogrammierung und Internet',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'graphics_visual_media_cs_master',
            headerName: 'Computergrafik und Visual Computing',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'multimedia_tech_media_cs_master',
            headerName: 'Multimediatechnik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'media_cs_master',
            headerName: 'Medieninformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'practical_media_cs_master',
            headerName: 'Medieninformatik Praxis',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'advanced_media_cs_info_master',
            headerName: 'Vertiefung Medieninformatik und Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'advanced_media_cs_application_master',
            headerName: 'Vertiefung Medieninformatik und Anwendung',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        }
    ]
}

export const medic_cs_master: FieldOfStudy = {
    id: "Medizininformatik Master",
    content: [
        {
            field: 'advanced_medic_cs_master',
            headerName: 'Fortgeschrittene Medizininformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'advanced_bio_medic_cs_master',
            headerName: 'Fortgeschrittene Bioinformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'research_medic_cs_master',
            headerName: 'Forschungsprojekt',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'medic_cs_master',
            headerName: 'Medizininformatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'biomedical_medic_cs_master',
            headerName: 'Biomedizinische Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'medical_tech_medic_cs_master',
            headerName: 'Medizintechnik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info_medic_cs_master',
            headerName: 'Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        }
    ]
}

export const ml_master: FieldOfStudy = {
    id: "Machine Learning Master",
    content: [
        {
            field: 'basics_ml_master',
            headerName: 'Grundlagen Machine Learning',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'diverse_ml_master',
            headerName: 'Diverse Themen Machine Lerning',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        },
        {
            field: 'info_ml_master',
            headerName: 'Informatik',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
            ),
        }
    ]
}

export const allTypeOfStudies = [cs, bio_cs, media_cs, medic_cs, cs_master, bio_cs_master, media_cs_master, medic_cs_master, ml_master];