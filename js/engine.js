(() => {
  const resolution = {
    width: 360,
    height: 180
  }

  const now = () => new Date().getTime();

  const Graphics = (ctx, scaleFactor) => {
  const s = v => v * scaleFactor

    return ({
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
      }
    })
  }


  const GameEngine = {
    start: (canvas, gameLoop, { showFPS } = {}) => {
      console.log("Initializing");

      const width = document.body.clientWidth;

      const scale = width / resolution.width;

      const ctx = canvas.getContext("2d")

      canvas.width = width
      canvas.height = resolution.height * scale

      ctx.imageSmoothingEnabled = false;

      const graphics = Graphics(ctx, scale);

      let time = now();

      if (gameLoop.init) gameLoop.init(resolution.width, resolution.height, graphics)

      const tick = () => {
        // Clear screen
        graphics.fill(0, 0, resolution.width, resolution.height, "#000");

        const tickTime = now();
        const delta = tickTime - time;
        time = tickTime;

        if (gameLoop.update) gameLoop.update(delta)
        if (gameLoop.render) gameLoop.render(graphics)

        requestAnimationFrame(tick);
      }

      tick();
    }
  }

  window.GameEngine = GameEngine
})()
