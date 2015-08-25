<template>
  <div class="item-view" v-show="item">
    <item item="{{item}}"></item>
    <ul class="poll-options" v-if="pollOptions">
      <li v-repeat="pollOptions">
        <p>{{text}}</p>
        <p class="subtext">{{score}} points</p>
      </li>
    </ul>
    <ul class="comments" v-if="comments">
      <comment v-repeat="comments"></comment>
    </ul>
    <p v-show="!comments.length">No comments yet.</p>
  </div>
</template>


<script>
import store from '../store'

export default {
  route: {
    data ({ to, next }) {
      next({ id: to.params.id })
    }
  },
  data () {
    return {
      id: null,
      item: {},
      pollOptions: null,
      comments: []
    }
  },
  ready () {
    this.update()
  },
  methods: {
    update () {
      store.fetchItem(this.id, (item) => {
        this.item = item
        this.fetchComments()
        if (item.type === 'poll') {
          this.fetchPollOptions()
        }
      }.bind(this))
    },
    fetchComments () {
      store.fetchItems(this.item.kids, (comments) => {
        this.comments = comments
      }.bind(this))
    },
    fetchPollOptions () {
      store.fetchItems(this.item.parts, (options) => {
        this.pollOptions = options
      }.bind(this))
    }
  },
  components: {
    item: require('../components/item.vue'),
    comment: require('../components/comment.vue')
  }
}
</script>


<style lang="stylus">
@import "../shared.styl"

.item-view
  .item
    padding-left 0
    margin-bottom 30px
    .index
      display none
  .poll-options
    margin-left 30px
    margin-bottom 40px
    li
      margin 12px 0
    p
      margin 8px 0
    .subtext
      color $gray
      font-size 11px
</style>
