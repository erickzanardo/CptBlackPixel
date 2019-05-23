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
          resolution.height - 160
        )

        graphics.drawImage(
          projectsImages[project.image],
          ((idx + 1) * 200) + 10,
          resolution.height - 150
        )
      })
    }
  }

  window.Stage = Stage
})()
