function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("./data/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container-events");
      changeformatDateJSON(data);
      data.sort((a,b) => a.dateStart - b.dateStart)
      for (let evento = 0; evento < 6; evento++) {
        createEvent(data[evento], content, evento);
      }
    });
}
function changeformatDateJSON (dataJSON){
  for (let index in dataJSON) {
    dataJSON[index].dateStart = new Date(dataJSON[index].dateStart);
    if(dataJSON[index].hasOwnProperty("dateFinal")){
    dataJSON[index].dateFinal = new Date(dataJSON[index].dateFinal);
    }
  }
}
// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(evento, container, position) {
  // Convertir string en número (fecha)
  let dateStart = dateFormat(evento.dateStart, true);

  const containerCard = document.createElement("div");
  containerCard.className = "container-card";
  container.appendChild(containerCard);
  // DIV DE LA IMAGEN
  const photoEvent = document.createElement("div");
  photoEvent.className = "photoEvent";
  // IMAGEN
  const image = document.createElement("img");
  image.src = evento.photoEvent;
  image.className = "cta";
  // TARJETA
  const card = document.createElement("div");
  card.className = "card";
  // DATOS TARJETA
  const infoCard = document.createElement("div");
  infoCard.className = "info-card";
  // NOMBRE
  const name = document.createElement("h4");
  name.innerText = evento.nameEvent;
  // LUGAR
  const place = document.createElement("p");
  place.innerText = evento.cityLocation;
  // BARRA DE ICONOS
  const bar = document.createElement("div");
  bar.className = "icons-bar";
  // DIV FECHA
  const dateCard = document.createElement("div");
  dateCard.className = "date-card";
  // FECHA
  const date = document.createElement("p");
  date.innerText = dateStart;

  container.appendChild(containerCard);
  containerCard.appendChild(photoEvent);
  photoEvent.appendChild(image);
  containerCard.appendChild(card);
  card.appendChild(infoCard);
  card.appendChild(dateCard);
  infoCard.appendChild(bar);
  infoCard.appendChild(name);
  infoCard.appendChild(place);
  dateCard.appendChild(date);
  if(evento.hasOwnProperty("dateFinal")){
    let dateF = dateFormat(evento.dateFinal,true );
    let dateEnd = document.createElement("p");
    dateEnd.innerText = dateF;
    let divider = document.createElement("hr");
    dateCard.appendChild(divider);
    dateCard.appendChild(dateEnd);
  }
  // ICONOS
  const IconContainer = document.createElement("figure");
  const Icon = document.createElement("img");
  bar.appendChild(IconContainer);
  IconContainer.appendChild(Icon);

  if (evento.free) {
    IconContainer.title = "Evento GRATUITO";
    Icon.src = "./img/free.png";
    Icon.alt = "Evento GRATUITO";
  } else {
    IconContainer.title = "Evento DE PAGO";
    Icon.src = "./img/pago.svg";
    Icon.alt = "Evento DE PAGO";
    bar.appendChild(IconContainer);
    IconContainer.appendChild(Icon);
  }
}
// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month) {
  const monthShortNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  return `${month.getDate()} ${monthShortNames[month.getMonth()]}`
  ;
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
  createAll();
  responsiveFooter();
});
