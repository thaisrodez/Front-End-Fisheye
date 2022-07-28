// get photogrpahers data
const getPhotographers = async () => {
  try {
    const jsonFile = "data/photographers.json";
    const res = await fetch(jsonFile);
    const data = await res.json();
    const photographers = await data.photographers;

    return photographers;
  } catch (error) {
    console.log(error);
  }
};

// display photographers data
const displayData = (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

const init = async () => {
  // get photographers data
  const photographers = await getPhotographers();
  // display photographers data
  displayData(photographers);
};

init();
