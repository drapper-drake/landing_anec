function createEvents() {
  // fetch importa los datos del JSON
  // response.json los parsea y almacena en data
  fetch("/js/eventosNavidad.json")
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
  window.location.href = "https://www.anecevents.com/";
}));

window.addEventListener("DOMContentLoaded", () => {
  createEvents();
});
