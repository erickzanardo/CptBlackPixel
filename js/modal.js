(() => {
  const el = document.querySelector("#modal")
  const contentEl = document.querySelector("#modalContent")

  const Modal = {
    isProjectModalOpen: false,
    show: content => {
      contentEl.innerHTML = content
      el.style.display = "block";
    },
    hide: () => {
      Modal.isProjectModalOpen = false
      el.style.display = "none";
    },
    showProjectModal: project => {
      Modal.isProjectModalOpen = true
      Modal.show([
        "<h1>", project.name, "</h1>",

        "<p>", project.description[0], "</p>",

        "<ul>", 
        ...project.description[1].map(link => "<li><a target=\"blank\" href=\"" + link + "\">" + link + "</a></li>"),
        "</ul>"
      ].join(""))
    },
    showHelpModal: () => {
      Modal.show(
        "<p class=\"help-text\">Use Arrows or A/D keys to move around</p>"
      )
    }
  }

  window.Modal = Modal;
})()
