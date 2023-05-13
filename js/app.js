const formulario = document.querySelector("#formulario");
const listaNotas = document.querySelector("#lista-tweets");
let notas = [];

eventListerner();
function eventListerner() {
  formulario.addEventListener("submit", agregarNota);
  document.addEventListener("DOMContentLoaded", () => {
    notas = JSON.parse(localStorage.getItem("notas")) || [];
    mostrandoNota();
  });
}

function agregarNota(e) {
  e.preventDefault();
  const nota = document.querySelector("#tweet").value;
  if (nota === "") {
    mostrarEror("Por Favor Introduce Una Nota");
    return;
  }
  const notaObj = {
    id: Date.now(),
    nota, // esta sintaxis es igual a decir nota: nota
  };
  notas = [...notas, notaObj];
  console.log(notas);
  mostrandoNota();
  formulario.reset();
}

function mostrarEror(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error"); // este "error" es un estilo de css, no el parametro que se pasa al llamar la funcion
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);
  setTimeout(() => {
    mensajeError.remove(); // Esto lo busque y lo coloque porque el mesanje a mostrar no desaparecia, con esto a los 2 segundos se va
  }, 2000);
}

function mostrandoNota() {
  limpiar();
  if (notas.length > 0) {
    notas.forEach((nota) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";
      btnEliminar.onclick = () => {
        borrarNota(nota.id);
      };
      const li = document.createElement("li");
      li.innerText = nota.nota;
      li.appendChild(btnEliminar);
      listaNotas.appendChild(li);
    });
  }
  enviandoLS();
}

function borrarNota(id) {
  notas = notas.filter((nota) => nota.id !== id);
  mostrandoNota();
}

function enviandoLS() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function limpiar() {
  while (listaNotas.firstChild) {
    listaNotas.removeChild(listaNotas.firstChild);
  }
}
