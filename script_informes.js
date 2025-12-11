async function cargarReportes() {
    const tabla = document.querySelector("#tablaReportes tbody");
    tabla.innerHTML = "";

    let reportes = [];
    try {
        
        const response = await fetch("reportes_api.php?accion=cargar");
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        reportes = await response.json(); 
        
    } catch (error) {
        console.error("Error al cargar reportes:", error);
       
        alert(" Error: No se pudieron cargar los reportes desde el servidor.");
        return;
    }

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


    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", borrarReporte);
    });
}


async function borrarReporte(e) {
    const index = e.target.getAttribute("data-index");
    
    
    if (!confirm(`¿Está seguro de que desea borrar el reporte con índice ${index}?`)) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('accion', 'borrar');
        formData.append('index', index);

        
        const response = await fetch("reportes_api.php", {
            method: "POST",
            body: formData, 
        });

        const data = await response.json();

        if (data.exito) {
            alert(" Reporte borrado correctamente.");
            cargarReportes(); 
        } else {
            alert(` Error al borrar reporte: ${data.mensaje}`);
        }
    } catch (error) {
        console.error("Error al borrar reporte:", error);
        alert(" Error de conexión al servidor para borrar.");
    }
}


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
