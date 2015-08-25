<template>
  <div class="news-view" v-class="loading:!items.length">
    <!-- item list -->
    <item v-repeat="item in items" track-by="id"></item>
    <!-- navigation -->
    <div class="nav" v-show="items.length > 0">
      <a v-if="page > 1" v-link="/news/{{page - 1}}">&lt; prev</a>
      <a v-if="page < 4" v-link="/news/{{page + 1}}">more...</a>
    </div>
  </div>
</template>


<script>
import store from '../store'

export default {
  route: {
    canReuse () {
      return false
    },
    data ({ to, next }) {
      next({ page: parseInt(to.params.page) })
    }
  },
  data () {
    return {
      page: 1,
      items: []
    }
  },
  ready () {
    this.update(true)
    store.on('update', this.update)
  },
  destroyed () {
    store.removeListener('update', this.update)
  },
  methods: {
    update (switchingPage) {
      store.fetchItemsByPage(this.page, (items) => {
        this.items = items
        if (switchingPage) {
          window.scrollTo(0, 0)
        }
      }.bind(this))
    }
  },
  components: {
    item: require('../components/item.vue')
  }
}
</script>


<style lang="stylus">
.news-view
  padding-left 5px
  padding-right 15px
  &.loading:before
    content "Loading..."
    position absolute
    top 16px
    left 20px
  .nav
    padding 10px 10px 10px 40px
    margin-top 10px
    border-top 2px solid #f60
    a
      margin-right 10px
      &:hover
        text-decoration underline
</style>
