(() => {
  const Graphics = (ctx, scaleFactor) => {
    const s = v => v * scaleFactor

    const instance = ({
      realCoord: s,
      save: () => {
        ctx.save()
      },
      restore: () => {
        ctx.restore()
      },
      translate: (x, y) => {
        ctx.translate(s(x), s(y))
      },
      flipX: () => {
        ctx.scale(-1, 1)
      },
      fill: (x, y, w, h, color) => {
        ctx.fillStyle = color
        ctx.fillRect(s(x), s(y), s(w), s(h))
      },
      drawImage: (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
        if (dHeight !== undefined) {
          ctx.drawImage(image, sx, sy, sWidth, sHeight, s(dx), s(dy), s(dWidth), s(dHeight))
        } else if (sHeight !== undefined) {
          ctx.drawImage(image, s(sx), s(sy), s(sWidth), s(sHeight))
        } else {
          ctx.drawImage(image, s(sx), s(sy), s(image.width), s(image.height))
        }
      },
      createImage: (width, height, render) => {
        const canvas = document.createElement("canvas")
        canvas.width = s(width)
        canvas.height = s(height)
        const createdCtx = canvas.getContext("2d")
        createdCtx.imageSmoothingEnabled = false;

        const graphics = Graphics(createdCtx, scaleFactor)

        render(graphics)

        return canvas
      },
      fillText: (text, x, y, { fontSize = 12, color = "#ffffff" } = {}) => {

        ctx.font = s(fontSize) + "px Pixeltype"
        ctx.fillStyle = color
        ctx.fillText(text, s(x), s(y))
      }
    })

    return instance
  }

  window.Graphics = Graphics
})()
