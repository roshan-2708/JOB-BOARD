

const BASE_URL = import.meta.env.VITE_API_URL

export const authEndPoints = {
    REGISTER : '/auth/register',
    LOGIN : '/auth/login',
    GET_ME : '/auth/me',
}

export const jobEndpoints = {
    GET_ALL_JOBS: '/job',
    GET_JOB_BY_ID: '/job/:id',
    CREATE_JOB: '/job/create',
    GET_EMP_JOBS: '/job/employer/my-jobs',
    GET_JOB_APPLICATIONS: '/job/application/:jobId',
}

export const applicationEndPoints = {
    APPLY_FOR_JOB : '/application/apply/:jobId',
    UPDATE_APPLICATION_STATUS : '/application/:id/status',
    GET_MY_APPLICATION : '/application/my-applications',
}