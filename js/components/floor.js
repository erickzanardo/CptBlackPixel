(() => {
  const Floor = {
    y: null,
    image: null,
    load: (graphics, height) => Images.load("assets/floor.png").then(image => {
      const floorWidth = Stage.width + (image.width * 2)

      Floor.y = height - 34

      Floor.image = graphics.createImage(
        floorWidth,
        image.height,
        graphics => {
          let x = 0
          while (x < floorWidth) {

            graphics.drawImage(image, x, 0)
            x += image.width
          }
        }
      )
    }),
    render: graphics => {
      graphics.drawImage(Floor.image, 0, Floor.y)
    }
  }

  window.Floor = Floor
})()

