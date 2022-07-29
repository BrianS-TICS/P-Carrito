// Variables

// Contenedor de selector de los cursos
const carrito = document.querySelector("#carrito");
// Lista de los cursos
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
// Listado de cursos
const listaCursos = document.querySelector("#lista-cursos");
// Boton para vaciar carrito
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");

let carritoDeCompras = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso precionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Vaciar carrito 
    btnVaciarCarrito.addEventListener('click',vaciarCarrito);
}

//Funciones

function vaciarCarrito(e){
    if(e.target){
        carritoDeCompras = [];
        limpiarhtml();
    }
}

function agregarCurso(e) {
    e.preventDefault();// Previene la accion por defecto
    // ParentElement es para seleccionar al padre del elemento
    const cursoSeleccionado = e.target.parentElement.parentElement;

    if (e.target.classList.contains('agregar-carrito')) {
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    console.log(e.target.classList);

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo por data-id
        carritoDeCompras = carritoDeCompras.filter(curso => curso.id !== cursoId);
        console.log(carritoDeCompras);

        // Llamo a que se refleje en html
        carritoHTML(); // Iteramos obre el carrito
    }
}

// Lee el contenido del html seleccionado con click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);
    // Creo  ub objeto con la informacion del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }



    // Revisa si un elemento ya existe en el carrrito
    const existe = carritoDeCompras.some(curso => curso.id === infoCurso.id); // some recorre un arreglo de objetos y valida si un elemento existe

    // Se puede hacer con foreach

    if (existe) {
        // Actualizamos la cantidad
        const cursos = carritoDeCompras.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            }
            else {
                return curso; // Retorna los no duplicados
            }
        });
        carritoDeCompras = [...cursos];
    }
    else {
        // Agrega elementos al arreglo de carrito
        // Esto copia el arreglo y le agreaga un elemento de nuevos datos
        carritoDeCompras = [...carritoDeCompras, infoCurso];
        console.log(carritoDeCompras);
    }

    console.log(existe);

    carritoHTML();
}


// Muestra el carrito de compras en el html
function carritoHTML() {

    //Limpiar el html
    limpiarhtml();

    //Recorre y genera el html
    carritoDeCompras.forEach(curso => {
        // Desestructuro el objeto curso
        const { imagen, titulo, precio, cantidad, id } = curso;
        const fila = document.createElement('tr');
        fila.innerHTML = `

        <td>
            <img src = "${imagen}" width = "100" ">
        </td>

        <td>
            ${titulo}
        </td>

        <td>
            ${precio}
        </td>

        <td>
            ${cantidad}
        </td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}" >X</a>
        </td>

        `;

        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(fila);
    });
}

// Elimina los cursos del tbody
function limpiarhtml() {
    //Forma lenta de eliminar codigo html
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}