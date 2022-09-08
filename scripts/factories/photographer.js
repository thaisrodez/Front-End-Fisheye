class Photographer {
  constructor(data, totalLikes) {
    this._id = data.id;
    this._name = data.name;
    this._portrait = data.portrait;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._picture = `assets/photographers/${this._portrait}`;
    this._hrefPhotographer = `./photographer.html?id=${this._id}`;
    this._totalLikes = totalLikes;
  }

  getUserCardDOM = () => {
    // photographer DOM element
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const photographerName = document.createElement("h2");
    const place = document.createElement("h3");
    const quote = document.createElement("p");
    const photographerPrice = document.createElement("p");

    // set attributes
    link.setAttribute("href", this._hrefPhotographer);
    link.setAttribute("aria-label", `${this._name}`);
    img.setAttribute("src", this._picture);
    img.setAttribute("alt", "");
    img.classList.add("photographer_img");
    quote.classList.add("tagline");
    photographerPrice.classList.add("price");

    // text content
    photographerName.textContent = this._name;
    place.textContent = `${this._city}, ${this._country}`;
    quote.textContent = this._tagline;
    photographerPrice.textContent = `${this._price}€/jour`;

    // add element in DOM
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(photographerName);
    article.appendChild(place);
    article.appendChild(quote);
    article.appendChild(photographerPrice);
    return article;
  };

  getPhotographerHeaderDOM = () => {
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
    const likesElement = document.createElement("p");

    // set attributes
    cityElement.classList.add("red-text");
    taglineElement.classList.add("photographer-tagline");
    img.setAttribute("src", this._picture);
    img.setAttribute("alt", this._name);
    img.classList.add("photographer_img");
    insert.classList.add("insert");

    // text content
    nameTitle.textContent = this._name;
    cityElement.textContent = `${this._city}, ${this._country}`;
    taglineElement.textContent = this._tagline;
    priceElement.textContent = `${this._price}€ / jour`;
    likesElement.innerHTML = `<p>${this._totalLikes} <i class="fa-solid fa-heart"></i></p>`;

    // add element in DOM
    nameDiv.appendChild(nameTitle);
    nameDiv.appendChild(cityElement);
    nameDiv.appendChild(taglineElement);
    insert.appendChild(likesElement);
    insert.appendChild(priceElement);
    return { nameDiv, img, insert };
  };
}
