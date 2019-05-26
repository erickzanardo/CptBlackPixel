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

      SoundControl.init()

      Input.onClick(({ x, y }) => {
        const s = graphics.realCoord
        const clickX = x - s(Camera.x)

        if (clickX >= s(Stage.musicCreditBox.x) && clickX <= s(Stage.musicCreditBox.x + Stage.musicCreditBox.w) &&
            y >= s(Stage.musicCreditBox.y) && y <= s(Stage.musicCreditBox.y + Stage.musicCreditBox.h)) {
          document.getElementById("music-link").click()
        }

        if (clickX >= s(Stage.fontCreditBox.x) && clickX <= s(Stage.fontCreditBox.x + Stage.fontCreditBox.w) &&
            y >= s(Stage.fontCreditBox.y) && y <= s(Stage.fontCreditBox.y + Stage.fontCreditBox.h)) {
          document.getElementById("font-link").click()
        }
      })

      Input.onAction(() => {
        if (Player.collidingFrame) {
          Modal.showProjectModal(Player.collidingFrame)
        } else if(Player.collidingWithBand) {
          SoundControl.toggle()
        }
      })

      Input.onCancel(() => {
        if (Player.collidingFrame) {
          Modal.hide()
        }
      })

      Promise.all([
        Band.load(),
        Player.load(),
        // Stage need to be loaded before BackGround
        Stage.load({ width, height }).then(() => Promise.all([
            BackGround.load(graphics, height),
            Floor.load(graphics, height)
          ])
        ),
      ]).then(() => {
        if (!localStorage.getItem("already-played")) {
          Modal.showHelpModal()
          localStorage.setItem("already-played", true)
        }
        loaded = true
      })

    },
    update: dt => {
      if (loaded) {
        Camera.update()
        Band.update(dt)
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
        Band.render(graphics)
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
