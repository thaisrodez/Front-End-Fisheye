const mediaFactory = (data, photographer) => {
  const { image, video, likes, title } = data;
  console.log("d", data);

  // find image file path
  const photographerFirstName = photographer.name.split(" ")[0];
  const mediaFile = `assets/photos/${photographerFirstName}/${image || video}`;

  const getMediaCardDom = () => {
    // DOM elements
    const article = document.createElement("article");
    // handle type of media
    let mediaElement = null;
    image
      ? (mediaElement = document.createElement("img"))
      : (mediaElement = document.createElement("video"));
    const infoDiv = document.createElement("div");
    const titleElement = document.createElement("h3");
    const likesElement = document.createElement("p");
    const heartIcon = document.createElement("i");

    // add attributes
    mediaElement.setAttribute("src", mediaFile);
    mediaElement.setAttribute("alt", title);
    infoDiv.classList.add("media-details");
    titleElement.classList.add("red-text");
    likesElement.classList.add("red-text", "likes");
    heartIcon.classList.add("fa-solid", "fa-heart");

    // add content
    titleElement.textContent = title;
    likesElement.textContent = `${likes} `;

    // add element to DOM
    likesElement.appendChild(heartIcon);
    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(likesElement);
    article.appendChild(mediaElement);
    article.appendChild(infoDiv);

    return article;
  };

  return { getMediaCardDom };
};
