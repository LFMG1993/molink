// JavaScript básico para interactividad futura
document.addEventListener('DOMContentLoaded', function () {
// Inicializar el tooltip
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

// Agregar listener de evento clic a todos los elementos con la clase tooltipDivClass
    let tooltipDivs = document.querySelectorAll('.tooltipDivClass');
    tooltipDivs.forEach(function (tooltipDiv) {
        function handleEvent() {
            if (tooltipDiv.getAttribute('data-available') === 'true') {
                window.location.href = 'app/details.html';
            } else {
            }
        }

        tooltipDiv.addEventListener('click', handleEvent);
        tooltipDiv.addEventListener('touchstart', handleEvent);
    });
});
//Fin tooltip
