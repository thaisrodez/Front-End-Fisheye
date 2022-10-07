/* global PhotographerApi, MediaApi, Photographer, Sorter, SorterForm, HandleLightbox,
Media, ContactForm, submit, displayLightbox, handleLikes, UtilForm */

class PhotographerPage {
  constructor() {
    this.photographerApi = new PhotographerApi("data/photographers.json");
    this.mediaApi = new MediaApi("data/photographers.json");

    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$photographerMain = document.getElementById("main");
    this.$portfolio = document.querySelector(".portfolio");
    this.$contactBtn = document.querySelector(".contact_button");
  }

  async getPhotographer() {
    const photographersData = await this.photographerApi.getPhotographers();
    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    const photographerId = urlParams.get("id");

    const currentPhotographer = photographersData.find(
      (photographer) => photographer.id === parseInt(photographerId, 10)
    );
    return currentPhotographer;
  }

  async getPhotographerMedias() {
    const mediasData = await this.mediaApi.getMedias();
    const photographer = await this.getPhotographer();

    const photographerMedia = mediasData.filter(
      (media) => media.photographerId === photographer.id
    );
    return photographerMedia;
  }

  async main() {
    const currentPhotographer = await this.getPhotographer();
    const medias = await this.getPhotographerMedias();
    let totalLikesArray = [];

    // insert sorting button
    const Sorter = new SorterForm(medias, currentPhotographer);
    Sorter.render();

    const handleLightBox = new HandleLightbox(medias, currentPhotographer);

    // insert photographer medias
    medias.forEach((media) => {
      totalLikesArray.push(media.likes);
      const mediaModel = new Media(media, currentPhotographer);
      const mediaDom = mediaModel.getMediaCardDom();
      this.$portfolio.appendChild(mediaDom);
      // lightbox
      displayLightbox(mediaDom, handleLightBox);
    });

    // get total Likes
    const totalLikes = totalLikesArray.reduce((a, b) => a + b);

    // insert photographer bio details
    const photographerModel = new Photographer(currentPhotographer, totalLikes);

    const { nameDiv, img, insert } =
      photographerModel.getPhotographerHeaderDOM();
    this.$photographerHeader.prepend(nameDiv);
    this.$photographerHeader.appendChild(img);
    this.$photographerMain.appendChild(insert);

    // handle likes
    handleLikes();

    const utilForm = new UtilForm(currentPhotographer);
    this.$contactBtn.addEventListener("click", () => utilForm.displayModal());
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
