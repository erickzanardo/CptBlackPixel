(() => {

  let width, height

  let loaded = false
  const GameLoop = {
    init: (_width, _height, graphics) => {
      width = _width
      height = _height

      Player.y = height - 50

      Camera.init(Player, Stage, { width, height })
      Input.init()
      Input.onMoveLeft(() => {
        Player.moveLeft()
      })
      Input.onMoveRight(() => {
        Player.moveRight()
      })
      Input.onStopMoving(() => {
        Player.stop()
      })

      Input.onAction(() => {
        if (Player.collidingFrame) {
          Modal.showProjectModal(Player.collidingFrame)
        }
      })

      Input.onCancel(() => {
        if (Player.collidingFrame) {
          Modal.hide()
        }
      })

      Promise.all([
        Player.load(),
        // Stage need to be loaded before BackGround
        Stage.load({ width, height }).then(() => Promise.all([
            BackGround.load(graphics, height),
            Floor.load(graphics, height)
          ])
        ),
      ]).then(() => {
        loaded = true
      })

    },
    update: dt => {
      if (loaded) {
        Camera.update()
        Player.update(dt)
      }
    },
    render: graphics => {
      if (loaded) {
        graphics.fill(0, 0, width, height, "#a9a9a9");

        graphics.save()
        Camera.render(graphics)
        BackGround.render(graphics)
        Stage.render(graphics)
        Player.render(graphics)
        Floor.render(graphics)

        graphics.restore()
      }
    }
  }

  const Game = {
    init: canvas => {
      GameEngine.start(canvas, GameLoop)
    }
  }

  window.Game = Game;
})()
