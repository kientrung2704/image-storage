import { createStore } from 'vuex'

const modulesFiles = import.meta.globEager('./modules/*.js')

let modules = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}

Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

const store = new createStore({
  modules
})

export default store
