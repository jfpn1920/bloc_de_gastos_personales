<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_de_datos = "bloc_gastos_personales";
$conexion = new mysqli(
    $host,
    $usuario,
    $contrasena,
    $base_de_datos
);
if($conexion->connect_error){
    die(
        "Error de conexion: " .
        $conexion->connect_error
    );
}
?>