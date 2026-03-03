<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color:  #fce4ec; }
        .navbar { background-color: hotpink; }
        thead { background-color: hotpink; color: white; }
        .table-container { max-height: 900px; overflow-y: auto; }
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

    <div class="container px-4">
        <div class="card shadow">
            <div class="card-header fw-bold fs-5" style="background-color: hotpink; color: white;">
                👥 All Users
            </div>
            <div class="card-body p-0 table-container">
                <?php
                    require "db.php";
                    $result = $connection->query("SELECT * FROM users");
                    $headers = ["First Name", "Last Name", "Address", "Gender", "Skills", "Department"];
                ?>
                <table class="table table-bordered table-hover mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <?php foreach($headers as $header): ?>
                                <th><?= $header ?></th>
                            <?php endforeach; ?>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td><?= $row['id'] ?></td>
                                <td><?= $row['first_name'] ?></td>
                                <td><?= $row['last_name'] ?></td>
                                <td><?= $row['address'] ?></td>
                                <td><?= $row['gender'] ?></td>
                                <td><?= $row['skills'] ?></td>
                                <td><?= $row['department'] ?></td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2 flex-wrap">
                                        <a href="view.php?id=<?= $row['id'] ?>" class="btn btn-sm" style="background-color: hotpink; color: white;">View</a>
                                        <a href="edit.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-outline-secondary">Edit</a>
                                        <a href="delete.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this user?')">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</body>
</html>