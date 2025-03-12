import * as jwtDecode from 'jwt-decode'



export const saveToken = (token) => localStorage.setItem('jwtToken', token);
export const getToken = () => localStorage.getItem('jwtToken');

export const logout = () => localStorage.removeItem('jwtToken');

export const isLoggedIn = () => !!localStorage.getItem('jwtToken');


export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode(token)
    } catch (error) {
        return null
    }
}
