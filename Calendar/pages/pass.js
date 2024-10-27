
Page({
  state: {},
  build() {
    hmApp.gotoPage({
      url: 'pages/anim',
      param: JSON.stringify({
        alarmedWakeUp: true,
        type: 'normal'
      })
    })
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
  },
});