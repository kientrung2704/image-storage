import {
  getListPhoto,
  updatePhotoInfo,
  likePhoto,
  dislikePhoto,
  getLikeListPhoto,
  deletePhoto,
  getListTrash,
  removePhoto,
  undoPhoto
} from '@/apis/photo'

const state = {
  selectedPhotos: [],
  selectionAllowed: true,
  selectedAlbum: null,

  lowerSelectionBound: {
    section: Number.MAX_VALUE,
    segment: Number.MAX_VALUE,
    index: Number.MAX_VALUE
  },

  upperSelectionBound: {
    section: -1,
    segment: -1,
    index: -1
  }
}

const mutations = {
  setSelectedAlbum(state, album) {
    state.selectedAlbum = album
  },

  setSelectionAllowed(state, allowed) {
    state.selectionAllowed = allowed
  },

  setSelectedSegment(state, segment) {
    state.selectedSegment = segment
  },
  setSelectedSection(state, section) {
    state.selectedSection = section
  },
  setSelectedIndex(state, index) {
    state.selectedIndex = index
  },
  setSelectedPhoto(state, photo) {
    state.selectedPhoto = photo
  },

  navigate(state, dir) {
    state.selectedIndex += dir
  },
  setSelectedPhotos(state, idArray) {
    state.selectedPhotos = idArray
  },
  emptySelectedPhotos(state) {
    state.selectedPhotos = []
    state.lowerSelectionBound.section = Number.MAX_VALUE
    state.lowerSelectionBound.segment = Number.MAX_VALUE
    state.lowerSelectionBound.index = Number.MAX_VALUE

    state.upperSelectionBound.section = -1
    state.upperSelectionBound.segment = -1
    state.upperSelectionBound.index = -1
  },

  addPhotoToSelection(state, p) {
    if (!state.selectedPhotos.some((photo) => photo.id == p.id)) state.selectedPhotos.push(p)
    // state.selectedPhotos.add(p);
  },

  removePhotoFromSelection(state, p) {
    state.selectedPhotos = state.selectedPhotos.filter((item) => item.id !== p.id)
  },

  resetBoundaries(state) {
    state.lowerSelectionBound.section = Number.MAX_VALUE
    state.lowerSelectionBound.segment = Number.MAX_VALUE
    state.lowerSelectionBound.index = Number.MAX_VALUE

    state.upperSelectionBound.section = -1
    state.upperSelectionBound.segment = -1
    state.upperSelectionBound.index = -1
  },

  setSelectionBoundaries(state, { section, segment, index }) {
    if (section < state.lowerSelectionBound.section) setLowerBounds(state, section, segment, index)
    else if (
      section == state.lowerSelectionBound.section &&
      segment < state.lowerSelectionBound.segment
    )
      setLowerBounds(state, section, segment, index)
    else if (
      section == state.lowerSelectionBound.section &&
      segment == state.lowerSelectionBound.segment &&
      index < state.lowerSelectionBound.index
    )
      setLowerBounds(state, section, segment, index)

    if (section > state.upperSelectionBound.section) setUpperBounds(state, section, segment, index)
    else if (
      section == state.upperSelectionBound.section &&
      segment > state.upperSelectionBound.segment
    )
      setUpperBounds(state, section, segment, index)
    else if (
      section == state.upperSelectionBound.section &&
      segment == state.upperSelectionBound.segment &&
      index > state.upperSelectionBound.index
    )
      setUpperBounds(state, section, segment, index)
  }
}

const actions = {
  async update({ commit }, payload) {
    const res = await updatePhotoInfo(payload)
    if (res.error) {
      return res
    }

    return false
  },

  async list({ commit }) {
    const res = await getListPhoto()
    return res
  },

  async likeList({ commit }) {
    const res = await getLikeListPhoto()
    return res
  },

  async like({ commit }, id) {
    const res = await likePhoto(id)
    if (res.error) {
      return res
    }

    return false
  },
  async dislike({ commit }, id) {
    const res = await dislikePhoto(id)
    if (res.error) {
      return res
    }

    return false
  },
  async delete({ commit }, id) {
    const res = await deletePhoto(id)
    if (res.error) {
      return res
    }

    return false
  },
  async listTrash({ commit }) {
    const res = await getListTrash()
    return res
  },
  async remove({ commit }, id) {
    const res = await removePhoto(id)
    if (res.error) {
      return res
    }

    return false
  },
  async undo({ commit }, id) {
    const res = await undoPhoto(id)
    if (res.error) {
      return res
    }

    return false
  }
}

// export const photo = {
//   state: {
//     /*
//         selectedSegment: Object,
//         selectedSection: Object,
//         selectedIndex: 0,
//         selectedPhoto: Object,
//         */
//     selectedPhotos: [],
//     selectionAllowed: true,
//     selectedAlbum: null,

//     lowerSelectionBound: {
//       section: Number.MAX_VALUE,
//       segment: Number.MAX_VALUE,
//       index: Number.MAX_VALUE
//     },

//     upperSelectionBound: {
//       section: -1,
//       segment: -1,
//       index: -1
//     }
//   },

//   mutations: {
//     setSelectedAlbum(state, album) {
//       state.selectedAlbum = album
//     },

//     setSelectionAllowed(state, allowed) {
//       state.selectionAllowed = allowed
//     },

//     setSelectedSegment(state, segment) {
//       state.selectedSegment = segment
//     },
//     setSelectedSection(state, section) {
//       state.selectedSection = section
//     },
//     setSelectedIndex(state, index) {
//       state.selectedIndex = index
//     },
//     setSelectedPhoto(state, photo) {
//       state.selectedPhoto = photo
//     },

//     navigate(state, dir) {
//       state.selectedIndex += dir
//     },
//     setSelectedPhotos(state, idArray) {
//       state.selectedPhotos = idArray
//     },
//     emptySelectedPhotos(state) {
//       state.selectedPhotos = []
//       state.lowerSelectionBound.section = Number.MAX_VALUE
//       state.lowerSelectionBound.segment = Number.MAX_VALUE
//       state.lowerSelectionBound.index = Number.MAX_VALUE

//       state.upperSelectionBound.section = -1
//       state.upperSelectionBound.segment = -1
//       state.upperSelectionBound.index = -1
//     },

//     addPhotoToSelection(state, p) {
//       if (!state.selectedPhotos.some((photo) => photo.id == p.id)) state.selectedPhotos.push(p)
//       // state.selectedPhotos.add(p);
//     },

//     removePhotoFromSelection(state, p) {
//       state.selectedPhotos = state.selectedPhotos.filter((item) => item.id !== p.id)
//     },

//     resetBoundaries(state) {
//       state.lowerSelectionBound.section = Number.MAX_VALUE
//       state.lowerSelectionBound.segment = Number.MAX_VALUE
//       state.lowerSelectionBound.index = Number.MAX_VALUE

//       state.upperSelectionBound.section = -1
//       state.upperSelectionBound.segment = -1
//       state.upperSelectionBound.index = -1
//     },

//     setSelectionBoundaries(state, { section, segment, index }) {
//       if (section < state.lowerSelectionBound.section)
//         setLowerBounds(state, section, segment, index)
//       else if (
//         section == state.lowerSelectionBound.section &&
//         segment < state.lowerSelectionBound.segment
//       )
//         setLowerBounds(state, section, segment, index)
//       else if (
//         section == state.lowerSelectionBound.section &&
//         segment == state.lowerSelectionBound.segment &&
//         index < state.lowerSelectionBound.index
//       )
//         setLowerBounds(state, section, segment, index)

//       if (section > state.upperSelectionBound.section)
//         setUpperBounds(state, section, segment, index)
//       else if (
//         section == state.upperSelectionBound.section &&
//         segment > state.upperSelectionBound.segment
//       )
//         setUpperBounds(state, section, segment, index)
//       else if (
//         section == state.upperSelectionBound.section &&
//         segment == state.upperSelectionBound.segment &&
//         index > state.upperSelectionBound.index
//       )
//         setUpperBounds(state, section, segment, index)
//     }
//   },

//   actions: {}
// }

function setLowerBounds(state, section, segment, index) {
  state.lowerSelectionBound.section = section
  state.lowerSelectionBound.segment = segment
  state.lowerSelectionBound.index = index
}

function setUpperBounds(state, section, segment, index) {
  state.upperSelectionBound.section = section
  state.upperSelectionBound.segment = segment
  state.upperSelectionBound.index = index
}
export default {
  // getters,
  state,
  mutations,
  actions
}
