<template>
  <div id="app">
    <div id="cover"></div>
    <div id="loading" v-show="loading">
      <loading></loading>
    </div>
    <Header></Header>
    <!-- <p>{{fullName}} {{counter}}</p> -->
    <!-- <p>{{textC}} {{textPlus}}</p> -->
    <!-- <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
    <router-link to="/login">login</router-link> -->
    <!-- <todo></todo> -->
    <!-- <tabs>
      <tab lable="text">
        <span slot="label"></span>
        <p>This is tab content</p>
      </tab>
    </tabs>
    <ul>
      <li>label</li>
      <li>label2</li>
    </ul>
    <div class="tab-container">
      <p>This is tab content</p>
    </div> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- <button @click="notify">click me1</button> -->
    <!-- <notification content="test notify" /> -->

  <div class="tab-container">
      <tabs :value="tabValue" @change="handleChangeTab">
            <tab label="tab1" index="1">
              <span>tab content 1</span>
            </tab>
            <tab index="2">
              <span slot="label" style="color:red">tab2</span>
              <span>tab content 2</span>
            </tab>
            <tab label="tab3" index="3">
              <span>tab content 3</span>
            </tab>
        </tabs>
  </div>


    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState
//   mapGetters,
//   mapActions,
//   mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/Loading/loading.vue'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  metaInfo: {
    title: 'sohucw\'s Todo App'
  },
  components: {
    Header,
    Footer,
    Loading
    // Todo
  },
  mounted () {
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['updateCount']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    },
    handleChangeTab (index) {
      this.tabValue = index
    }
  },
  computed: {
    ...mapState(['loading'])
    // ...mapState({
    //   counter: (state) => state.count
    // }),
    // count () {
    //   return this.$store.state.count
    // },
    // ...mapGetters({
    //   'fullName': 'fullName'
    // })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  data () {
    return {
      tabValue: '1'
    }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
.tab-container
  background-color #fff
  padding 0 15px
</style>


