document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("aymeForm");
    const statusMsg = document.getElementById("status-msg");

    if (!form || !statusMsg) return;

    const fields = {
        nombre: document.getElementById("nombre"),
        apellido1: document.getElementById("apellido1"),
        apellido2: document.getElementById("apellido2"),
        email: document.getElementById("email"),
        mensaje: document.getElementById("mensaje")
    };

    let timeoutId;

    form.addEventListener("submit", handleSubmit);

    function handleSubmit(event) {

        event.preventDefault();

        const formData = {
            nombre: fields.nombre.value.trim(),
            apellido1: fields.apellido1.value.trim(),
            apellido2: fields.apellido2.value.trim(),
            email: fields.email.value.trim(),
            mensaje: fields.mensaje.value.trim(),
            colaboracion: document.querySelector(
                'input[name="colaboracion"]:checked'
            ),
            privacidad: document.querySelector(
                '.checkbox-wrapper input'
            )?.checked
        };

        const requiredFields = [
            formData.nombre,
            formData.apellido1,
            formData.apellido2,
            formData.email,
            formData.mensaje
        ];

        const isValid =
            requiredFields.every(Boolean) &&
            formData.colaboracion &&
            formData.privacidad;

        if (!isValid) {

            showMessage(
                "Por favor, completa todos los campos obligatorios.",
                "error"
            );

            return;
        }

        if (!validateEmail(formData.email)) {

            showMessage(
                "Introduce un correo electrónico válido.",
                "error"
            );

            return;
        }

        // Simulación envío

        showMessage(
            "Formulario enviado correctamente.",
            "success"
        );

        form.reset();
    }

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(message, type) {

        clearTimeout(timeoutId);

        statusMsg.textContent = message;

        statusMsg.classList.remove("success", "error");

        statusMsg.classList.add(type);

        statusMsg.hidden = false;

        timeoutId = setTimeout(() => {

            statusMsg.hidden = true;

        }, 5000);
    }
});