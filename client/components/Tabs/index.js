
import tabs from './tabs.vue'
import tab from './tab.vue'

export default (Vue) => {
  Vue.component(tabs.name, tabs)
  Vue.component(tab.name, tab)
}
