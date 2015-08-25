<template>
  <div class="user-view" v-show="user">
    <ul>
      <li><span class="label">user:</span> {{user.id}}</li>
      <li><span class="label">created:</span> {{user.created | fromNow}} ago</li>
      <li><span class="label">karma:</span> {{user.karma}}</li>
      <li>
        <span class="label">about:</span>
        <div class="about" v-html="user.about"></div>
      </li>
    </ul>
    <p class="links">
      <a href="https://news.ycombinator.com/submitted?id={{user.id}}">submissions</a><br>
      <a href="https://news.ycombinator.com/threads?id={{user.id}}">comments</a>
    </p>
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
      user: {}
    }
  },
  ready () {
    this.update()
  },
  methods: {
    update () {
      store.fetchUser(this.id, (user) => {
        this.user = user
      }.bind(this))
    }
  }
}
</script>


<style lang="stylus">
@import "../shared.styl"

.user-view
  color $gray
  li
    margin 5px 0
  .label
    display inline-block
    min-width 60px
  .about
    margin-top 1em
  .links a
    text-decoration underline
</style>
