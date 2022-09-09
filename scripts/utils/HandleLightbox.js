/* global LightBox*/

class HandleLightbox {
  constructor(mediasArray, currentPhotographer) {
    this.currentMedia = null;
    this._mediasArray = mediasArray;
    this._currentPhotographer = currentPhotographer;

    // lightbox modal inner div
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");

    this.$lightboxModal = document.getElementById("lightbox_modal");
    this.$mainWrapper = document.getElementById("main");
    this.$body = document.querySelector("body");
  }

  show(mediaId) {
    this.currentMedia = this.getMediaById(mediaId);
    this.render();
  }

  next() {
    const index = this._mediasArray.findIndex(
      (media) => media.id === parseInt(this.currentMedia.id, 10)
    );
    // handle last element
    if (index === this._mediasArray.length - 1) {
      this.currentMedia = this._mediasArray[0];
    } else {
      this.currentMedia = this._mediasArray[index + 1];
    }
    this.render();
  }

  previous() {
    const index = this._mediasArray.findIndex(
      (media) => media.id === parseInt(this.currentMedia.id, 10)
    );
    // handle first element
    if (index === 0) {
      this.currentMedia = this._mediasArray[this._mediasArray.length - 1];
    } else {
      this.currentMedia = this._mediasArray[index - 1];
    }
    this.render();
  }

  closeModal() {
    this.$lightboxModal.classList.remove("show-modal");
    this.$lightboxModal.classList.add("hide-modal");
    this.$mainWrapper.setAttribute("aria-hidden", "false");
    this.$lightboxModal.setAttribute("aria-hidden", "true");
    this.$body.classList.remove("no-scroll");
  }

  manageEvents() {
    // close
    document.getElementById("close_lightbox").addEventListener("click", () => {
      this.closeModal();
    });
    // previous
    document.getElementById("previous-media").addEventListener("click", () => {
      this.previous();
    });
    //next
    document.getElementById("next-media").addEventListener("click", () => {
      this.next();
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
            this.next();
            break;
          case "ArrowLeft":
            this.previous();
            break;
        }
      }
    });
  }

  getMediaById(id) {
    return this._mediasArray.find((media) => media.id === parseInt(id, 10));
  }

  render() {
    const lightBox = new LightBox(this.currentMedia, this._currentPhotographer);
    const lightBoxDom = lightBox.createLightbox();
    // empty lightbox
    this.$lightboxModal.innerHTML = "";
    // insert lightbox in modal
    this.$lightboxModal.appendChild(lightBoxDom);

    // display modal
    this.$mainWrapper.setAttribute("aria-hidden", "true");

    // display modal
    this.$lightboxModal.classList.replace("hide-modal", "show-modal");
    this.$lightboxModal.setAttribute("aria-hidden", "false");
    this.$body.classList.add("no-scroll");

    // navigate modal
    this.manageEvents();
    this.onKeyboardPress();
  }
}
