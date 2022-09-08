/* global PhotographerApi, MediaApi, Photographer, Sorter, SorterForm, HandleLightbox, Media, ContactForm, submit*/

class PhotographerPage {
  constructor() {
    this.photographerApi = new PhotographerApi("data/photographers.json");
    this.mediaApi = new MediaApi("data/photographers.json");

    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$photographerMain = document.getElementById("main");
    this.$portfolio = document.querySelector(".portfolio");
    this.$contactModal = document.querySelector(".modal");
    this.$lightboxModal = document.getElementById("lightbox_modal");
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

  async handleLikes() {
    const likesBtn = document.querySelectorAll(".like-btn");
    const totalLikeText = document.getElementById("likes-count");

    likesBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const likeNumber = btn.parentElement.firstChild;
        if (btn.classList.contains("fa-regular")) {
          btn.classList.replace("fa-regular", "fa-solid");
          likeNumber.textContent = parseInt(likeNumber.textContent) + 1;
          totalLikeText.textContent = parseInt(totalLikeText.textContent) + 1;
        }
      });
    });
  }

  async main() {
    const currentPhotographer = await this.getPhotographer();
    const medias = await this.getPhotographerMedias();
    let totalLikesArray = [];

    // insert photographer medias
    medias.forEach((media) => {
      totalLikesArray.push(media.likes);
      const mediaModel = new Media(media, currentPhotographer);
      const mediaDom = mediaModel.getMediaCardDom();
      this.$portfolio.appendChild(mediaDom);
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
    this.handleLikes();

    const handleLightBox = new HandleLightbox(medias, currentPhotographer);
    document.querySelectorAll(".media-object").forEach((mediaDom) => {
      mediaDom.addEventListener("click", (e) => {
        // get element throught dataset
        handleLightBox.show(e.target.dataset.id);
      });
      mediaDom.addEventListener("keydown", (e) => {
        if (
          this.$lightboxModal.getAttribute("aria-hidden") === "true" &&
          e.key === "Enter"
        ) {
          handleLightBox.show(e.target.dataset.id);
        }
      });
    });

    // insert sorting button
    const Sorter = new SorterForm(medias, currentPhotographer);
    Sorter.render();

    // insert contact form
    const Form = new ContactForm(currentPhotographer);
    const formHeader = Form.getHeader();
    const formBody = Form.getForm();
    this.$contactModal.appendChild(formHeader);
    this.$contactModal.appendChild(formBody);
    // listen to form submission
    formBody.addEventListener("submit", submit);
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
