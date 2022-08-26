/* eslint-disable default-case */
/* eslint-disable no-console */
class LightBox {
  constructor(media) {
    this._image = media._image;
    this._video = media._video;
    this._title = media._title;
    this._mediaPath = media.getMediaPath();

    // lightbox modal inner div
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");

    this.$lightboxModal = document.getElementById("lightbox_modal");
    this.$mainWrapper = document.getElementById("main");
    this.$body = document.querySelector("body");
  }

  closeModal() {
    this.$lightboxModal.style.display = "none";
    this.$mainWrapper.setAttribute("aria-hidden", "false");
    this.$lightboxModal.setAttribute("aria-hidden", "true");
    this.$body.classList.remove("no-scroll");
  }

  onCloseButton() {
    document.getElementById("close_lightbox").addEventListener("click", () => {
      this.closeModal();
    });
  }

  onPreviousButton() {
    document.getElementById("previous-media").addEventListener("click", () => {
      console.log("previous");
    });
  }

  onNextButton() {
    document.getElementById("next-media").addEventListener("click", () => {
      console.log("next");
    });
  }

  onKeyboardPress() {
    document.addEventListener("keydown", (e) => {
      if (this.$lightboxModal.getAttribute("aria-hidden") === "false") {
        switch (e.key) {
          case "Escape":
            this.closeModal();
            break;
          case "ArrowRight":
            console.log("next");
            break;
          case "ArrowLeft":
            console.log("previous");
            break;
        }
      }
    });
  }

  createLightbox() {
    // empty lightbox
    this.$lightboxModal.innerHTML = "";
    // create DOM element
    const leftDiv = document.createElement("div");
    const middleDiv = document.createElement("div");
    const rightDiv = document.createElement("div");
    const closeButton = document.createElement("button");
    let mediaElement = null;
    this._image
      ? (mediaElement = document.createElement("img"))
      : (mediaElement = document.createElement("video"));
    const mediaTitle = document.createElement("p");
    const previous = document.createElement("a");
    const next = document.createElement("a");

    // set attributes
    closeButton.setAttribute("id", "close_lightbox");
    closeButton.setAttribute("aria-label", "Fermer le formulaire de contact");

    mediaElement.setAttribute("src", this._mediaPath);
    this._image
      ? mediaElement.setAttribute("alt", this._title)
      : mediaElement.setAttribute("controls", "");

    previous.setAttribute("id", "previous-media");
    next.setAttribute("id", "next-media");
    previous.setAttribute("aria-label", "image suivante");
    next.setAttribute("aria-label", "image précédente");

    // add classes
    mediaElement.classList.add("lightbox-media");
    mediaTitle.classList.add("red-text");
    closeButton.classList.add("red-text", "lightbox-navigation");
    previous.classList.add("red-text", "lightbox-navigation");
    next.classList.add("red-text", "lightbox-navigation");

    // add content
    mediaTitle.textContent = this._title;
    closeButton.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    previous.innerHTML = "<i class='fa-solid fa-chevron-left'></i>";
    next.innerHTML = "<i class='fa-solid fa-chevron-right'></i>";

    // insert element in DOM$
    leftDiv.appendChild(previous);
    this.$lightbox.appendChild(previous);
    middleDiv.appendChild(mediaElement);
    middleDiv.appendChild(mediaTitle);
    this.$lightbox.appendChild(middleDiv);
    rightDiv.appendChild(closeButton);
    rightDiv.appendChild(next);
    this.$lightbox.appendChild(rightDiv);
    this.$lightboxModal.appendChild(this.$lightbox);

    // display modal
    this.$lightboxModal.style.display = "block";
    this.$mainWrapper.setAttribute("aria-hidden", "true");
    this.$lightboxModal.setAttribute("aria-hidden", "false");
    this.$body.classList.add("no-scroll");

    // navigate modal
    this.onCloseButton();
    this.onPreviousButton();
    this.onNextButton();
    this.onKeyboardPress();
  }

  render() {
    this.createLightbox();
  }
}
