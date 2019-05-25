(() => {

  let onMoveLeft, onMoveRight, onStopMoving, onAction, onCancel

  const Input = {
    onMoveLeft: _onMoveLeft => {
      onMoveLeft = _onMoveLeft
    },
    onMoveRight: _onMoveRight => {
      onMoveRight = _onMoveRight
    },
    onStopMoving: _onStopMoving => {
      onStopMoving = _onStopMoving
    },
    onAction: _onAction => {
      onAction = _onAction
    },
    onCancel: _onCancel => {
      onCancel = _onCancel
    },
    init: () => {
      document.addEventListener("keydown", event => {
        if (event.key === "a" || event.key === "ArrowLeft") {
          onMoveLeft()
        } else if (event.key === "d" || event.key === "ArrowRight") {
          onMoveRight()
        }
      })

      document.addEventListener("keyup", event => {
        if (event.key === "a" || event.key === "ArrowLeft" || event.key === "d" || event.key === "ArrowRight") {
          onStopMoving()
        }

        if (event.key === "Enter") {
          onAction()
        }

        if (event.key === "Escape") {
          onCancel()
        }
      })

      const gameCanvas = document.querySelector("#game")
      const middleOfScreen = gameCanvas.width / 2
      gameCanvas.addEventListener("touchstart", evt => {
        const touch = evt.targetTouches[0]

        if (touch.screenX >= middleOfScreen) {
          onMoveRight()
        } else {
          onMoveLeft()
        }

        evt.preventDefault && evt.preventDefault();
      })

      gameCanvas.addEventListener("touchend", evt => {
        onStopMoving()

        evt.preventDefault && evt.preventDefault();
      })
    }
  }


  window.Input = Input
})()
