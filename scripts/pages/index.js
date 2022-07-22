async function getPhotographers() {
  try {
    const jsonFile = "data/photographers.json";
    const res = await fetch(jsonFile);
    const data = await res.json();
    const photographers = await data.photographers;

    return photographers;
  } catch (error) {
    console.log(error);
  }
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
