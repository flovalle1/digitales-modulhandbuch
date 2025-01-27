export const paths = {
    home: '/common',
    zuordnungstabelle: '/common/zuordnungstabelle',
    veranstaltungsverzeichnis: '/common/veranstaltungsverzeichnis',
    course: (id: string) => `/common/veranstaltungsverzeichnis#${id}`,
    dozenten: '/common/dozenten',
    dashboard: '/backend',
    signIn: '/backend/sign-in',
    singleCourse: (id: string) => `/backend/zuordnungstabelle/${id}`
};