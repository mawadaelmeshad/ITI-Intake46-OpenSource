<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color: #fce4ec;; }
        .navbar { background-color: hotpink; }
    </style>
</head>
<body>
    <?php 
        session_start();
        if (!isset($_SESSION['user'])) {
            header("Location: login.php");
            exit();
        }     
    ?>

    <nav class="navbar navbar-expand-lg mb-4">
        <div class="container">
            <a class="navbar-brand fw-bold text-white" href="#">🌸 UserPanel</a>
            <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link text-white" href="home.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="users.php">Users</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="registration.php">Add User</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="logout.php">Logout</a></li>

                </ul>
            </div>
        </div>
    </nav>

    <div class="container text-center mt-5">
        <div class="card shadow p-5 mx-auto" style="max-width: 900px;">
            <div class="mb-3" style="font-size: 3rem;">🌸</div>
            <h1 class="fw-bold mb-2">Welcome to UserPanel!</h1>
            <p class="text-muted mb-4">Manage your users easily — add, view, or remove them all from one place.</p>
            <hr>
            <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="users.php" class="btn btn-lg" style="background-color: hotpink; color: white;">View Users</a>
                <a href="registration.php" class="btn btn-outline-secondary btn-lg">Add User</a>
            </div>
        </div>
    </div>

</body>
</html>