// get current url and photographer Id
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const photographerId = urlParams.get("id");

// get photographers data
const getPhotographers = async () => {
  try {
    const jsonFile = "./data/photographers.json";
    const res = await fetch(jsonFile);
    const data = await res.json();
    const { photographers, media } = await data;

    return { photographers, media };
  } catch (error) {
    console.log(error);
  }
};

const displayPhotographer = (photographer) => {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerMain = document.getElementById("main");

  const photographerInfo = photographerFactory(photographer);
  const { nameDiv, img, insert } = photographerInfo.getPhotographerData();
  // console.log(photographerHeaderDOM);
  photographerHeader.prepend(nameDiv);
  photographerHeader.appendChild(img);
  photographerMain.appendChild(insert);
};

const displayFilters = (medias, photographer) => {
  const Sorter = new SorterForm(medias, photographer);
  Sorter.render();
};

const displayMedia = (medias, photographer) => {
  const portfolio = document.querySelector(".portfolio");
  medias.forEach((media) => {
    const mediaModel = new Media(media, photographer);
    const mediaDom = mediaModel.getMediaCardDom();
    portfolio.appendChild(mediaDom);
  });
};

const init = async () => {
  const { photographers, media } = await getPhotographers();
  // photographer details
  const currentPhotographer = photographers.find(
    (photographer) => photographer.id == photographerId
  );
  displayPhotographer(currentPhotographer);

  // photographer media
  const photographerMedia = media.filter(
    (media) => media.photographerId == photographerId
  );
  displayFilters(photographerMedia, currentPhotographer);
  displayMedia(photographerMedia, currentPhotographer);
};

init();
