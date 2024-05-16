import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

export const fetchData = async (responseData, selectedStatus, page) => {
  try {

    let url = '/character'
    if (selectedStatus?.value) {
      url += `/?status=${selectedStatus?.value}`
    }
    if (selectedStatus?.value === '' && page) {
      url += `/?page=${page}`
    }
    if (selectedStatus?.value !== '' && page) {
      url += `&page=${page}`
    }

    const response = await axiosInstance.get(url)
    responseData.value = response.data

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}