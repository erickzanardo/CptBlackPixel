(() => {
  const BackGround = {
    image: null,
    load: (graphics, height) => Images.load("assets/background.png").then(image => {
      const backGroundWidth = Stage.width + (image.width * 2)
      const backGroundHeight = height + (image.height * 2)

      BackGround.image = graphics.createImage(
        backGroundWidth,
        backGroundHeight,
        graphics => {
          let x = 0, y = 0

          while (y < backGroundHeight) {
            console.log(y)
            while (x < backGroundWidth) {

              graphics.drawImage(image, x, y)
              x += image.width
            }
            y += image.height
          }
        }
      )
    }),
    render: graphics => {
      graphics.drawImage(BackGround.image, 0, 0)
    }
  }

  window.BackGround = BackGround
})()
