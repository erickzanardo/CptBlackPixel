(() => {

  const element = document.querySelector("#sound-control")
  const audioElement = document.querySelector("#music-player")

  let musicEnabled = false

  const setMusicEnabled = value => {
    musicEnabled = value
  }

  const isMusicEnabled = () => musicEnabled

  const manageLabels = () => {
    if (isMusicEnabled()) {
      element.innerHTML = "Music: on"
    } else {
      element.innerHTML = "Music: off"
    }
  }

  const SoundControl = {
    init: () => {
      manageLabels()
    },
    toggle: () => {
      setMusicEnabled(!isMusicEnabled())
      SoundControl.run()
    },
    run: () => {
      if (isMusicEnabled()) {
        audioElement.play()
      } else {
        audioElement.pause()
      }
      manageLabels()
    }
  }

  window.SoundControl = SoundControl
})()
