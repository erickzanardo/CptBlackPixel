(() => {
  const Player = {
    x: 50,
    y: 0,

    facingLeft: false,
    speed: 0,

    idle: null,
    running: null,

    collidingFrame: null,

    load: () => {
      Player.idle = SpriteSheet("assets/cpt/cpt-idle.png", 5, 2)
      Player.running = SpriteSheet("assets/cpt/cpt-running.png", 5, 4)

      return Promise.all([
        Player.idle.load(),
        Player.running.load()
      ])
    },

    moveLeft: () => {
      Player.speed = -1
      Player.facingLeft = true
    },

    moveRight: () => {
      Player.speed = 1
      Player.facingLeft = false
    },

    stop: () => {
      Player.speed = 0
    },

    update: dt => {

      Player.collidingFrame = null
      for (let i = 0; i < Stage.framesPosition.length; i++) {
        const pos = Stage.framesPosition[i];
        if (Player.x >= pos.x && Player.x <= pos.x + pos.w) {
          Player.collidingFrame = Projects[i];
          break;
        }
      }

      if (Player.collidingFrame === null && Modal.isProjectModalOpen) {
        Modal.hide()
      }

      if (Player.speed === 0) {
        Player.idle.update(dt)
      } else {
        Player.running.update(dt)
        const newX = Player.x + (20 / dt) * Player.speed 

        if (newX >= 0 && newX + 16 <= Stage.width) {
          Player.x = newX
        }
      }
    },
    render: graphics => {
      graphics.save()

      if (Player.facingLeft) {
        // Centering
        graphics.translate(Player.x + 16, Player.y)
        graphics.flipX()
      } else {
        graphics.translate(Player.x, Player.y)
      }

      if (Player.speed === 0) {
        Player.idle.render(0, 0, graphics)
      } else {
        Player.running.render(0, 0, graphics)
      }

      graphics.restore()

      if (Player.collidingFrame) {
        const textX = Player.x - 15
        const textY = Player.y - 10

        graphics.fill(textX - 4, textY - 8, 65, 10, "#000")

        graphics.fillText(
          "Press Enter to view",
          textX,
          textY,
          { fontSize: 10 }
        )
      }
    }
  }

  window.Player = Player
})()
