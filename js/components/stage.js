(() => {

  let resolution
  const projectsImages = {}

  const Stage = {
    frame: null,

    musicCreditBox: { x: 10, y: 20, w: 126, h: 27 },
    fontCreditBox: { x: 10, y: 50, w: 122, h: 14 },

    framesPosition: null,
    width: null,
    load: (_resolution) => {
      resolution = _resolution

      Stage.width = Projects.length * 300

      Stage.musicCreditBox.x = Stage.width - Stage.musicCreditBox.w - 10
      Stage.fontCreditBox.x = Stage.width - Stage.fontCreditBox.w - 10

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


      let panelX = Stage.musicCreditBox.x
      let panelY = Stage.musicCreditBox.y

      // Joshua's music
      graphics.fill(panelX - 1, panelY - 1, Stage.musicCreditBox.w, Stage.musicCreditBox.h, "#fff")
      graphics.fill(panelX, panelY, Stage.musicCreditBox.w - 2, Stage.musicCreditBox.h - 2, "#000")

      graphics.fillText("Contains music (C)2019 Joshua McLean", panelX + 4, panelY + 8, { fontSize: 10 })
      graphics.fillText("Licensed under CC BY 4.0", panelX + 4, panelY + 14, { fontSize: 10 })
      graphics.fillText("http://mrjoshuamclean.com", panelX + 4, panelY + 20, { fontSize: 10, color: "#1e14ad" })

      // Font
      panelX = Stage.fontCreditBox.x
      panelY = Stage.fontCreditBox.y

      graphics.fill(panelX - 1, panelY - 1, Stage.fontCreditBox.w, Stage.fontCreditBox.h, "#fff")
      graphics.fill(panelX, panelY, Stage.fontCreditBox.w - 2, Stage.fontCreditBox.h - 2, "#000")

      graphics.fillText("Pixeltype font made by TheJman0205", panelX + 4, panelY + 8, { fontSize: 10 })

    }
  }

  window.Stage = Stage
})()
