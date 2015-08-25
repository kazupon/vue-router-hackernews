<template>
  <li v-show="text">
    <div class="comhead">
      <a class="toggle" v-on="click:open = !open">{{open ? '[-]' : '[+]'}}</a>
      <a v-link="/user/{{by}}">{{by}}</a>
      {{time | fromNow}} ago
    </div>
    <div class="comment-content" v-html="text" v-show="open"></div>
    <ul class="child-comments" v-if="kids" v-show="open">
      <comment v-repeat="comments"></comment>
    </ul>
  </li>
</template>


<script>
import store from '../store'

export default {
  data () {
    return {
      open: true,
      comments: null
    }
  },
  created () {
    if (this.kids) {
      store.fetchItems(this.kids, (comments) => {
        this.comments = comments
      }.bind(this))
    }
  }
}
</script>


<style lang="stylus">
@import "../shared.styl"

.comhead
  color $gray
  font-size 11px
  margin-bottom 8px
  a
    color $gray
    &:hover
      text-decoration underline
  .toggle
    margin-right 4px

.comment-content
  margin 0 0 16px 24px
  code
    white-space pre-wrap

.child-comments
  margin 8px 0 8px 22px
</style>
