(() => {
  let player, stage, resolution, middleScreen

  const Camera = {
    x: 0,
    init: (_player, _stage, _resolution) => {
      player = _player
      stage = _stage
      resolution = _resolution

      middleScreen = resolution.width / 2
      Camera.x = 0
    },
    update: () => {
      if (player.x >= middleScreen && player.x + middleScreen <= stage.width) {
        Camera.x = (player.x - middleScreen) * -1
      }
    },
    render: graphics => {
      graphics.translate(Camera.x, 0)
    }
  }

  window.Camera = Camera
})()
