
Page({
  state: {},
  build() {
    hmApp.gotoPage({
      url: 'pages/index',
      param: JSON.stringify({
        preview: true,
        type: 'normal'
      })
    })
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
  },
});