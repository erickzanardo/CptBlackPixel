(() => {

  let resolution
  const projectsImages = {}

  const Stage = {
    frame: null,

    width: null,
    load: (_resolution) => {
      resolution = _resolution

      Stage.width = Projects.length * 300

      return Promise.all([
        Images.load("assets/frame.png").then(image => {
          Stage.frame = image
        }),
        ...Projects.map(project =>
          Images.load("assets/projects/" + project.image)
            .then(loadedImage => {
              projectsImages[project.image] = loadedImage
            })
        )
      ])
    },
    render: graphics => {

      Projects.forEach((project, idx) => {
        graphics.drawImage(
          Stage.frame,
          (idx + 1) * 200,
          resolution.height - 150
        )

        graphics.drawImage(
          projectsImages[project.image],
          ((idx + 1) * 200) + 10,
          resolution.height - 140
        )
      })

      graphics.fill(0, resolution.height - 34, Stage.width, 50, "#e5e5e5")
    }
  }

  window.Stage = Stage
})()
