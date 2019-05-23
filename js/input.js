(() => {

  let onMoveLeft, onMoveRight, onStopMoving

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
    init: () => {
      document.addEventListener("keydown", event => {
        if (event.key == "a" || event.key == "ArrowLeft") {
          onMoveLeft()
        } else if (event.key == "d" || event.key == "ArrowRight") {
          onMoveRight()
        }
      })

      document.addEventListener("keyup", event => {
        if (event.key == "a" || event.key == "ArrowLeft" || event.key == "d" || event.key == "ArrowRight") {
          onStopMoving()
        }
      })
    }
  }


  window.Input = Input
})()
