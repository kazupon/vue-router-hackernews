import Firebase from 'firebase'
import { EventEmitter as Emitter } from 'events'

let api = new Firebase('https://hacker-news.firebaseio.com/v0')
let storiesPerPage = 30
let cachedStoryIds = []
let cachedStories = {}
let store = new Emitter()

export default store

/**
 * Subscribe to real time updates of the top 100 stories,
 * and cache the IDs locally.
 */

api.child('topstories').on('value', (snapshot) => {
  cachedStoryIds = snapshot.val()
  store.emit('update')
})

/**
 * Fetch an item data with given id.
 *
 * @param {Number} id
 * @param {Function} cb(item)
 */

store.fetchItem = function (id, cb) {
  if (cachedStories[id]) {
    cb(cachedStories[id])
  } else {
    api.child('item/' + id).once('value', (snapshot) => {
      let story = snapshot.val()
      cachedStories[id] = story
      cb(story)
    })
  }
}

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @param {Function} cb(items)
 */

store.fetchItems = function (ids, cb) {
  if (!ids || !ids.length) return cb([])
  let items = []
  ids.forEach((id) => {
    store.fetchItem(id, addItem)
  })
  function addItem (item) {
    items.push(item)
    if (items.length >= ids.length) {
      cb(items)
    }
  }
}

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @param {Function} cb(stories)
 */

store.fetchItemsByPage = function (page, cb) {
  let start = (page - 1) * storiesPerPage
  let end = page * storiesPerPage
  let ids = cachedStoryIds.slice(start, end)
  store.fetchItems(ids, cb)
}

/**
 * Fetch a user data with given id.
 *
 * @param {Number} id
 * @param {Function} cb(user)
 */

store.fetchUser = function (id, cb) {
  api.child('user/' + id).once('value', (snapshot) => {
    cb(snapshot.val())
  })
}
