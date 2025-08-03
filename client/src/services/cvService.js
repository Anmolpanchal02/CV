import axios from 'axios';

const API_URL = '/api/cv/';

const config = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const createCv = async (cvData, token) => {
    const response = await axios.post(API_URL, cvData, config(token));
    return response.data;
};

const getMyCvs = async (token) => {
    const response = await axios.get(API_URL, config(token));
    return response.data;
};

const getCvById = async (id, token) => {
    const response = await axios.get(API_URL + id, config(token));
    return response.data;
};

const updateCv = async (id, cvData, token) => {
    const response = await axios.put(API_URL + id, cvData, config(token));
    return response.data;
};

const deleteCv = async (id, token) => {
    const response = await axios.delete(API_URL + id, config(token));
    return response.data;
};

export default {
    createCv,
    getMyCvs,
    getCvById,
    updateCv,
    deleteCv,
};
