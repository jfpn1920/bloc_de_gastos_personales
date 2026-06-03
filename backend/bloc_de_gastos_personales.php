<?php
include("conexion.php");
header("Content-Type: application/json; charset=UTF-8");
if($_SERVER["REQUEST_METHOD"] == "GET"){
    $sql =
        "SELECT *
        FROM gastos_personales
        ORDER BY id DESC";
    $resultado =
        $conexion->query($sql);
    $datos = [];
    while($fila = $resultado->fetch_assoc()){
        $datos[] = $fila;
    }
    echo json_encode($datos);
    exit;
}
//-------------------//
//--|agregar_gasto|--//
//-------------------//
if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["accion"] == "agregar"){
    $descripcion = trim($_POST["descripcion"]);
    $categoria = trim($_POST["categoria"]);
    $monto = floatval($_POST["monto"]);
    $presupuesto = floatval($_POST["presupuesto"]);
    if($descripcion == "" || $categoria == "" || $monto <= 0){
        echo json_encode([
            "estado" => false,
            "mensaje" => "Datos inválidos"
        ]);
        exit;
    }
    $sql =
        "INSERT INTO gastos_personales
        (descripcion, categoria, monto, presupuesto)
        VALUES (?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ssdd", $descripcion, $categoria, $monto, $presupuesto);
    if($stmt->execute()){
        echo json_encode([
            "estado" => true,
            "mensaje" => "Gasto agregado correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" => $stmt->error
        ]);
    }
    exit;
}
//------------------//
//--|editar_gasto|--//
//------------------//
if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["accion"] == "editar"){
    $id = intval($_POST["id"]);
    $descripcion = trim($_POST["descripcion"]);
    $categoria = trim($_POST["categoria"]);
    $monto = floatval($_POST["monto"]);
    $presupuesto = floatval($_POST["presupuesto"]);
    $sql =
        "UPDATE gastos_personales
        SET descripcion=?, categoria=?, monto=?, presupuesto=?
        WHERE id=?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sssdi", $descripcion, $categoria, $monto, $presupuesto, $id);
    if($stmt->execute()){
        echo json_encode([
            "estado" => true,
            "mensaje" => "Gasto actualizado correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" => $stmt->error
        ]);
    }
    exit;
}
//--------------------//
//--|eliminar_gasto|--//
//--------------------//
if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["accion"] == "eliminar"){
    $id = intval($_POST["id"]);
    $sql =
        "DELETE FROM gastos_personales
        WHERE id=?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    if($stmt->execute()){
        echo json_encode([
            "estado" => true,
            "mensaje" => "Gasto eliminado correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" => $stmt->error
        ]);
    }
    exit;
}
echo json_encode([
    "estado" => false,
    "mensaje" => "Acción no válida"
]);
?>