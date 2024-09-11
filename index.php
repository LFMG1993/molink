<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Tienda Virtual</title>
    <?php 
    include_once './app/librerias-css.php';
    ?>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Mi Tienda</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Productos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contacto</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero bg-primary text-white text-center py-5">
        <div class="container">
            <h1 class="display-4">Bienvenido a Mi Tienda Virtual</h1>
            <p class="lead">Explora nuestros productos más innovadores y exclusivos.</p>
            <a href="#" class="btn btn-light btn-lg">Ver Productos</a>
        </div>
    </header>

    <!-- Features Section -->
    <section class="features py-5">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-4">
                    <div class="feature-box">
                        <h2 class="feature-title">Innovación</h2>
                        <p>Descubre productos que están a la vanguardia de la tecnología.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box">
                        <h2 class="feature-title">Calidad</h2>
                        <p>Productos seleccionados para garantizar la mejor calidad.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box">
                        <h2 class="feature-title">Servicio</h2>
                        <p>Un servicio al cliente excepcional, siempre aquí para ti.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-dark text-white text-center py-3">
        <p>&copy; 2024 Mi Tienda Virtual. Todos los derechos reservados.</p>
    </footer>

    <?php 
    include_once './app/librerias-js.php';
    ?>

</body>
</html>
