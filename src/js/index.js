import { listSrcCategories } from "./listSrcTitlesCategories.js";
const allEvents = [];
let activeCategory = "all";
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("./data/eventosAlicante.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container-events");
      for (const evento in data) {

        let idEvent = data[evento].nameEvent;
        idEvent = idEvent
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        data[evento].photoEvent = data[evento].photoEvent.replace("upload", "upload/w_500").replace("jpg", "webp");
        data[evento].id = idEvent;
        allEvents.push(data[evento]);
      }
      changeformatDateJSON();
      allEvents.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

      createEvent(content, responsiveNumberOfEvents(allEvents));
    });
}
function responsiveNumberOfEvents(list) {
  let numberOfEvents = 8;
  if (window.innerWidth <= 1280) {
    numberOfEvents = 6;
  }
  if (numberOfEvents > list.length) {
    numberOfEvents = list.length;
  }
  return list.slice(0, numberOfEvents);
}
function changeformatDateJSON() {
  for (const index in allEvents) {
    allEvents[index].dateStart = new Date(allEvents[index].dateStart);
    if (allEvents[index].hasOwnProperty("dateFinal")) {
      allEvents[index].dateFinal = new Date(allEvents[index].dateFinal);
    }
  }
}

// ESTA FUNCIÓN CREA CADA TARJETA DE EVENTO
function createEvent(container, listEvents) {
  for (const position in listEvents) {
    // Llamar función que imprime la fecha en el orden deseado
    const dateStart = dateFormat(listEvents[position].dateStart, true);
    const containerCard = document.createElement("div");
    containerCard.className = "container-card";
    containerCard.dataset.id = listEvents[position].id;
    // DIV DE LA IMAGEN
    const photoEvent = document.createElement("div");
    photoEvent.className = "photo-event";
    // IMAGEN
    const image = document.createElement("img");
    image.src = listEvents[position].photoEvent;
    image.alt = `Cartel del evento ${listEvents[position].nameEvent}`;
    // DATOS TARJETA
    const infoCard = document.createElement("div");
    infoCard.className = "info-card";
    // NOMBRE
    const name = document.createElement("h3");
    name.tabIndex = "0"
    name.innerText = listEvents[position].nameEvent;
    // LUGAR
    const place = document.createElement("p");
    place.tabIndex = "0"
    place.innerText = listEvents[position].cityLocation;
    // BARRA DE ICONOS
    const bar = document.createElement("div");
    bar.className = "icons-bar";
    // FECHA
    const date = document.createElement("p");
    date.tabIndex = "0"
    date.innerText = `Solo el ${dateStart}`;
    if (listEvents[position].hasOwnProperty("dateFinal")) {
      const dateF = dateFormat(listEvents[position].dateFinal, true);
      const resultado = allYear(dateStart, dateF);
      if (!resultado) {
        date.innerText = `Del ${dateStart}  al ${dateF}`;
      } else {
        date.innerText = "Todo el año";
      }
    }
    let infoSR = document.createElement('p')
    infoSR.className = "sr-only"
    infoSR.innerText = listEvents[position].free ? "Evento Gratuito" : "Evento de Pago"
    let infoCategoriesSR = document.createElement('p')
    infoCategoriesSR.className = "sr-only"
    infoCategoriesSR.innerText = 'Categorias del evento:'
    container.appendChild(containerCard);
    containerCard.appendChild(photoEvent);
    photoEvent.appendChild(image);
    containerCard.appendChild(infoCard);
    infoCard.appendChild(name);
    infoCard.appendChild(place);
    infoCard.appendChild(date);
    infoCard.appendChild(infoSR);
    infoCard.appendChild(bar);
    bar.appendChild(infoCategoriesSR);

    // ICONO GRATUITO / DE PAGO
    const freeIconContainer = document.createElement("div");
    freeIconContainer.className = "tooltip";
    const freeIcon = document.createElement("img");
    const freeIconText = document.createElement("span");
    freeIconText.className = "tooltip-text";
    photoEvent.appendChild(freeIconContainer);
    freeIconContainer.appendChild(freeIcon);
    freeIconContainer.appendChild(freeIconText);

    if (listEvents[position].free) {
      freeIconText.textContent = "Evento GRATUITO";
      freeIcon.src = "./img/icons/gratis.svg";
      freeIcon.alt = "Evento GRATUITO";
    } else {
      freeIconText.textContent = "Evento de PAGO";
      freeIcon.src = "./img/icons/Pago-euro.svg";
      freeIcon.alt = "Evento de PAGO";
    }
    // ICONO BENÉFICO
    if (listEvents[position].charity) {
      const charityIconContainer = document.createElement("div");
      const charityIcon = document.createElement("img");
      const charityIconText = document.createElement("p");
      charityIconText.textContent = "Benéfico";
      charityIcon.alt = " ";
      charityIcon.src = "./img/icons/Charity.svg";
      bar.appendChild(charityIconContainer);
      charityIconContainer.appendChild(charityIcon);
      charityIconContainer.appendChild(charityIconText);
    }
    // ICONOS DE CATEGORÍAS
    for (const cat in listEvents[position].category) {
      const categoryIconContainer = document.createElement("div");
      const categoryIcon = document.createElement("img");
      const categoryIconInfo = document.createElement("p");
      // ? ListSrcCategories es un objeto con cada tipo de categoria y toda su info
      categoryIconInfo.tabIndex = "0"
      categoryIconInfo.textContent = listSrcCategories[listEvents[position].category[cat]].nameIconEvent || console.error("Esta categoria no existe", listEvents[position].category[cat]);
      categoryIcon.src = listSrcCategories[listEvents[position].category[cat]].iconEvent;
      categoryIcon.alt = "Icono de" + listSrcCategories[listEvents[position].category[cat]].nameIconEvent;
      bar.appendChild(categoryIconContainer);
      categoryIconContainer.appendChild(categoryIcon);
      categoryIconContainer.appendChild(categoryIconInfo);
    }
  }
}

// Función que convierte número del mes en nombre del mes reducido en español
function dateFormat(month, dateShort = false) {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let monthFormat = monthNames[month.getMonth()];
  const year = month.getFullYear();
  if (dateShort) {
    monthFormat = monthFormat.toUpperCase().substring(0, 3);
  }
  return `${month.getDate()} ${monthFormat} ${year} `;
}
function allYear(dateFrom, dateTo) {
  const dateFromNoYear = dateFrom.substr(0, 5);
  const dateToNoYear = dateTo.substr(0, 6);

  return dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC";
}
// función que muestra los eventos filtrados
function resetAndCreateEventsFiltered(listFiltered) {
  const resetContent = document.querySelector(".container-events");
  resetContent.innerHTML = "";
  if (listFiltered.length === [].length) {
    console.error("No hay eventos ni página de 404");
  } else {
    listFiltered = responsiveNumberOfEvents(listFiltered);
    createEvent(resetContent, listFiltered);
  }
}
const ChangeStyleAndFilter = (div) => {
  div.addEventListener("click", (e) => {
    DivFilterCategory.forEach(div => {
      div.className = "filter-unselected";
    });

    div.className = "filter-selected";
    const idCategory = e.currentTarget.id;
    // // Cambio Color SVG
    // document.querySelectorAll("svg >path").forEach(path => path.classList.remove("fill-dark")); // Pasan todos a Blanco
    // document.querySelectorAll(`#icon-${idCategory} >path`).forEach(path => path.classList.add("fill-dark")); // El seleccionado pasa Azul
    activeCategory = idCategory;
    filterByCategory(idCategory);
  });
};

const DivFilterCategory = document.querySelectorAll(".navegation > button");
DivFilterCategory.forEach(ChangeStyleAndFilter);
const filterByCategory = (category) => {
  if (category === "all") {
    const list = [...allEvents];
    resetAndCreateEventsFiltered(list);
  } else {
    const listCategoryEvent = allEvents.filter(events => events.category.includes(category));
    resetAndCreateEventsFiltered(listCategoryEvent);
  }
};

const allCTA = document.querySelectorAll(".btn-cta");
allCTA.forEach((btn) =>
  btn.addEventListener("click", () => {
    window.location.href = "https://www.app.anecevents.com/";
  })
);

window.addEventListener("DOMContentLoaded", () => {
  createAll();
});
