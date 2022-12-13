import axios from '../utils/config/axios.config';

/**
 * Login Method
 * @param {string} email Email to login a user
 * @param {string} password Password to login a user
 * @returns
 */
export const login = (email: string, password: string) => {
  //* Declare body to post
  let body = {
    email,
    password,
  };

  //* Send POST request to login endpoint http://localhost:8000/api/auth/login
  return axios.post('/auth/login', body);
};

/**
 * Register Method
 * @param {string} name Name of user
 * @param {string} email Email of user
 * @param {string} password Password of user
 * @param {number} age Age of user
 * @returns
 */
export const register = (
  name: string,
  email: string,
  password: string,
  age: number
) => {
  //* Declare body to post
  let body = {
    name,
    email,
    password,
    age,
  };

  //* Send POST request to login endpoint http://localhost:8000/api/auth/register
  return axios.post('/auth/register', body);
};
