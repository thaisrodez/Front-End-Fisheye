const photographerFactory = (data) => {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const hrefPhotographer = `./photographer.html?id=${id}`;

  const getUserCardDOM = () => {
    // photographer DOM element
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const photographerName = document.createElement("h2");
    const place = document.createElement("h3");
    const quote = document.createElement("p");
    const photographerPrice = document.createElement("p");

    // set attributes
    link.setAttribute("href", hrefPhotographer);
    link.setAttribute("aria-label", `${name}`);
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.classList.add("photographer_img");
    quote.classList.add("tagline");
    photographerPrice.classList.add("price");

    // text content
    photographerName.textContent = name;
    place.textContent = `${city}, ${country}`;
    quote.textContent = tagline;
    photographerPrice.textContent = `${price}€/jour`;

    // add element in DOM
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(photographerName);
    article.appendChild(place);
    article.appendChild(quote);
    article.appendChild(photographerPrice);
    return article;
  };

  const getPhotographerData = () => {
    // DOM elements
    // header infos
    const nameDiv = document.createElement("div");
    const nameTitle = document.createElement("h1");
    const cityElement = document.createElement("h2");
    const taglineElement = document.createElement("p");
    const img = document.createElement("img");

    // price and likes insert
    const insert = document.createElement("dic");
    const priceElement = document.createElement("p");

    // set attributes
    cityElement.classList.add("red-text");
    taglineElement.classList.add("photographer-tagline");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.classList.add("photographer_img");
    insert.classList.add("insert");

    // text content
    nameTitle.textContent = name;
    cityElement.textContent = `${city}, ${country}`;
    taglineElement.textContent = tagline;
    priceElement.textContent = `${price}€ / jour`;

    // add element in DOM
    nameDiv.appendChild(nameTitle);
    nameDiv.appendChild(cityElement);
    nameDiv.appendChild(taglineElement);
    insert.appendChild(priceElement);
    return { nameDiv, img, insert };
  };
  return { getUserCardDOM, getPhotographerData };
};
