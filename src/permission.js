import router from './router'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    var token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
