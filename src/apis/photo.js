import axios from '@/plugins/axios'

const UPDATE = '/file/update'
const LIST = '/file'
const LIKE_LIST = '/file/like'
const LIKE = '/file/like'
const DISLIKE = '/file/dislike'
const DELETE = '/file/delete'
const TRASH = '/file/trash'
const UNDO = '/file/undo'
const REMOVE = '/file/remove'
const PARTNER = '/file/partner'

export async function getListPhoto(payload) {
  try {
    const { data } = await axios.get(`${LIST}`, { params: payload })

    return data
  } catch (error) {
    return { error }
  }
}

export async function getLikeListPhoto() {
  try {
    const { data } = await axios.get(`${LIKE_LIST}`)

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

export async function getPartnerPhoto(id) {
  try {
    const { data } = await axios.get(`${PARTNER}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}
