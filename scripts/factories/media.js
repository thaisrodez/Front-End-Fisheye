const mediaFactory = (data, photographer) => {
  const { image, video, likes, title } = data;
  console.log("d", data);

  // find image file path
  const photographerFirstName = photographer.name.split(" ")[0];
  const mediaFile = `assets/photos/${photographerFirstName}/${image || video}`;

  const getMediaCardDom = () => {
    // DOM elements
    const article = document.createElement("article");
    let mediaElement = null;
    if (image) mediaElement = document.createElement("img");
    if (video) mediaElement = document.createElement("video");
    const infoDiv = document.createElement("div");
    const titleElement = document.createElement("p");
    const likesElement = document.createElement("p");

    // add attributes
    mediaElement.setAttribute("src", mediaFile);
    mediaElement.setAttribute("alt", title);
    if (video) {
      mediaElement.setAttribute("controls", "");
    }
    infoDiv.classList.add("media-details");
    titleElement.classList.add("red-text");
    likesElement.classList.add("red-text");

    // add content
    titleElement.textContent = title;
    likesElement.textContent = likes;

    // add element to DOM
    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(likesElement);
    article.appendChild(mediaElement);
    article.appendChild(infoDiv);

    return article;
  };

  return { getMediaCardDom };
};
