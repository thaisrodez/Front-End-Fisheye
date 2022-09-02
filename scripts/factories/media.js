class Media {
  constructor(data, photographer) {
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._title = data.title;
    this._id = data.id;
    this._photographer = photographer;

    this.$article = document.createElement("article");
  }

  getMediaPath() {
    const photographerFirstName = this._photographer.name.split(" ")[0];
    const mediaFile = `assets/photos/${photographerFirstName}/${
      this._image || this._video
    }`;
    return mediaFile;
  }

  getMediaCardDom() {
    // DOM elements
    // handle type of media
    let mediaElement = null;
    this._image
      ? (mediaElement = document.createElement("img"))
      : (mediaElement = document.createElement("video"));
    const infoDiv = document.createElement("div");
    const titleElement = document.createElement("h3");
    const likesElement = document.createElement("p");
    const heartIcon = document.createElement("i");

    // data set
    mediaElement.setAttribute("data-id", this._id);
    // add attributes
    mediaElement.setAttribute("src", this.getMediaPath());
    this._image ? mediaElement.setAttribute("alt", this._title) : null;
    infoDiv.classList.add("media-details");
    titleElement.classList.add("red-text");
    likesElement.classList.add("red-text", "likes");
    heartIcon.classList.add("fa-solid", "fa-heart");

    // add content
    titleElement.textContent = this._title;
    likesElement.textContent = `${this._likes} `;

    // add element to DOM
    likesElement.appendChild(heartIcon);
    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(likesElement);
    this.$article.appendChild(mediaElement);
    this.$article.appendChild(infoDiv);

    return this.$article;
  }
}
