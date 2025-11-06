// ======= script_informes.js =======

// Cargar reportes desde localStorage
function cargarReportes() {
    const reportes = JSON.parse(localStorage.getItem("reportes")) || [];
    const tabla = document.querySelector("#tablaReportes tbody");
    tabla.innerHTML = "";

    reportes.forEach((r, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${r.fecha}</td>
            <td>${r.zona}</td>
            <td>${r.tipo}</td>
            <td>${r.descripcion}</td>
            <td><button class="btn-borrar" data-index="${index}">🗑️</button></td>
        `;
        tabla.appendChild(fila);
    });

    // Asignar eventos de borrado
    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", borrarReporte);
    });
}

// Borrar reporte por índice
function borrarReporte(e) {
    const index = e.target.getAttribute("data-index");
    let reportes = JSON.parse(localStorage.getItem("reportes")) || [];
    reportes.splice(index, 1);
    localStorage.setItem("reportes", JSON.stringify(reportes));
    cargarReportes();
}

// Filtrar reportes según los campos
document.querySelector("#filtroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const zona = document.querySelector("#zona").value;
    const tipo = document.querySelector("#tipo").value;
    const fecha = document.querySelector("#fecha").value;

    const filas = document.querySelectorAll("#tablaReportes tbody tr");

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        const matchZona = zona === "todas" || celdas[1].textContent === zona;
        const matchTipo = tipo === "todos" || celdas[2].textContent === tipo;
        const matchFecha = !fecha || celdas[0].textContent === fecha;

        if (matchZona && matchTipo && matchFecha) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
});

// Exportar a CSV
document.querySelector("#btnExportar").addEventListener("click", () => {
    const filasVisibles = Array.from(document.querySelectorAll("#tablaReportes tbody tr"))
        .filter(f => f.style.display !== "none");

    if (filasVisibles.length === 0) {
        alert("No hay reportes visibles para exportar.");
        return;
    }

    let csvContent = "Fecha,Zona,Tipo,Descripción\n";
    filasVisibles.forEach(fila => {
        const celdas = Array.from(fila.querySelectorAll("td")).slice(0, 4);
        const filaCSV = celdas.map(td => `"${td.textContent}"`).join(",");
        csvContent += filaCSV + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reportes_filtrados.csv";
    a.click();
    URL.revokeObjectURL(url);
});

// Cargar reportes al abrir
cargarReportes();
