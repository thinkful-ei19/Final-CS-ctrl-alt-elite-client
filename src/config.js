export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://ctrl-alt-elite.herokuapp.com/api'
    : 'http://localhost:8080/api';

export const CLIENT_ORIGIN = 
    process.env.CLIENT_ORIGIN || 'http://localhost:3000'


    