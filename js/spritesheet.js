(() => {
  const { Images } = window;

  const SpriteSheet = (imageName, fps, columns) => {
    let image

    const timeframe = 1000 / fps
    let timeCount = 0

    let frame = 0
    let sx, width, height

    const calcFrame = () => {
      sx = frame * width
    }

    return {
      load: () => Images.load(imageName).then(loadedImage => {
        image = loadedImage
        width = image.width / columns
        height = image.height

        calcFrame()
      }),
      render: (x, y, graphics) => {
        graphics.drawImage(image, sx, 0, width, height, x, y, width, height)
      },
      update: delta => {
        timeCount += delta

        if (timeCount >= timeframe) {
          timeCount -= timeframe

          frame++
          if (frame == columns) {
            frame = 0
          }

          calcFrame()
        }
      }
    }
  }


  window.SpriteSheet = SpriteSheet
})()
