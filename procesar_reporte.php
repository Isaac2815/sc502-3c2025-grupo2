<?php

$archivo_json = 'reportes.json';


$latitud = isset($_POST['latitud']) ? $_POST['latitud'] : null;
$longitud = isset($_POST['longitud']) ? $_POST['longitud'] : null;


if ($latitud !== null && $longitud !== null) {
    
    $ubicacion_final = "Lat: " . $latitud . ", Lng: " . $longitud;
} else {
    $ubicacion_final = "Coordenadas no capturadas";
}


$nuevo_reporte = array(
    'fecha' => date('Y-m-d H:i:s'),
    'zona' => isset($_POST['zona']) ? $_POST['zona'] : 'Desconocida',
    
    'tipo' => isset($_POST['tipo_contaminacion']) ? $_POST['tipo_contaminacion'] : 'Otro',
    'descripcion' => isset($_POST['descripcion']) ? $_POST['descripcion'] : 'Sin descripción',
    
    'ubicacion' => $ubicacion_final 
);


if (file_exists($archivo_json)) {
    $datos_json = file_get_contents($archivo_json);
    
    $reportes_actuales = json_decode($datos_json, true);
    if ($reportes_actuales === null) {
        $reportes_actuales = [];
    }
} else {
    $reportes_actuales = [];
}


$reportes_actuales[] = $nuevo_reporte;


$datos_finales_json = json_encode($reportes_actuales, JSON_PRETTY_PRINT);
file_put_contents($archivo_json, $datos_finales_json);


header("Location: EcoVigia.html"); 
exit();
?>
