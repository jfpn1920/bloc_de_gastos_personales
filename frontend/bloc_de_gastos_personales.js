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
let numeroGasto =
    JSON.parse(
        localStorage.getItem(
            "gastos"
        )
    )?.length + 1 || 1;
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
        let gastos =
            JSON.parse(
                localStorage.getItem(
                    "gastos"
                )
            ) || [];
        if(
            gastos.length >= 23
        ){
            alert(
                "El tablero solo permite un máximo de 23 gastos"
            );
            return;
        }
        if(
            monto !== "" &&
            presupuesto !== "" &&
            categoria !== "Ninguna categoría..." &&
            descripcion !== ""
        ){
            let nuevoGasto = {
                numero:
                    numeroGasto,
                descripcion:
                    descripcion,
                categoria:
                    categoria,
                monto:
                    monto,
                presupuesto:
                    presupuesto
            };
            gastos.push(
                nuevoGasto
            );
            localStorage.setItem(
                "gastos",
                JSON.stringify(
                    gastos
                )
            );
            agregarGastoEnTabla(
                numeroGasto,
                descripcion,
                categoria,
                monto,
                presupuesto
            );
            numeroGasto++;
            alert(
                "El gasto agregado ha sido creado exitosamente"
            );
            campoMonto.value = "";
            campoPresupuesto.value = "";
            campoCategoria.selectedIndex = 0;
            campoDescripcion.value = "";
        }else{
            alert(
                "El gasto no ha sido agregado"
            );
        }
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
    let gastos =
        JSON.parse(
            localStorage.getItem(
                "gastos"
            )
        ) || [];
    let totalMonto = 0;
    let presupuesto = 0;
    gastos.forEach(
        function(
            gasto
        ){
            totalMonto +=
                Number(
                    gasto.monto
                );
        }
    );
    if(
        gastos.length > 0
    ){
        presupuesto =
            Number(
                gastos[0].presupuesto
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
actualizarRegistroDeGastos();
//-------------------------------------//
//--|funcionalidad_tablero_de_gastos|--//
//-------------------------------------//
const contenedorTablaGastos =
    document.getElementById(
        "contenedor_tabla_gastos"
    );
const filaMensajeVacio =
    document.getElementById(
        "fila_mensaje_vacio"
    );
function agregarGastoEnTabla(
    numero,
    descripcion,
    categoria,
    monto,
    presupuesto
){
    const mensajeVacio =
        document.getElementById(
            "fila_mensaje_vacio"
        );
    if(
        mensajeVacio
    ){
        mensajeVacio.remove();
    }
    if(
        presupuesto === undefined
    ){
        presupuesto = "Sin presupuesto";
    }
    contenedorTablaGastos.innerHTML += `
        <tr>
            <td class="columna_numero_dato">
                ${numero}
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
                ${presupuesto}
            </td>
            <td class="columna_acciones_dato">
                <i
                    class="fa-solid fa-eye icono_accion"
                    title="Vista previa"
                    onclick="vistaPreviaGasto(${numero})"
                ></i>
                <i
                    class="fa-solid fa-pen-to-square icono_accion"
                    title="Editar"
                    onclick="editarGasto(${numero})"
                ></i>
                <i
                    class="fa-solid fa-trash icono_accion"
                    title="Eliminar"
                    onclick="eliminarGasto(${numero})"
                ></i>
            </td>
        </tr>
    `;
}
//------------------------//
//--|vista_previa_gasto|--//
//------------------------//
function vistaPreviaGasto(
    numero
){
    let gastos =
        JSON.parse(
            localStorage.getItem(
                "gastos"
            )
        ) || [];
    let gasto =
        gastos.find(
            function(
                item
            ){
                return (
                    item.numero ==
                    numero
                );
            }
        );
    if(
        gasto
    ){
        let presupuesto =
            gasto.presupuesto ||
            "Sin presupuesto";
        alert(
            "N°: " +
            gasto.numero +
            "\n\nDescripción: " +
            gasto.descripcion +
            "\n\nCategoría: " +
            gasto.categoria +
            "\n\nMonto: " +
            gasto.monto +
            "\n\nPresupuesto: " +
            presupuesto
        );
    }
}
//------------------//
//--|editar_gasto|--//
//------------------//
function editarGasto(
    numero
){
    let gastos =
        JSON.parse(
            localStorage.getItem(
                "gastos"
            )
        ) || [];
    let gasto =
        gastos.find(
            function(
                item
            ){
                return (
                    item.numero ==
                    numero
                );
            }
        );
    if(
        !gasto
    ){
        return;
    }
    let nuevoMonto =
        prompt(
            "Ingrese el nuevo monto:",
            gasto.monto
        );
    if(
        nuevoMonto === null ||
        nuevoMonto.trim() === ""
    ){
        return;
    }
    gasto.monto =
        nuevoMonto;
    localStorage.setItem(
        "gastos",
        JSON.stringify(
            gastos
        )
    );
    location.reload();
}
//--------------------//
//--|eliminar_gasto|--//
//--------------------//
function eliminarGasto(
    numero
){
    let confirmar =
        confirm(
            "¿Desea eliminar este gasto?"
        );
    if(
        !confirmar
    ){
        return;
    }
    let gastos =
        JSON.parse(
            localStorage.getItem(
                "gastos"
            )
        ) || [];
    gastos =
        gastos.filter(
            function(
                item
            ){
                return (
                    item.numero !=
                    numero
                );
            }
        );
    localStorage.setItem(
        "gastos",
        JSON.stringify(
            gastos
        )
    );
    location.reload();
}
//-------------------//
//--|cargar_gastos|--//
//-------------------//
function cargarGastos(){
    let gastos =
        JSON.parse(
            localStorage.getItem(
                "gastos"
            )
        ) || [];
    gastos.forEach(
        function(
            gasto
        ){
            agregarGastoEnTabla(
                gasto.numero,
                gasto.descripcion,
                gasto.categoria,
                gasto.monto,
                gasto.presupuesto
            );
        }
    );
}
cargarGastos();