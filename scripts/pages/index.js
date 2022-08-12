class Home {
  constructor() {
    this.photographerApi = new PhotographerApi("data/photographers.json");

    this.$photographersSection = document.querySelector(
      ".photographer_section"
    );
  }

  async main() {
    // get photographers data
    const photographersData = await this.photographerApi.get();

    // display photographers data
    photographersData.photographers.forEach((photographer) => {
      const photographerModel = new Photographer(photographer);
      const photographerCardDom = photographerModel.getUserCardDOM();
      this.$photographersSection.appendChild(photographerCardDom);
    });
  }
}

const home = new Home();
home.main();
