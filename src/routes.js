export default function (router) {
  router.map({
    '/news/:page': {
      component: require('./components/news-view.vue')
    },
    '/user/:id': {
      component: require('./components/user-view.vue')
    },
    '/item/:id': {
      component: require('./components/item-view.vue')
    }
  })

  router.redirect({
    '*': '/news/1'
  })
}
