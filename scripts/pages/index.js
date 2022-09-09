/*global PhotographerApi, Photographer*/

class Home {
  constructor() {
    this.photographerApi = new PhotographerApi("data/photographers.json");

    this.$photographersSection = document.querySelector(
      ".photographer_section"
    );
  }

  async main() {
    // get photographers data
    const photographersData = await this.photographerApi.getPhotographers();

    // display photographers data
    photographersData.forEach((photographer) => {
      const photographerModel = new Photographer(photographer);
      const photographerCardDom = photographerModel.getUserCardDOM();
      this.$photographersSection.appendChild(photographerCardDom);
    });
  }
}

const home = new Home();
home.main();
