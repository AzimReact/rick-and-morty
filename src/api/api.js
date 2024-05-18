import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

export const fetchData = async (responseData, selectedStatus, selectedName, page) => {
  try {
    let params = {}

    if (selectedStatus?.value) params.status = selectedStatus.value
    if (selectedName?.value) params.name = selectedName.value
    if (page) params.page = page

    const response = await axiosInstance.get('/character', { params })
    responseData.value = response.data

  } catch (error) {
    if (error.response.status === 404) {
      alert('There is no such name!')
    } else {
      alert(`Error: ${error.response.status}`)
    }
    console.error('Error fetching data:', error)
  }
}