class Media {
  constructor(title, image, video, likes, photographer) {
    this.image = image;
    this.video = video;
    this.likes = likes;
    this.title = title;
    this.photographer = photographer;
  }

  getMediaPath() {
    const photographerFirstName = this.photographer.name.split(" ")[0];
    const mediaFile = `assets/photos/${photographerFirstName}/${
      this.image || this.video
    }`;
    return mediaFile;
  }

  getMediaCardDom() {
    // DOM elements
    const article = document.createElement("article");
    // handle type of media
    let mediaElement = null;
    this.image
      ? (mediaElement = document.createElement("img"))
      : (mediaElement = document.createElement("video"));
    const infoDiv = document.createElement("div");
    const titleElement = document.createElement("h3");
    const likesElement = document.createElement("p");
    const heartIcon = document.createElement("i");

    // add attributes
    mediaElement.setAttribute("src", this.getMediaPath());
    mediaElement.setAttribute("alt", this.title);
    infoDiv.classList.add("media-details");
    titleElement.classList.add("red-text");
    likesElement.classList.add("red-text", "likes");
    heartIcon.classList.add("fa-solid", "fa-heart");

    // add content
    titleElement.textContent = this.title;
    likesElement.textContent = `${this.likes} `;

    // add element to DOM
    likesElement.appendChild(heartIcon);
    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(likesElement);
    article.appendChild(mediaElement);
    article.appendChild(infoDiv);

    return article;
  }

  getSelectMenu() {
    // get DOM elements
    const selectElt = document.querySelector("select");
    const selectDiv = document.querySelector(".custom-select");

    // create new Select Div
    const newSelect = document.createElement("div");
    // set attibutes and classes
    newSelect.classList.add("new-select");
    // set content
    newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;
    // add element to DOM
    selectDiv.appendChild(newSelect);

    // create menu and options elements
    const newMenu = document.createElement("div");
    newMenu.classList.add("select-items", "select-hide");

    for (let option of selectElt.options) {
      const newOption = document.createElement("div");
      newOption.innerHTML = option.innerHTML;
      // eventlistener on each option
      newOption.addEventListener("click", (e) => {
        // select right option
        for (let option of selectElt.options) {
          if (option.innerHTML === e.target.innerHTML) {
            selectElt.selectedIndex = option.index;
            // update top value with selected value
            newSelect.innerHTML = e.target.innerHTML;
            break;
          }
        }
        // close select menu by faking a click
        newSelect.click();
      });
      newMenu.appendChild(newOption);
    }
    // add newMenu to DOM
    selectDiv.appendChild(newMenu);

    // add eventListener on new select
    newSelect.addEventListener("click", (e) => {
      // prevent click propagation to childrens
      e.stopPropagation();
      // toggle menu on click
      e.target.nextElementSibling.classList.toggle("select-hide");
      // toggle active style
      e.target.classList.toggle("active");
    });
  }
}
