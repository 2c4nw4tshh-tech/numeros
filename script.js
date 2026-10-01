const listaNumeros = document.getElementById("listaNumeros");

// Cargar los nombres guardados
let nombres = JSON.parse(localStorage.getItem("nombresNumeros")) || {};

// Crear los números del 00 al 99
for (let i = 0; i <= 99; i++) {

    const numero = i.toString().padStart(2, "0");

    const fila = document.createElement("div");
    fila.className = "numero";

    fila.innerHTML = `
        <div class="numero-caja">${numero}</div>

        <input
            type="text"
            class="nombre"
            id="nombre-${numero}"
            placeholder="Escribe un nombre"
            value="${nombres[numero] || ""}"
        >

        <button
            class="boton"
            id="boton-${numero}"
            onclick="guardarNombre('${numero}')"
        >
            ${nombres[numero] ? "Editar" : "Guardar"}
        </button>
    `;

    listaNumeros.appendChild(fila);
}


// Guardar o editar un nombre
function guardarNombre(numero) {

    const input = document.getElementById(`nombre-${numero}`);
    const boton = document.getElementById(`boton-${numero}`);

    const nombre = input.value.trim();

    // Si está vacío
    if (nombre === "") {
        alert("Escribe un nombre antes de guardar.");
        input.focus();
        return;
    }

    // Guardar el nombre
    nombres[numero] = nombre;

    // Guardarlo permanentemente en el navegador
    localStorage.setItem("nombresNumeros", JSON.stringify(nombres));

    // Cambiar el botón a "Editar"
    boton.textContent = "Editar";

    // Pequeña confirmación visual
    boton.classList.add("editando");

    setTimeout(() => {
        boton.classList.remove("editando");
    }, 300);
}