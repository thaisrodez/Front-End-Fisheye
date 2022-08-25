const mainWrapper = document.getElementById("main");
const modal = document.getElementById("contact_modal");

// get photographer name

function displayModal() {
  modal.style.display = "block";
  // modal.setAttribute("aria-describedby"); need photographer name
  // set aria attributes
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
