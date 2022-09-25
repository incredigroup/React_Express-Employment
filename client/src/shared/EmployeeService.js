import axios from 'axios'
import * as AuthService from './AuthService'

const api_base = 'http://localhost:3001'

export function getEmployees () {
  return axios.get(api_base + '/employee/list')
}

export function getEmployee (id) {
  return axios.post(api_base + '/employee/get', {id: id})
}

export function editEmployee (data) {
  return axios.post(api_base + '/employee/update', data)
}

export function deleteEmployee (targetUserid) {
  const data = {
    userid: targetUserid
  }
  return axios.get(api_base + `/employee/delete/${targetUserid}`)
}

export function createEmployee (data) {
  return axios.post(api_base + '/employee/create', data)
}
