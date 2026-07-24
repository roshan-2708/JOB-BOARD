import api, { apiConnection } from '../utils/apiConnection';
import { authEndPoints, jobEndpoints, applicationEndPoints } from './apiEndPoinsts';

// auth endpoints

const {
    REGISTER,
    LOGIN,
    GET_ME,
    VERIFY_EMAIL,
} = authEndPoints;

export const register = async (userData) => {
    try {
        const response = await apiConnection("POST", REGISTER, userData);
        return response.data;
    } catch (error) {
        console.error('Register Error : ', error.response?.data || error.message);
        throw error;
    }
}

export const login = async (userData) => {
    try {
        const response = await apiConnection("POST", LOGIN, userData);
        return response.data;
    } catch (error) {
        console.error('login error :', error.response?.data || error.message);
        throw error;
    }
}

export const fetchMe = async () => {
    try {
        const response = await apiConnection("GET", GET_ME, null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return response.data;
    } catch (error) {
        console.error('fetchMe error :', error.response?.data || error.message);
        throw error;
    }
}

export const verifyEmailApi = async (token) => {
    try {
        const response = await apiConnection("GET", `${VERIFY_EMAIL}/${token}`);
        return response.data;
    } catch (error) {
        console.error('Verify Email Error: ', error.response?.data || error.message);
        throw error;
    }
}

// job endpoints

const {
    GET_ALL_JOBS,
    GET_JOB_BY_ID,
    CREATE_JOB,
    GET_EMP_JOBS,
    GET_JOB_APPLICATIONS,
    UPDATE_JOB,
} = jobEndpoints;

export const getAllJobs = async () => {
    try {
        const response = await apiConnection("GET", GET_ALL_JOBS, null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Get All Jobs Error : ', error.response?.data || error.message);
        throw error;
    }
}

export const getJobById = async (jobId) => {
    try {
        const response = await apiConnection('GET', GET_JOB_BY_ID.replace(':id', jobId), null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Get Job By Id Error : ', error.response?.data || error.message);
        throw error;
    }
}

export const postJob = async (jobData) => {
    try {
        const response = await apiConnection('POST', CREATE_JOB, jobData, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Post Job Error : ', error.response?.data || error.message);
        throw error;
    }
}

export const getEmpJobs = async () => {
    try {
        const response = await apiConnection("GET", GET_EMP_JOBS, null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Get Employer Jobs : ', error.response?.data || error.message);
        throw error;
    }
}

export const getJobApplication = async (jobId) => {
    try {
        const response = await apiConnection('GET', GET_JOB_APPLICATIONS.replace(':jobId', jobId), null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error("Get Job Application error : ", error.response?.data || error.message);
        throw error;
    }
}

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await apiConnection('PUT', UPDATE_JOB.replace(':id', jobId), jobData, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Update Job Error', error.response?.data || error.message);
        throw error;
    }
}

// application endpoints

const {
    APPLY_FOR_JOB,
    UPDATE_APPLICATION_STATUS,
    GET_MY_APPLICATION,
} = applicationEndPoints;

export const applyForJob = async (jobId, file) => {
    try {
        let formData = file;
        if (!(file instanceof FormData)) {
            formData = new FormData();
            formData.append('resume', file);
        }

        const response = await apiConnection("POST", APPLY_FOR_JOB.replace(':jobId', jobId), formData, {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        })
        return response.data;
    } catch (error) {
        console.error('Apply For Job error : ', error.response?.data || error.message);
        throw error;
    }
}

export const updateApplicationStatus = async (applicationId, statusData) => {
    try {
        const payload = typeof statusData === 'string' ? { status: statusData } : statusData;
        const response = await apiConnection('PUT', UPDATE_APPLICATION_STATUS.replace(':id', applicationId), payload, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        });
        return response.data;
    } catch (error) {
        console.error("Update Application status Error : ", error.response?.data || error.message);
        throw error;
    }
}

export const getMyApplication = async () => {
    try {
        const response = await apiConnection("GET", GET_MY_APPLICATION, null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        return response.data;
    } catch (error) {
        console.error('Get My Applications Error : ', error.response?.data || error.message);
        throw error;
    }
}