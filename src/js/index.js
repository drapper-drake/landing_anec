function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("./data/eventosNavidad.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container-events");
      changeformatDateJSON(data);
      data.sort((a, b) => a.dateStart - b.dateStart);
      for (let evento = 0; evento < 6; evento++) {
        createEvent(data[evento], content, evento);
      }
    });
}
function changeformatDateJSON(dataJSON) {
  for (const index in dataJSON) {
    dataJSON[index].dateStart = new Date(dataJSON[index].dateStart);
    if (dataJSON[index].hasOwnProperty("dateFinal")) {
      dataJSON[index].dateFinal = new Date(dataJSON[index].dateFinal);
    }
  }
}
// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(evento, container, position) {
  // Convertir string en número (fecha)
  const dateStart = dateFormat(evento.dateStart, true);

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
  if (evento.hasOwnProperty("dateFinal")) {
    const dateF = dateFormat(evento.dateFinal, true);
    const dateEnd = document.createElement("p");
    dateEnd.innerText = dateF;
    const divider = document.createElement("hr");
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
    Icon.src = "./img/iconos/Gratis.svg";
    Icon.alt = "Evento GRATUITO";
  } else {
    IconContainer.title = "Evento DE PAGO";
    Icon.src = "./img/iconos/pago.svg";
    Icon.alt = "Evento DE PAGO";
    bar.appendChild(IconContainer);
    IconContainer.appendChild(Icon);
  }
  if (evento.village) {
    const ruralIconContainer = document.createElement("figure");
    const ruralIcon = document.createElement("img");
    ruralIconContainer.title = "Evento RURAL";
    ruralIcon.src = "./img/iconos/iconoVillage.png";
    ruralIcon.alt = "Evento RURAL";
    bar.appendChild(ruralIconContainer);
    ruralIconContainer.appendChild(ruralIcon);
  } else {
    const cityIconContainer = document.createElement("figure");
    const cityIcon = document.createElement("img");
    cityIconContainer.title = "Evento URBANO";
    cityIcon.src = "./img/iconos/iconoCity.png";
    cityIcon.alt = "Evento URBANO";
    bar.appendChild(cityIconContainer);
    cityIconContainer.appendChild(cityIcon);
  }
  // ICONOS DE CATEGORÍAS
  for (const cat in evento.category) {
    switch (evento.category[cat]) {
      case "Christmas":
        const xmasIconContainer = document.createElement("figure");
        const xmasIcon = document.createElement("img");
        xmasIconContainer.title = "Evento NAVIDEÑO";
        xmasIcon.src = "./img/iconos/Navidad.svg";
        xmasIcon.alt = "Evento NAVIDEÑO";
        bar.appendChild(xmasIconContainer);
        xmasIconContainer.appendChild(xmasIcon);
        break;
      case "Kids":
        const kidsIconContainer = document.createElement("figure");
        const kidsIcon = document.createElement("img");
        kidsIconContainer.title = "Evento INFANTIL";
        kidsIcon.src = "./img/iconos/iconoKids.svg";
        kidsIcon.alt = "Evento INFANTIL";
        bar.appendChild(kidsIconContainer);
        kidsIconContainer.appendChild(kidsIcon);
        break;
      case "Play":
        const playIconContainer = document.createElement("figure");
        const playIcon = document.createElement("img");
        playIconContainer.title = "Evento LÚDICO";
        playIcon.src = "./img/iconos/iconoPlay.svg";
        playIcon.alt = "Evento LÚDICO";
        bar.appendChild(playIconContainer);
        playIconContainer.appendChild(playIcon);
        break;
      case "Music":
        const musicIconContainer = document.createElement("figure");
        const musicIcon = document.createElement("img");
        musicIconContainer.title = "Evento MUSICAL";
        musicIcon.src = "./img/iconos/iconoMusic.svg";
        musicIcon.alt = "Evento MUSICAL";
        bar.appendChild(musicIconContainer);
        musicIconContainer.appendChild(musicIcon);
        break;
      case "Sports":
        const sportIconContainer = document.createElement("figure");
        const sportIcon = document.createElement("img");
        sportIconContainer.title = "Evento DEPORTIVO";
        sportIcon.src = "./img/iconos/iconoSports.png";
        sportIcon.alt = "Evento DEPORTIVO";
        bar.appendChild(sportIconContainer);
        sportIconContainer.appendChild(sportIcon);
        break;
      case "Theatre":
        const theatreIconContainer = document.createElement("figure");
        const theatreIcon = document.createElement("img");
        theatreIconContainer.title = "Evento TEATRAL";
        theatreIcon.src = "./img/iconos/iconoTheatre.svg";
        theatreIcon.alt = "Evento TEATRAL";
        bar.appendChild(theatreIconContainer);
        theatreIconContainer.appendChild(theatreIcon);
        break;
      case "Party":
        const partyIconContainer = document.createElement("figure");
        const partyIcon = document.createElement("img");
        partyIconContainer.title = "Evento FESTIVO";
        partyIcon.src = "./img/iconos/iconoParty.svg";
        partyIcon.alt = "Evento FESTIVO";
        bar.appendChild(partyIconContainer);
        partyIconContainer.appendChild(partyIcon);
        break;
      case "Food":
        const foodIconContainer = document.createElement("figure");
        const foodIcon = document.createElement("img");
        foodIconContainer.title = "Evento GASTRONÓMICO";
        foodIcon.src = "./img/iconos/iconoFood.svg";
        foodIcon.alt = "Evento GASTRONÓMICO";
        bar.appendChild(foodIconContainer);
        foodIconContainer.appendChild(foodIcon);
        break;
      case "Museum":
        const museumIconContainer = document.createElement("figure");
        const museumIcon = document.createElement("img");
        museumIconContainer.title = "Evento de MUSEO";
        museumIcon.src = "./img/iconos/iconoMuseum.svg";
        museumIcon.alt = "Evento de MUSEO";
        bar.appendChild(museumIconContainer);
        museumIconContainer.appendChild(museumIcon);
        break;
      // Pongo el default por si acaso UwU
      default:
        const defaultIconContainer = document.createElement("figure");
        const defaultIcon = document.createElement("img");
        defaultIconContainer.title = "Evento POR DEFECTO";
        defaultIcon.src = "./img/iconos/xmark-solid.svg";
        defaultIcon.alt = "Evento POR DEFECTO";
        bar.appendChild(defaultIconContainer);
        defaultIconContainer.appendChild(defaultIcon);
        break;
    }
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
