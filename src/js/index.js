function createEvents() {
  // fetch importa los datos del JSON
  // response.json los parsea y almacena en data
  fetch("./data/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container-events");

      for (let evento = 0; evento < 6; evento++) {
        // Convertir string en número (fecha)
        const convertDateStart = new Date(data[evento].dateStart);
        const convertDateFinal = new Date(data[evento].dateFinal);

        // Llamar función que imprime la fecha en el orden deseado
        const dateStart = dateFormat(convertDateStart);
        const dateFinal = dateFormat(convertDateFinal);

        // TARJETA
        const box = document.createElement("div");
        box.className = "card";
        // IMAGEN
        const image = document.createElement("img");
        image.className = "cta"; // para el modal
        image.src = data[evento].photoEvent;
        // NOMBRE
        const name = document.createElement("h4");
        name.innerText = data[evento].nameEvent;
        // LUGAR
        const place = document.createElement("p");
        place.innerText = data[evento].site;
        // FECHA
        const date = document.createElement("p");
        date.innerText = dateStart;
        content.appendChild(box);
        box.appendChild(image);
        box.appendChild(name);
        box.appendChild(place);
        box.appendChild(date);
      }
    });
}

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month) {
  const monthShortNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return (
    month.getDate() +
    " " +
    monthShortNames[month.getMonth()] +
    ", " +
    month.getFullYear()
  );
}

const allCTA = document.querySelectorAll(".btn-cta");
allCTA.forEach((btn) => btn.addEventListener("click", () => {
  window.location.href = "https://www.app.anecevents.com/";
}));

/* Función del slider de logos de patrocinadores
 * Selecciono todas las imágenes del contenedor con la variable Sponsors lo que me da un array
 * */
const Sponsors = document.querySelectorAll(".container-img>img");

let indexSlider = 0;
// Le añado a todas una clase que las oculta
const hideImg = () => {
  Sponsors.forEach((img) => img.classList.add("hidden"));
};

function nextSliderImg() {
  if (indexSlider === 0 && Sponsors[indexSlider].className === "hidden") {
    return Sponsors[indexSlider].classList.remove("hidden");
  } else {
    Sponsors[indexSlider].classList.add("hidden");
    // Index se esta igualando a la condición del ternario
    indexSlider = indexSlider < Sponsors.length - 1 ? indexSlider + 1 : 0;
    Sponsors[indexSlider].classList.remove("hidden");
  }
}

function responsiveFooter() {
  if (window.innerWidth <= 768) {
    hideImg();
    nextSliderImg();
    setInterval(nextSliderImg, 3000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  createEvents();
  responsiveFooter();
});
