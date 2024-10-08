import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const comment = (comment, id) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then((response) => response.data)
}

export default { getAll, setToken, create, update, remove, comment }
