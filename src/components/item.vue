<template>
  <div class="item">
    <span class="index">{{index}}.</span>
    <p>
      <a class="title" v-if="external" href="{{href}}" target="_blank">{{item.title}}</a>
      <a class="title" v-if="!external" v-link="{{href}}">{{item.title}}</a>
      <span class="domain" v-show="showDomain">
        ({{item.url | domain}})
      </span>
    </p>
    <p class="subtext">
      <span v-show="showInfo">
        {{item.score}} points by
        <a v-link="/user/{{item.by}}">{{item.by}}</a>
      </span>
      {{item.time | fromNow}} ago
      <span class="comments-link" v-show="showInfo">
        | <a v-link="/item/{{item.id}}">{{item.descendants}} comments</a>
      </span>
    </p>
  </div>
</template>


<script>
export default {
  props: ['item'],
  computed: {
    index () {
      if (this.$route.params.page) {
        let page = parseInt(this.$route.params.page)
        return (page - 1) * 30 + this.$index + 1
      }
    },
    external () {
      return this.item.url
    },
    href () {
      return this.item.url || ('/item/' + this.item.id)
    },
    showInfo () {
      return this.item.type === 'story' || this.item.type === 'poll'
    },
    showDomain () {
      return this.item.type === 'story'
    }
  }
}
</script>


<style lang="stylus">
@import "../shared.styl"

.item
  padding 2px 0 2px 40px
  position relative
  transition background-color .2s ease
  p
    margin 2px 0
  .title:visited
      color $gray
  .index
    color $gray
    position absolute
    width 30px
    text-align right
    left 0
    top 4px
  .domain, .subtext
    font-size 11px
    color $gray
    a
      color $gray
  .subtext a:hover
    text-decoration underline
</style>
