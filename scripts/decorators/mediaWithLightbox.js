function mediaWithLightbox(media) {
  media.$article.addEventListener("click", (e) => {
    e.preventDefault();
    const lightBox = new LightBox(media);
    lightBox.render();
  });
  return media;
}
