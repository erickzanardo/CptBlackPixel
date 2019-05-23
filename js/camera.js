(() => {
  let x, player, stage, resolution, middleScreen

  const Camera = {
    init: (_player, _stage, _resolution) => {
      player = _player
      stage = _stage
      resolution = _resolution

      middleScreen = resolution.width / 2
      x = 0
    },
    update: () => {
      if (player.x >= middleScreen && player.x + middleScreen <= stage.width) {
        x = (player.x - middleScreen) * -1
      }
    },
    render: graphics => {
      graphics.translate(x, 0)
    }
  }

  window.Camera = Camera
})()
