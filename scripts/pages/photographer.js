class PhotographerPage {
  constructor() {
    this.photographerApi = new PhotographerApi("data/photographers.json");
    this.mediaApi = new MediaApi("data/photographers.json");

    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$photographerMain = document.getElementById("main");
    this.$portfolio = document.querySelector(".portfolio");
  }

  async getPhotographer() {
    const photographersData = await this.photographerApi.getPhotographers();
    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    const photographerId = urlParams.get("id");

    const currentPhotographer = photographersData.find(
      (photographer) => photographer.id == photographerId
    );
    return currentPhotographer;
  }

  async getPhotographerMedias() {
    const mediasData = await this.mediaApi.getMedias();
    const photographer = await this.getPhotographer();

    const photographerMedia = mediasData.filter(
      (media) => media.photographerId == photographer.id
    );
    return photographerMedia;
  }

  async main() {
    const currentPhotographer = await this.getPhotographer();
    const medias = await this.getPhotographerMedias();

    // insert photographer bio details
    const photographerModel = new Photographer(currentPhotographer);
    const { nameDiv, img, insert } =
      photographerModel.getPhotographerHeaderDOM();
    this.$photographerHeader.prepend(nameDiv);
    this.$photographerHeader.appendChild(img);
    this.$photographerMain.appendChild(insert);

    // insert photographer medias
    medias.forEach((media) => {
      const mediaModel = new Media(media, currentPhotographer);
      const mediaDom = mediaModel.getMediaCardDom();
      this.$portfolio.appendChild(mediaDom);
    });

    // insert sorting button
    const Sorter = new SorterForm(medias, currentPhotographer);
    Sorter.render();
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
