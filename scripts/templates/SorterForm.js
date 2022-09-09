class SorterForm {
  constructor(Medias, photographer) {
    this.medias = Medias;
    this.photographer = photographer;

    this.$newSelect = document.createElement("button");
    this.$selectElt = document.querySelector("select");
    this.$selectDiv = document.querySelector(".custom-select");
    this.$portfolio = document.querySelector(".portfolio");
  }

  sortMedias(sorter) {
    this.clearMediasWrapper();

    if (sorter) {
      const sortedData = Sorter.sorter(this.medias, sorter);
      const sortedMedias = sortedData.data;

      sortedMedias.forEach((media) => {
        const template = new Media(media, this.photographer);
        this.$portfolio.appendChild(template.getMediaCardDom());
      });
    } else {
      this.medias.forEach((media) => {
        const template = new Media(media, this.photographer);
        this.$portfolio.appendChild(template.getMediaCardDom());
      });
    }
  }

  clearMediasWrapper() {
    this.$portfolio.innerHTML = "";
  }

  render() {
    // set attibutes and classes
    this.$newSelect.classList.add("new-select");
    // this.$newSelect.setAttribute("role", "button");
    this.$newSelect.setAttribute("aria-haspopup", "listbox");
    this.$newSelect.setAttribute("aria-labelledby", "filter-label");

    // set content
    this.$newSelect.innerHTML =
      this.$selectElt.options[this.$selectElt.selectedIndex].innerHTML;
    // add element to DOM
    this.$selectDiv.appendChild(this.$newSelect);

    // create custom select
    const newMenu = document.createElement("div");
    newMenu.classList.add("select-items", "select-hide");
    newMenu.setAttribute("role", "listbox");
    for (let option of this.$selectElt.options) {
      // create custom select options
      const newOption = document.createElement("div");
      newOption.innerHTML = option.innerHTML;
      newOption.setAttribute("role", "option");
      newOption.setAttribute("id", option.value);
      newOption.setAttribute("tabindex", option.index.toString());
      // eventlistener on each option
      newOption.addEventListener("click", (e) => {
        // select right option
        for (let option of this.$selectElt.options) {
          if (option.innerHTML === e.target.innerHTML) {
            newMenu.setAttribute("aria-activedescendant", newOption.id);
            this.sortMedias(option.value);
            this.$selectElt.selectedIndex = option.index;
            // update top value with selected value
            this.$newSelect.innerHTML = e.target.innerHTML;
            break;
          }
        }
        // close select menu by faking a click
        this.$newSelect.click();
        this.$newSelect.setAttribute("aria-expanded", "false");
      });
      newMenu.appendChild(newOption);
    }
    // add custom select to DOM
    this.$selectDiv.appendChild(newMenu);

    // display new menu on click
    this.$newSelect.addEventListener("click", (e) => {
      // prevent click propagation to childrens
      e.stopPropagation();
      // toggle menu on click
      e.target.nextElementSibling.classList.toggle("select-hide");
      // toggle active style
      e.target.classList.toggle("active");
      e.target.setAttribute("aria-expanded", "true");
      for (let child of newMenu.children) {
        child.focus();
      }
    });
  }
}
