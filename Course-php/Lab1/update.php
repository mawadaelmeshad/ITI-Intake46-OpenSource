<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color: #fce4ec; }
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
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="card shadow mx-auto text-center" style="max-width: 480px;">
            <div class="card-header fw-bold fs-5 text-white" style="background-color: hotpink;">
                ✏️ Update User
            </div>
            <div class="card-body">
                <?php
                    require "db.php";

                    $id = $_POST['id'] ?? null;
                    if ($id === null) {
                        echo '<div class="alert alert-warning">⚠️ No user selected.</div>';
                        exit;
                    }

                    $skills_str =  implode(",", $_POST['skills']);

                    $password = $_POST['password'] ?? '';
                    $stmt = $connection->prepare("
                            UPDATE users SET
                                first_name  = ?,
                                last_name   = ?,
                                address     = ?,
                                gender      = ?,
                                skills      = ?,
                                department  = ?,
                                country     = ?,
                                username    = ?
                            WHERE id = ?
                        ");
                        $stmt->bind_param("ssssssssi",
                            $_POST['fname'],
                            $_POST['lname'],
                            $_POST['address'],
                            $_POST['gender'],
                            $skills_str,
                            $_POST['department'],
                            $_POST['country'],
                            $_POST['username'],
                            $id
                        );
                    

                    if ($stmt->execute()) {
                        echo '
                        <div class="mb-4">User updated successfully!</div>
                        <div class="d-flex gap-2 justify-content-center">
                            <a href="users.php" class="btn text-white" style="background-color: hotpink;">← Back to Users</a>
                        </div>';
                    } else {
                        echo '<div class="alert alert-danger">Something went wrong. Please try again.</div>
                        <a href="users.php" class="btn text-white" style="background-color: hotpink;">← Back to Users</a>';
                    }
                ?>
            </div>
        </div>
    </div>

</body>
</html>