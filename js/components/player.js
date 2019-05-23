(() => {
  const Player = {
    x: 50,
    y: 0,

    facingLeft: false,
    speed: 0,

    idle: null,
    running: null,

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
      if (Player.speed === 0) {
        Player.idle.update(dt)
      } else {
        Player.running.update(dt)
        Player.x += (20 / dt) * Player.speed
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
    }
  }

  window.Player = Player
})()
