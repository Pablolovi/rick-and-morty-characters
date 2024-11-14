// Obtener los elementos HTML
const characterList = document.getElementById('character-list');
const buttonPrev = document.getElementById('prev-page');
const buttonNext = document.getElementById('next-page');
let currentPage = 1;

// Función para obtener los personajes de la API
function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json()) // Convertir la respuesta en formato JSON
    .then(data => {
      // Limpiar la lista antes de agregar los nuevos personajes
      characterList.innerHTML = '';

      // Iterar sobre los personajes de la página y mostrarlos
      data.results.forEach(character => {
        const characterItem = document.createElement('li');
        characterItem.innerHTML = `
          <img src="${character.image}" alt="${character.name}" /> <!-- Imagen -->
          <h3>${character.name}</h3> <!-- Nombre -->
          <p>${character.species}</p> <!-- Especie -->
        `;
        characterList.appendChild(characterItem); // Agregar a la lista
      });
    })
    .catch(error => {
      console.error('Error fetching characters:', error); // En caso de error
    });
}

// Función para actualizar la paginación
function updatePagination() {
  buttonPrev.disabled = currentPage === 1; // Deshabilitar si es la primera página
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage + 1}`)
    .then(response => response.json())
    .then(data => {
      buttonNext.disabled = !data.info.next; // Deshabilitar si no hay siguiente página
    });
}

// Cargar los personajes cuando se abre la página
fetchCharacters(currentPage);
updatePagination();

// Manejar el clic en el botón "Previous Page"
buttonPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
    updatePagination();
  }
});

// Manejar el clic en el botón "Next Page"
buttonNext.addEventListener("click", () => {
  currentPage++;
  fetchCharacters(currentPage);
  updatePagination();
});
