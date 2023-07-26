<template>
  <a-config-provider
    :locale="localLanguage"
    :theme="{
      token: {
        fontFamily: 'Pretendard'
      }
    }"
  >
    <Loading ref="loading" />
    <!-- <UploadGlobal ref="upload" /> -->
    <!-- <DropZone ref="dropzone" /> -->

    <RouterView />
  </a-config-provider>
</template>
<script setup>
// import { setupMessage, setupDialog } from '@/utils'
import { computed } from 'vue'
// import { useStore } from 'vuex'
import i18n from '@/locales'

const locale = i18n.global.locale

// const store = useStore()
// const dateLocal = computed(() => {
//   if (store.getters['setting/local'] === 'dateViVN') {
//     return dateViVN
//   } else {
//     return dateEnUS
//   }
// })

const localLanguage = computed(() => {
  return i18n.global.messages[locale]
})
// const getThemeOverrides = computed(() => {
//   return {
//     common: {
//       primaryColor: '#6360ff',
//       primaryColorHover: '#6360ff',
//       primaryColorPressed: '#6360ff',
//       primaryColorSuppl: '#6360ff',
//       fontWeight: '500',
//       borderRadius: '6px'
//     },
//     // Avatar: {

//     // },
//     Button: {
//       heightMedium: '36px',
//       padding: '40px',
//       borderRadiusMedium: '7px'
//     },
//     LoadingBar: {
//       colorLoading: '#6360ff'
//     },
//     Menu: {
//       itemColorHover: '#181F52',
//       itemColorActive: '#181F52',
//       itemColorActiveHover: '#181F52',
//       itemColorActiveCollapsed: '#181F52',
//       itemTextColor: '#E5EAEC',
//       itemTextColorHover: '#ffffff',
//       itemTextColorActiveHover: '#E5EAEC',
//       itemTextColorActive: '#ffffff',
//       groupTextColor: '#ffffff',
//       itemTextColorChildActive: '#ffffff',
//       itemTextColorChildActiveHover: '#ffffff',
//       arrowColor: '#ffffff',
//       arrowColorActiveHover: '#ffffff',
//       arrowColorHover: '#ffffff',
//       arrowColorActive: '#ffffff',
//       arrowColorChildActive: '#ffffff',
//       arrowColorChildActiveHover: '#ffffff'
//     },
//     Breadcrumb: {
//       separatorColor: '#060F27',
//       itemTextColor: '#060F27'
//     },
//     Input: {
//       boxShadowFocus: '0',
//       border: '2px solid #e5eaec',
//       borderFocus: '2px solid #6360ff',
//       borderHover: '2px solid #6360ff',
//       heightMedium: '38px'
//     }
//   }
// })
// function setupNaiveTools() {
//   window.$loadingBar = useLoadingBar()
//   window.$notification = useNotification()
//   window.$message = setupMessage(useMessage())
//   window.$dialog = setupDialog(useDialog())
// }
// const NaiveProviderContent = defineComponent({
//   setup() {
//     setupNaiveTools()
//   }
// })
</script>
