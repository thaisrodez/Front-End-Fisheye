const mainWrapper = document.getElementById("main");
const modal = document.getElementById("contact_modal");

// get photographer name
async function getPhotographer() {
  const photographerApi = new PhotographerApi("data/photographers.json");
  const photographersData = await photographerApi.getPhotographers();
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const photographerId = urlParams.get("id");

  const currentPhotographer = photographersData.find(
    (photographer) => photographer.id == photographerId
  );
  return currentPhotographer;
}

async function displayModal() {
  const photographer = await getPhotographer();
  modal.style.display = "block";
  // set aria attributes
  modal.setAttribute("aria-describedby", `Contactez-moi ${photographer.name}`);
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  const closeButton = document.getElementById("close_button");
  closeButton.focus();
}

function closeModal() {
  modal.style.display = "none";
  // set aria attributes
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
}

// close modal when press Escape
document.addEventListener("keydown", (e) => {
  if (modal.getAttribute("aria-hidden") === "false" && e.key === "Escape") {
    closeModal();
  }
});
