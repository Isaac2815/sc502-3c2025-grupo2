document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.boton-accion');

    if (boton) {
        boton.addEventListener('click', () => {
            alert(' Bienvenido a EcoVigía: ¡Gracias por ser parte del cambio!');
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const reporteForm = document.getElementById("reporteForm");

    if (reporteForm) {
        
        reporteForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const zona = document.getElementById("zona").value;
            const tipo = document.getElementById("tipo").value;
            const descripcion = document.getElementById("descripcion").value;
            const ubicacion = document.getElementById("ubicacion").value;
            const fecha = new Date().toLocaleDateString("es-CR");

            const nuevoReporte = { fecha, zona, tipo, descripcion, ubicacion };
            
            try {
               
                const response = await fetch("reportes_api.php?accion=guardar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", 
                    },
                    body: JSON.stringify(nuevoReporte), 
                });

                const data = await response.json();

                if (data.exito) {
                    alert(" Reporte enviado correctamente.");
                    reporteForm.reset();
                } else {
                    alert(` Error al enviar reporte: ${data.mensaje}`);
                }
            } catch (error) {
                console.error("Error de red o servidor:", error);
                alert(" Error de conexión con el servidor. Asegúrese que XAMPP esté corriendo.");
            }
        });
    }
    
});
