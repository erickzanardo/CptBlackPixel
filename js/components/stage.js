(() => {

  let resolution
  const projectsImages = {}

  const Stage = {
    frame: null,

    framesPosition: null,
    width: null,
    load: (_resolution) => {
      resolution = _resolution

      Stage.width = Projects.length * 300

      Stage.framesPosition = Projects.map((_, idx) => ({
        x: (idx + 1) * 200, w: 85,
      }))

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
          Stage.framesPosition[idx].x,
          resolution.height - 160
        )

        graphics.drawImage(
          projectsImages[project.image],
          Stage.framesPosition[idx].x + 10,
          resolution.height - 150
        )
      })
    }
  }

  window.Stage = Stage
})()
