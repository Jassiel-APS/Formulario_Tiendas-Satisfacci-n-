$(document).ready(function() {
    // Evento al cambiar el valor de cualquier radio button.
    $('input[type="radio"]').change(function() {
        // Remueve clases (colores) de los td del tr donde se encuentra el radio que cambió.
        $(this).closest('tr').find('td').removeClass('mala regular buena muybuena excelente');
        
        // Añade la clase (color) correspondiente al td que contiene el radio seleccionado.
        $(this).parent().addClass($(this).val());
        
        // Log para depuración: muestra qué color se ha seleccionado.
        console.log("Cambio de color a: " + $(this).val());
    });
});

$(document).ready(function() {
    // Función que muestra u oculta la tabla basándose en si 'nombreTienda' y 'anio' tienen valor.
    function toggleTableVisibility() {
        let nombreTienda = $('#nombreTienda').val().trim();
        let anio = $('#anio').val().trim();
        
        // Si ambos campos tienen valor, muestra la tabla.
        if(nombreTienda && anio) {
            $('#evaluationTable').removeClass('hidden');
        } else {
            // Si alguno está vacío, oculta la tabla.
            $('#evaluationTable').addClass('hidden');
        }
    }

    // Evento que verifica cambios en los valores de 'nombreTienda' y 'anio'.
    $('#nombreTienda, #anio').on('input', toggleTableVisibility);

    // Evento similar al anterior, añade/remueve clases para colores en tds.
    $('input[type="radio"]').change(function() {
        $(this).closest('tr').find('td').removeClass('mala regular buena muybuena excelente');
        $(this).parent().addClass($(this).val());
        console.log("Cambio de color a: " + $(this).val());
    });
});

$(document).ready(function() {
    // Evento al hacer clic en el botón guardar.
    $('#btnGuardar').click(function(event) {
        // Previniendo el comportamiento por defecto del botón.
        event.preventDefault();

        // Validación para asegurar que todos los grupos de radios estén seleccionados.
        var allFieldsChecked = true;
        var radioGroups = ["funcionalidad", "confiabilidad", "usabilidad", "rendimiento", "mantenimiento", "portabilidad", "seguridadcompatibilidad", "compatibilidad"];
        
        radioGroups.forEach(function(name) {
            if ($(`input[name=${name}]:checked`).length == 0) {
                allFieldsChecked = false;
            }
        });

        if (!allFieldsChecked) {
            // Si no están todos los campos seleccionados, muestra una alerta.
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, contesta todos los campos de la tabla antes de guardar.'
            });
        } else {
            // Si todo está correcto, pregunta al usuario si realmente desea guardar.
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas guardar esta evaluación?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, se envía el formulario.
                    $('#evaluationForm').submit();
                }
            });
        }
    });
});

$(document).ready(function() {
    // Función para actualizar los porcentajes en la tabla.
    function updatePercentages() {
        let total = $('tbody tr').length - 1;  // Excluye la fila de porcentajes.
        let sumPct = 0;  // Suma de todos los porcentajes.

        ['mala', 'regular', 'buena', 'muybuena', 'excelente'].forEach(function(val) {
            let count = $(`input[type="radio"][value="${val}"]:checked`).length;
            let pct = ((count / total) * 100).toFixed(1);
            sumPct += parseFloat(pct);
            $(`#${val}Pct`).text(pct + "%");
        });

        // Actualiza el total en el encabezado de "% Porcentaje".
        $("#totalPct").text(`% Porcentaje (${sumPct}%)`);
    }

    // Evento que detecta cambios en los radio buttons y actualiza los porcentajes.
    $('tbody input[type="radio"]').on('change', updatePercentages);
});
