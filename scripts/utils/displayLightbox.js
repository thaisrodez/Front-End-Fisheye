function displayLightbox(mediaDom, handleLightBox) {
  const lightboxModal = document.getElementById("lightbox_modal");

  const imgElement = mediaDom.firstChild;
  // click
  imgElement.addEventListener("click", (e) => {
    // get element throught dataset
    handleLightBox.show(e.target.dataset.id);
    // set focus on lightbox navigation
    document.getElementById("previous-media").focus();
  });
  // keyboard
  imgElement.addEventListener("keydown", (e) => {
    if (
      lightboxModal.getAttribute("aria-hidden") === "true" &&
      e.key === "Enter"
    ) {
      handleLightBox.show(e.target.dataset.id);
      document.getElementById("previous-media").focus();
    }
  });
}
