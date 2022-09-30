function addLikes(element) {
  element.textContent = parseInt(element.textContent) + 1;
}

function onLikesClick(btn, likeEl, totalLikeEl) {
  btn.classList.replace("fa-regular", "fa-solid");
  this.addLikes(likeEl);
  this.addLikes(totalLikeEl);
}

function handleLikes() {
  const likesBtn = document.querySelectorAll(".like-btn");
  const totalLikeText = document.getElementById("likes-count");

  likesBtn.forEach((btn) => {
    // click
    btn.addEventListener("click", () => {
      const likeNumber = btn.parentElement.firstChild;
      if (btn.classList.contains("fa-regular")) {
        this.onLikesClick(btn, likeNumber, totalLikeText);
      }
    });

    // keyboard
    btn.addEventListener("keydown", (e) => {
      const likeNumber = btn.parentElement.firstChild;
      if (btn.classList.contains("fa-regular") && e.key === "Enter") {
        this.onLikesClick(btn, likeNumber, totalLikeText);
      }
    });
  });
}
