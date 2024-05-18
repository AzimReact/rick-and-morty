import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_HOST

const axiosInstance = axios.create({
  baseURL,
})

export const fetchData = async ({ status, name, page }) => {
  try {
    let params = {}
    if (status) params.status = status
    if (name) params.name = name
    if (page) params.page = page

    const response = await axiosInstance.get('/character', { params })

    return { items: response?.data?.results, pages: response?.data?.info?.pages }

  } catch (error) {
    if (error.response.status === 404) {
      alert('There is no such name!')
    }
    throw error
  }
}