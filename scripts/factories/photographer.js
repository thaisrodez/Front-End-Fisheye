function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photo de ${name} - lien vers la page de ${name}`);
    const photographer_name = document.createElement("h2");
    photographer_name.textContent = name;
    const place = document.createElement("h3");
    place.textContent = `${city}, ${country}`;
    const quote = document.createElement("p");
    quote.textContent = tagline;
    quote.classList.add("tagline");
    const photographer_price = document.createElement("p");
    photographer_price.textContent = `${price}€/jour`;
    photographer_price.classList.add("price");
    article.appendChild(img);
    article.appendChild(photographer_name);
    article.appendChild(place);
    article.appendChild(quote);
    article.appendChild(photographer_price);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
