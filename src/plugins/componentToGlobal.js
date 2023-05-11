export default {
  install(Vue) {
    const files = import.meta.globEager('../components/**/*.vue')

    Object.entries(files).forEach(([path, definition]) => {
      const componentName = path.split('/').pop().split('.')[0]

      Vue.component(componentName, definition.default)
    })
  }
}
