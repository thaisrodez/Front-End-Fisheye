class LightBox {
  constructor(media, currentPhotographer) {
    this._image = media.image;
    this._video = media.video;
    this._title = media.title;
    this._mediaPath = new Media(media, currentPhotographer).getMediaPath();

    // lightbox modal inner div
    this.$lightbox = document.createElement("div");
    this.$lightbox.classList.add("lightbox");
  }

  createLightbox() {
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

    return this.$lightbox;
  }
}
