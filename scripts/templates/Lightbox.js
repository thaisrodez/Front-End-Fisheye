class LightBox {
  constructor(media) {
    this._image = media._image;
    this._video = media._video;
    this._title = media._title;

    // lightbox modal inner div
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");

    this.$lightboxModal = document.getElementById("lightbox_modal");
    this.$mainWrapper = document.getElementById("main");
  }

  onCloseButton() {
    document.getElementById("close_lightbox").addEventListener("click", () => {
      this.$lightboxModal.style.display = "none";
      this.$mainWrapper.setAttribute("aria-hidden", "false");
      this.$lightboxModal.setAttribute("aria-hidden", "true");
    });
  }

  createLightbox() {
    // create DOM element
    const closeButton = document.createElement("img");
    let mediaElement = null;
    this._image
      ? (mediaElement = document.createElement("img"))
      : (mediaElement = document.createElement("video"));

    // set attributes
    closeButton.setAttribute("src", "assets/icons/close.svg");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("id", "close_lightbox");
    closeButton.setAttribute("alt", "Fermer le formulaire de contact");

    // insert element in DOM
    this.$lightbox.appendChild(closeButton);
    this.$lightboxModal.appendChild(this.$lightbox);

    // display modal
    this.$lightboxModal.style.display = "block";
    this.$mainWrapper.setAttribute("aria-hidden", "true");
    this.$lightboxModal.setAttribute("aria-hidden", "false");

    // close modal
    this.onCloseButton();
  }

  render() {
    this.createLightbox();
  }
}
