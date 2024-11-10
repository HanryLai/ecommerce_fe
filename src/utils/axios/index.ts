import axios from 'axios'
import { URL_Zy } from '../../../env'

// Create an Axios instance
const api = axios.create({
	baseURL: URL_Zy,
})
// Function to set the access token
export const setAccessToken = (token: string) => {
	api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Add a request interceptor
api.interceptors.request.use(
	(config) => {
		const token = api.defaults.headers.common['Authorization']
		if (token) {
			config.headers['Authorization'] = token
		}
		console.log(config.headers)
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default api
