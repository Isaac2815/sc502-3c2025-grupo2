document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - script de login funcionando');
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario de login enviado');

            const usuario = document.getElementById('usuario').value.trim();
            const contrasenna = document.getElementById('contrasenna').value;

            console.log('Datos capturados:', { usuario, contrasenna });

            if (!usuario || !contrasenna) {
                console.log('Campos vacíos detectados');
                Swal.fire({
                    icon: 'error',
                    title: 'Datos faltantes',
                    text: 'Por favor, complete todos los campos.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                return;
            }

            // Simulación de login exitoso
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Bienvenido a EcoVigía',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                // Redirección después del login (simulada)
                console.log('Redireccionando después del login...');
                // window.location.href = 'dashboard.html'; // Descomenta cuando tengas la página
            });
        });
    }
    
    const olvidoContrasenna = document.getElementById('olvidoContrasenna');
    if (olvidoContrasenna) {
        olvidoContrasenna.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Recuperar contraseña',
                input: 'email',
                inputLabel: 'Ingresa tu correo electrónico',
                inputPlaceholder: 'correo@ejemplo.com',
                showCancelButton: true,
                confirmButtonText: 'Enviar enlace',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: (email) => {
                    if (!email) {
                        Swal.showValidationMessage('Por favor ingresa tu correo electrónico');
                    }
                    // Aquí iría la lógica para enviar el correo
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1500);
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Enlace enviado',
                        text: 'Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true
                    });
                }
            });
        });
    }
});