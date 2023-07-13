import axios from '@/plugins/axios'
import { getUserAccountId } from '@/utils/token'

const UPDATE = '/file/update'
const LIST = '/images/user'
const LIKE_LIST = '/images/user/liked'
const LIKE = '/images/like'
const DISLIKE = '/file/dislike'
const DELETE = '/images'
const TRASH = '/file/trash'
const UNDO = '/file/undo'
const REMOVE = '/file/remove'
const DOWNLOAD = '/images/download'
const USER_INFO = '/users/info'

export async function getListPhoto() {
  try {
    const user = await axios.get(`${USER_INFO}`)
    const data = await axios.get(`${LIST}/${user.id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function getLikeListPhoto() {
  try {
    const userAccountId = getUserAccountId()
    const data = await axios.get(`${LIKE_LIST}/${userAccountId}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function updatePhotoInfo(payload) {
  try {
    const { data } = await axios.post(`${UPDATE}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function likePhoto(id) {
  try {
    const { data } = await axios.post(`${LIKE}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function dislikePhoto(id) {
  try {
    const { data } = await axios.post(`${DISLIKE}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function deletePhoto(id) {
  try {
    const { data } = await axios.delete(`${DELETE}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function getListTrash() {
  try {
    const { data } = await axios.get(`${TRASH}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function removePhoto(id) {
  try {
    const { data } = await axios.delete(`${REMOVE}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function undoPhoto(id) {
  try {
    const { data } = await axios.post(`${UNDO}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function downloadFile(id) {
  try {
    const data = await axios.get(`${DOWNLOAD}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}
