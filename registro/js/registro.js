document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - script de registro funcionando');
    
    const registroForm = document.getElementById('registroForm');
    
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario de registro enviado');

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const usuario = document.getElementById('usuario').value.trim();
            const contrasenna = document.getElementById('contrasenna').value;
            const confirmar = document.getElementById('confirmar').value;
            const fecha = document.getElementById('fecha').value;
            const genero = document.querySelector('input[name="genero"]:checked');
            const terminos = document.getElementById('terminos').checked;

            console.log('Datos capturados:', { 
                nombre, correo, usuario, contrasenna, confirmar, fecha, 
                genero: genero ? genero.value : 'no seleccionado', terminos 
            });

            // Validaciones
            if (!nombre || !correo || !usuario || !contrasenna || !confirmar || !fecha || !genero) {
                console.log('Campos vacíos detectados');
                Swal.fire({
                    icon: 'error',
                    title: 'Datos faltantes',
                    text: 'Por favor, complete todos los campos obligatorios.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            if (!terminos) {
                Swal.fire({
                    icon: 'error',
                    title: 'Términos no aceptados',
                    text: 'Debe aceptar los términos y condiciones para registrarse.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            if (contrasenna !== confirmar) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseñas no coinciden',
                    text: 'Las contraseñas ingresadas no coinciden.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            if (contrasenna.length < 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña muy corta',
                    text: 'La contraseña debe tener al menos 6 caracteres.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo inválido',
                    text: 'Ingrese un correo electrónico válido.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            // Simulación de registro exitoso
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada correctamente.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                // Redirección al login después del registro
                console.log('Redireccionando al login...');
                window.location.href = 'index.html';
            });
        });
    }

    // Validación de términos y condiciones
    const enlaceTerminos = document.querySelector('.enlace-terminos');
    if (enlaceTerminos) {
        enlaceTerminos.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Términos y Condiciones',
                html: `
                    <div style="text-align: left; max-height: 400px; overflow-y: auto;">
                        <h5>Bienvenido a EcoVigía</h5>
                        <p>Al registrarte en nuestra plataforma, aceptas los siguientes términos:</p>
                        <ul>
                            <li>Te comprometes a usar la plataforma de manera responsable</li>
                            <li>Respetarás el medio ambiente y promoverás su conservación</li>
                            <li>No compartirás información falsa o engañosa</li>
                            <li>Protegerás tus credenciales de acceso</li>
                        </ul>
                        <p>EcoVigía se reserva el derecho de suspender cuentas que violen estos términos.</p>
                    </div>
                `,
                width: 600,
                confirmButtonText: 'Entendido'
            });
        });
    }
});