export const paths = {
    home: '/common',
    zuordnungstabelle: '/common/zuordnungstabelle',
    zuordnungstabelleFilter: (keyOfStudy: string) => `/common/zuordnungstabelle?studyFilter=${keyOfStudy}`,
    veranstaltungsverzeichnis: '/common/veranstaltungsverzeichnis',
    veranstaltungsverzeichnisFilter: (keyOfStudy: string) => `/common/veranstaltungsverzeichnis?studyFilter=${keyOfStudy}`,
    course: (id: string) => `/common/veranstaltungsverzeichnis#${id}`,
    dozenten: '/common/dozenten',
    dashboard: '/backend',
    signIn: '/backend/sign-in',
    singleCourse: (id: string) => `/common/zuordnungstabelle/${id}`
};