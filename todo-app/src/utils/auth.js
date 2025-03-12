import { jwtDecode } from 'jwt-decode'

export const getLoggedInUser = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) return null

    try {
        const decoded = jwtDecode(token)
        return decoded
    }
    catch (error) {
        return null;
    }
}