<?php
header('Content-Type: application/json');
$archivo_datos = 'reportes.json';

// Función para leer los reportes del archivo JSON
function leerReportes() {
    global $archivo_datos;
    if (!file_exists($archivo_datos) || filesize($archivo_datos) == 0) {
        return [];
    }
    $contenido = file_get_contents($archivo_datos);
    return json_decode($contenido, true) ?: [];
}

// Función para guardar los reportes en el archivo JSON
function guardarReportes($reportes) {
    global $archivo_datos;
    $json = json_encode($reportes, JSON_PRETTY_PRINT);
    file_put_contents($archivo_datos, $json);
}

$accion = $_GET['accion'] ?? $_POST['accion'] ?? '';

switch ($accion) {
    case 'guardar':
        // Manejar nuevo reporte
        $datos = json_decode(file_get_contents('php://input'), true);
        if ($datos) {
            $reportes = leerReportes();
            $reportes[] = $datos; // Añadir nuevo reporte
            guardarReportes($reportes);
            echo json_encode(['exito' => true, 'mensaje' => 'Reporte guardado']);
        } else {
            http_response_code(400);
            echo json_encode(['exito' => false, 'mensaje' => 'Datos inválidos']);
        }
        break;

    case 'cargar':
        // Cargar todos los reportes
        $reportes = leerReportes();
        echo json_encode($reportes);
        break;

    case 'borrar':
        // Borrar reporte por índice
        $index = $_POST['index'] ?? null;
        if ($index !== null && is_numeric($index)) {
            $reportes = leerReportes();
            if (isset($reportes[$index])) {
                array_splice($reportes, $index, 1);
                guardarReportes($reportes);
                echo json_encode(['exito' => true, 'mensaje' => 'Reporte borrado']);
            } else {
                http_response_code(404);
                echo json_encode(['exito' => false, 'mensaje' => 'Índice no encontrado']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['exito' => false, 'mensaje' => 'Índice inválido']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['exito' => false, 'mensaje' => 'Acción no definida']);
        break;
}
?>