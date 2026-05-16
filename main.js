document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("aymeForm");
    const statusMsg = document.getElementById("status-msg");

    if (!form || !statusMsg) return;

    const fields = {

        nombre:
        document.getElementById("nombre"),

        apellido1:
        document.getElementById("apellido1"),

        apellido2:
        document.getElementById("apellido2"),

        email:
        document.getElementById("email"),

        mensaje:
        document.getElementById("mensaje")
    };

    let timeoutId;

    form.addEventListener(
        "submit",
        handleSubmit
    );

    async function handleSubmit(event) {

        event.preventDefault();

        const formData = {

            nombre:
            fields.nombre.value.trim(),

            apellido1:
            fields.apellido1.value.trim(),

            apellido2:
            fields.apellido2.value.trim(),

            email:
            fields.email.value.trim(),

            mensaje:
            fields.mensaje.value.trim(),

            colaboracion:
            document.querySelector(
                'input[name="colaboracion"]:checked'
            ),

            privacidad:
            document.querySelector(
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

        try {

            const response = await fetch(

                "PEGA_AQUI_TU_URL_DE_GOOGLE_SCRIPT",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        nombre:
                        formData.nombre,

                        apellido1:
                        formData.apellido1,

                        apellido2:
                        formData.apellido2,

                        email:
                        formData.email,

                        colaboracion:
                        formData.colaboracion.value,

                        mensaje:
                        formData.mensaje
                    })
                }
            );

            if (response.ok) {

                showMessage(
                    "Formulario enviado correctamente.",
                    "success"
                );

                form.reset();

            } else {

                showMessage(
                    "Error al enviar el formulario.",
                    "error"
                );
            }

        } catch (error) {

            console.error(error);

            showMessage(
                "Error de conexión.",
                "error"
            );
        }
    }

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(message, type) {

        clearTimeout(timeoutId);

        statusMsg.textContent = message;

        statusMsg.classList.remove(
            "success",
            "error"
        );

        statusMsg.classList.add(type);

        statusMsg.hidden = false;

        timeoutId = setTimeout(() => {

            statusMsg.hidden = true;

        }, 5000);
    }
});
