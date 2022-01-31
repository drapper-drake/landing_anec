let allEvents = [];
function createAll() {
  // se importa el json, se parsea y almacena en data
  fetch("./data/eventosAlicante.json")
    .then((response) => response.json())
    .then((data) => {
      // data es un array de eventos
      const content = document.querySelector(".container-events");
      for (let evento in data) {
        let idEvent = data[evento].nameEvent;
        idEvent = idEvent
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
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
  for (let position in listEvents) {
    //Llamar función que imprime la fecha en el orden deseado
    let dateStart = dateFormat(listEvents[position].dateStart, true);
    let containerCard = document.createElement("div");
    containerCard.className = "container-card";
    containerCard.dataset.id = listEvents[position].id;
    //DIV DE LA IMAGEN
    let photoEvent = document.createElement("div");
    photoEvent.className = "photoEvent";
    //IMAGEN
    let image = document.createElement("img");
    image.src = listEvents[position].photoEvent;
    //DATOS TARJETA
    let infoCard = document.createElement("div");
    infoCard.className = "info-card";
    // NOMBRE
    let name = document.createElement("h3");
    name.innerText = listEvents[position].nameEvent;
    // LUGAR
    let place = document.createElement("p");
    place.innerText = listEvents[position].cityLocation;
    // BARRA DE ICONOS
    let bar = document.createElement("div");
    bar.className = "icons-bar";
    // FECHA
    let date = document.createElement("p");
    date.innerText = `Solo el ${dateStart}`;
    if (listEvents[position].hasOwnProperty("dateFinal")) {
      let dateF = dateFormat(listEvents[position].dateFinal, true);
      let resultado = allYear(dateStart, dateF);
      if (!resultado) {
        date.innerText = `Del ${dateStart}  al ${dateF}`;
      } else {
        date.innerText = `Todo el año`;
      }
    }

    container.appendChild(containerCard);
    containerCard.appendChild(photoEvent);
    photoEvent.appendChild(image);
    containerCard.appendChild(infoCard);
    infoCard.appendChild(name);
    infoCard.appendChild(place);
    infoCard.appendChild(date);
    infoCard.appendChild(bar);

    // ICONO GRATUITO / DE PAGO
    let freeIconContainer = document.createElement("div");
    freeIconContainer.className = "tooltip";
    let freeIcon = document.createElement("img");
    let freeIconText = document.createElement("span");
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
      let charityIconContainer = document.createElement("div");
      let charityIcon = document.createElement("img");
      let charityIconText = document.createElement("p");
      charityIconText.textContent = "Benéfico";
      charityIcon.src = "./img/icons/Charity.svg";
      bar.appendChild(charityIconContainer);
      charityIconContainer.appendChild(charityIcon);
      charityIconContainer.appendChild(charityIconText);
    }
    // ICONOS DE CATEGORÍAS
    for (let cat in listEvents[position].category) {
      let categoryIconContainer = document.createElement("div");
      let categoryIcon = document.createElement("img");
      let categoryIconInfo = document.createElement("p");
      switch (listEvents[position].category[cat]) {
        case "Christmas":
          categoryIconInfo.textContent = "Navidad";
          categoryIcon.src = "./img/icons/Navidad.svg";
          break;
        case "Kids":
          categoryIconInfo.textContent = "Infantil";
          categoryIcon.src = "./img/icons/Kids.svg";
          break;
        case "Play":
          categoryIconInfo.textContent = "Lúdico";
          categoryIcon.src = "./img/icons/Play.svg";
          break;
        case "Music":
          categoryIconInfo.textContent = "Música";
          categoryIcon.src = "./img/icons/Music.svg";
          break;
        case "Sports":
          categoryIconInfo.textContent = "Deporte";
          categoryIcon.src = "./img/icons/Sports.svg";
          break;
        case "Theatre":
          categoryIconInfo.textContent = "Teatro";
          categoryIcon.src = "./img/icons/Theatre.svg";
          break;
        case "Party":
          categoryIconInfo.textContent = "Fiestas";
          categoryIcon.src = "./img/icons/Cocktail.svg";
          break;
        case "Food":
          categoryIconInfo.textContent = "Gastronómico";
          categoryIcon.src = "./img/icons/Food.svg";
          break;
        case "Museum":
          categoryIconInfo.textContent = "Museo";
          categoryIcon.src = "./img/icons/Museum.svg";
          break;
        default:
          console.error(
            `Hay ninguna categoria con ese nombre ${listEvents[position].category[cat]}`
          );
          break;
      }
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
  let year = month.getFullYear();
  if (dateShort) {
    monthFormat = monthFormat.toUpperCase().substring(0, 3);
  }
  return `${month.getDate()} ${monthFormat} ${year} `;
}
function allYear(dateFrom, dateTo) {
  let dateFromNoYear = dateFrom.substr(0, 5);
  let dateToNoYear = dateTo.substr(0, 6);

  return dateFromNoYear === "1 ENE" && dateToNoYear === "31 DIC";
}
//función que muestra los eventos filtrados
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
const FilterNav = document.querySelectorAll(".navegation > div");

const navSelected =
  "flex justify-center items-center py-1 px-2 cursor-pointer text-dark font-bold bg-links-cta rounded";
const navUnselected =
  "flex justify-center items-center py-1 px-2 cursor-pointer font-bold bg-dark rounded";
FilterNav.forEach((category) => {
  category.addEventListener("click", () => {
    FilterNav.forEach((category) => (category.className = navUnselected));
    category.className = navSelected;
  });
});

FilterNav.forEach((category) =>
  category.addEventListener("click", (e) => {
    const idCategory = e.currentTarget.id;
    switch (idCategory) {
      case "all":
        resetAndCreateEventsFiltered(allEvents);
        break;
      default:
        resetAndCreateEventsFiltered(
          allEvents.filter((events) => events.category.includes(idCategory))
        );
        break;
    }
  })
);

const allCTA = document.querySelectorAll(".btn-cta");
allCTA.forEach((btn) =>
  btn.addEventListener("click", () => {
    window.location.href = "https://www.app.anecevents.com/";
  })
);

window.addEventListener("DOMContentLoaded", () => {
  createAll();

});
