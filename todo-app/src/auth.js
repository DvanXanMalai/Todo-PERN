


export const saveToken = (token) => localStorage.setItem('jwtToken', token);
export const getToken = () => localStorage.getItem('jwtToken');

export const logout = () => localStorage.removeItem('jwtToken');

export const isLoggedIn = () => !!localStorage.getItem('jwtToken');


