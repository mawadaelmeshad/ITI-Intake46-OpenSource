<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color: #fce4ec;  }
        .navbar { background-color: hotpink; }
        
    </style>
</head>
<body>
    
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

    <div class="container d-flex justify-content-center">
        <div class="card shadow p-4 text-center mt-5" style="max-width: 450px; width: 100%;">
        <div class="card-body p-4">
            <?php
                session_start();
                require "db.php";
                
                $id = $_GET['id'] ?? null;

                if ($id === null) {
                    echo "No user selected!";
                    exit;
                }
                if ($id == $_SESSION['user_id']) {
                    echo '
                    <div class="alert alert-danger">❌ You cannot delete your own account!</div>
                    <a href="users.php" class="btn text-white" style="background-color: hotpink;">← Back to Users</a>
                    ';
                    exit;
                }
                $stmt = $connection->prepare("DELETE FROM users WHERE id=?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                

                echo '
                <h2>User deleted successfully!</h2>
                <p class="text-muted">The user has been removed from the system.</p>
                <div class="d-flex gap-2 justify-content-center">
                    <a href="users.php" class="btn text-white" style="background-color: hotpink;">← Back to Users</a>
                    <a href="registration.php" class="btn btn-outline-secondary">➕ Add New User</a>
                </div>
                ';

            ?>
            </div>
        </div>
    </div>
    
</body>
</html>