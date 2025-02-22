document.addEventListener('DOMContentLoaded', function () {
    // Inicializar tooltips de Bootstrap
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Manejo de eventos para elementos con la clase tooltipDivClass
    let tooltipDivs = document.querySelectorAll('.tooltipDivClass');
    tooltipDivs.forEach(function (tooltipDiv) {
        function handleEvent() {
            if (tooltipDiv.getAttribute('data-available') === 'true') {
                window.location.href = 'app/details.html';
            }
        }
        tooltipDiv.addEventListener('click', handleEvent);
        tooltipDiv.addEventListener('touchstart', handleEvent);
    });

    // Seleccionar todos los enlaces del menú de servicios
    const links = document.querySelectorAll(".service-link");

    links.forEach(link => {
        link.addEventListener("click", function () {
            // Quitar la clase 'active' de todos los enlaces y agregarla al seleccionado
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // Usar data-bs-target preferentemente; de lo contrario, href
            const target = this.getAttribute("data-bs-target") || this.getAttribute("href");
            if (target && target.startsWith("#")) {
                const collapseElement = document.querySelector(target);
                if (collapseElement && !collapseElement.classList.contains("show")) {
                    new bootstrap.Collapse(collapseElement, { toggle: true });
                }
            }
        });
    });

    // Función para manejar el hash en la URL: abrir el collapse y marcar el enlace activo
    function handleHash() {
        const hash = window.location.hash;
        if (hash) {
            const collapseElement = document.querySelector(hash);
            if (collapseElement && !collapseElement.classList.contains("show")) {
                new bootstrap.Collapse(collapseElement, { toggle: true });
            }
            // Recorrer los enlaces y marcar como activo aquel cuyo target coincida con el hash
            links.forEach(link => {
                const linkTarget = link.getAttribute("data-bs-target") || link.getAttribute("href");
                if (linkTarget === hash) {
                    links.forEach(l => l.classList.remove("active"));
                    link.classList.add("active");
                }
            });
        }
    }

    // Ejecutar la función al cargar la página
    handleHash();

    // Escuchar el evento hashchange para detectar cambios en la URL
    window.addEventListener("hashchange", handleHash);
});
