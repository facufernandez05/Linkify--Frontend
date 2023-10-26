// Users

import { BASE_URL } from './baseUrl'

export const userDataGet = id => {
  return `${BASE_URL}users/${id}/`
}

export const getUserByUsername = username => {
  return `${BASE_URL}user/${username}`
}

export const getAllUsers = `${BASE_URL}users/`

export const getAuthenticatedUser = `${BASE_URL}myprofile/`

export const deleteUserAccount = `${BASE_URL}user_delete/`

export const changePassword = `${BASE_URL}change_password/`

export const updateProfile = `${BASE_URL}update_profile/`

export const searchUsers = `${BASE_URL}search/`
