// Por ahora el botón "Comenzar" solo muestra un mensaje animado
document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.boton-accion');

    boton.addEventListener('click', () => {
        alert(' Bienvenido a EcoVigía: ¡Gracias por ser parte del cambio!');
    });
});
// ======== MÓDULO DE REPORTES ======== //
document.addEventListener("DOMContentLoaded", () => {
    const reporteForm = document.getElementById("reporteForm");

    if (reporteForm) {
        reporteForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const zona = document.getElementById("zona").value;
            const tipo = document.getElementById("tipo").value;
            const descripcion = document.getElementById("descripcion").value;
            const ubicacion = document.getElementById("ubicacion").value;
            const fecha = new Date().toLocaleDateString("es-CR");

            // Simular almacenamiento local (sin base de datos)
            const nuevoReporte = { fecha, zona, tipo, descripcion, ubicacion };
            let reportes = JSON.parse(localStorage.getItem("reportes")) || [];
            reportes.push(nuevoReporte);
            localStorage.setItem("reportes", JSON.stringify(reportes));

            alert(" Reporte enviado correctamente.");
            reporteForm.reset();
        });
    }

    // ======== MÓDULO DE INFORMES ======== //
    const tablaReportes = document.querySelector("#tablaReportes tbody");
    if (tablaReportes) {
        const reportesGuardados = JSON.parse(localStorage.getItem("reportes")) || [];

        reportesGuardados.forEach(rep => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${rep.fecha}</td>
                <td>${rep.zona}</td>
                <td>${rep.tipo}</td>
                <td>${rep.descripcion}</td>
            `;
            tablaReportes.appendChild(fila);
        });
    }
});
