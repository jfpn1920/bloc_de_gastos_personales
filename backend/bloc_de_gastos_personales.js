//---------------------------------------------//
//--|funcionalidad_bloc_de_gastos_personales|--//
//---------------------------------------------//
const campoMonto =
    document.getElementById(
        "monto"
    );
const campoPresupuesto =
    document.getElementById(
        "presupuesto"
    );
const campoCategoria =
    document.getElementById(
        "categoria"
    );
const campoDescripcion =
    document.getElementById(
        "descripcion"
    );
const botonAgregarGasto =
    document.getElementById(
        "boton_agregar_gasto"
    );
botonAgregarGasto.addEventListener(
    "click",
    function(){
        let monto =
            campoMonto.value.trim();
        let presupuesto =
            campoPresupuesto.value.trim();
        let categoria =
            campoCategoria.value.trim();
        let descripcion =
            campoDescripcion.value.trim();
        if(
            monto === "" ||
            presupuesto === "" ||
            categoria === "Ninguna categoría..." ||
            descripcion === ""
        ){
            alert(
                "Todos los campos son obligatorios"
            );
            return;
        }
        fetch(
            "bloc_de_gastos_personales.php",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },
                body:
                    "accion=agregar" +
                    "&descripcion=" +
                    encodeURIComponent(
                        descripcion
                    ) +
                    "&categoria=" +
                    encodeURIComponent(
                        categoria
                    ) +
                    "&monto=" +
                    encodeURIComponent(
                        monto
                    ) +
                    "&presupuesto=" +
                    encodeURIComponent(
                        presupuesto
                    )
            }
        )
        .then(
            function(
                respuesta
            ){
                return respuesta.json();
            }
        )
        .then(
            function(
                datos
            ){
                if(
                    datos.estado
                ){
                    alert(
                        "El gasto agregado ha sido creado exitosamente"
                    );
                    campoMonto.value =
                        "";
                    campoPresupuesto.value =
                        "";
                    campoCategoria.selectedIndex =
                        0;
                    campoDescripcion.value =
                        "";
                    cargarGastos();
                }else{
                    alert(
                        datos.mensaje
                    );
                }
            }
        )
        .catch(
            function(
                error
            ){
                console.error(
                    error
                );
                alert(
                    "Error al conectar con el servidor"
                );
            }
        );
    }
);
//--------------------------------------//
//--|funcionalidad_registro_de_gastos|--//
//--------------------------------------//
const totalGastado =
    document.getElementById(
        "total_gastado"
    );
const presupuestoTotal =
    document.getElementById(
        "presupuesto_total"
    );
const disponibleTotal =
    document.getElementById(
        "disponible_total"
    );
function actualizarRegistroDeGastos(){
    let totalMonto = 0;
    let presupuesto = 0;
    gastosGlobales.forEach(
        function(gasto){
            totalMonto +=
                Number(gasto.monto);
        }
    );
    if(
        gastosGlobales.length > 0
    ){
        presupuesto =
            Number(
                gastosGlobales[0].presupuesto
            );
    }
    let disponible =
        presupuesto -
        totalMonto;
    totalGastado.textContent =
        totalMonto;
    presupuestoTotal.textContent =
        presupuesto;
    disponibleTotal.textContent =
        disponible;
}
//-------------------------------------//
//--|funcionalidad_tablero_de_gastos|--//
//-------------------------------------//
const contenedorTablaGastos =
    document.getElementById(
        "contenedor_tabla_gastos"
    );
let gastosGlobales = [];
function agregarGastoEnTabla(
    id,
    descripcion,
    categoria,
    monto,
    presupuesto
){
    contenedorTablaGastos.innerHTML += `
        <tr>
            <td class="columna_numero_dato">
                ${id}
            </td>
            <td class="columna_descripcion_dato">
                ${descripcion}
            </td>
            <td class="columna_categoria_dato">
                ${categoria}
            </td>
            <td class="columna_monto_dato">
                ${monto}
            </td>
            <td class="columna_presupuesto_dato">
                ${presupuesto ?? "Sin presupuesto"}
            </td>
            <td class="columna_acciones_dato">
                <i class="fa-solid fa-eye icono_accion"
                    title="Vista previa"
                    onclick="vistaPreviaGasto(${id})"></i>
                <i class="fa-solid fa-pen-to-square icono_accion"
                    title="Editar"
                    onclick="editarGasto(${id})"></i>
                <i class="fa-solid fa-trash icono_accion"
                    title="Eliminar"
                    onclick="eliminarGasto(${id})"></i>
            </td>
        </tr>
    `;
}
function cargarGastos(){
    fetch("bloc_de_gastos_personales.php")
    .then(res => res.json())
    .then(gastos => {
        gastosGlobales = gastos;
        contenedorTablaGastos.innerHTML = "";
        if(!gastos || gastos.length === 0){
            contenedorTablaGastos.innerHTML = `
                <tr id="fila_mensaje_vacio">
                    <td colspan="6" class="mensaje_vacio">
                        Ningun gasto añadido en el tablero
                    </td>
                </tr>
            `;
            actualizarRegistroDeGastos();
            return;
        }
        gastos.forEach(gasto => {
            agregarGastoEnTabla(
                gasto.id,
                gasto.descripcion,
                gasto.categoria,
                gasto.monto,
                gasto.presupuesto
            );
        });
        actualizarRegistroDeGastos();
    })
    .catch(err => {
        console.error("Error cargando gastos:", err);
        contenedorTablaGastos.innerHTML = `
            <tr>
                <td colspan="6" class="mensaje_vacio">
                    Error al cargar los datos
                </td>
            </tr>
        `;
    });
}
//------------------//
//--|vista_previa|--//
//------------------//
function vistaPreviaGasto(id){
    const gasto =
        gastosGlobales.find(g => g.id == id);
    if(!gasto) return;
    alert(
        "N°: " + gasto.id +
        "\n\nDescripción: " + gasto.descripcion +
        "\n\nCategoría: " + gasto.categoria +
        "\n\nMonto: " + gasto.monto +
        "\n\nPresupuesto: " + gasto.presupuesto
    );
}
//------------------//
//--|editar_gasto|--//
//------------------//
function editarGasto(id){
    const gasto =
        gastosGlobales.find(g => g.id == id);
    if(!gasto) return;
    let nuevoMonto =
        prompt("Ingrese el nuevo monto:", gasto.monto);
    if(!nuevoMonto || nuevoMonto.trim() === "") return;
    fetch("bloc_de_gastos_personales.php", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },
        body:
            "accion=editar" +
            "&id=" + id +
            "&descripcion=" + encodeURIComponent(gasto.descripcion) +
            "&categoria=" + encodeURIComponent(gasto.categoria) +
            "&monto=" + encodeURIComponent(nuevoMonto) +
            "&presupuesto=" + encodeURIComponent(gasto.presupuesto)
    })
    .then(r => r.json())
    .then(data => {
        if(data.estado){
            cargarGastos();
        }else{
            alert(data.mensaje);
        }
    });
}
//--------------------//
//--|eliminar_gasto|--//
//--------------------//
function eliminarGasto(id){
    if(!confirm("¿Desea eliminar este gasto?")) return;
    fetch("bloc_de_gastos_personales.php", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },
        body:
            "accion=eliminar" +
            "&id=" + id
    })
    .then(r => r.json())
    .then(data => {
        if(data.estado){
            cargarGastos();
        }else{
            alert(data.mensaje);
        }
    });
}
cargarGastos();