(() => {
  const Band = {
    idle: null,
    playing: null,
    x: 100,
    y: 100,
    width: 64,
    load: () => {
      Band.playing = SpriteSheet("assets/band.png", 5, 4)

      return Promise.all([
        Band.playing.load(),
        Images.load("assets/band-idle.png").then(image => {
          Band.idle = image
        })
      ])
    },
    update: dt => {
      if (SoundControl.isPlaying()) {
        Band.playing.update(dt)
      }
    },
    render: graphics => {
      if (SoundControl.isPlaying()) {
        Band.playing.render(Band.x, Band.y, graphics)
      } else {
        graphics.drawImage(Band.idle, Band.x, Band.y, graphics)
      }
    }
  }

  window.Band = Band
})()
