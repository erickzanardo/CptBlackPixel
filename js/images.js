(() => {
  const Images = {
    load: imageName => new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        resolve(image)
      }
      image.src = `./${imageName}`
    })
  }

  window.Images = Images
})()
