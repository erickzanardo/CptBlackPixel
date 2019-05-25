(() => {
  const resolution = {
    width: 360,
    height: 180
  }

  const now = () => new Date().getTime();

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
