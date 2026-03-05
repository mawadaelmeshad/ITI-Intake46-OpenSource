<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color:   #fce4ec; }
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

    <div class="container">
        <div class="card shadow mx-auto" style="max-width: 550px;">
            <div class="card-header fw-bold fs-5" style="background-color: hotpink; color: white;">
                👤 User Details
            </div>
            <div class="card-body">
                <?php
                    require_once "classes/User.php";
                    $userObj = new User();

                    
                    $id = $_GET['id'] ?? null;
                    if ($id == null) {
                        echo '<div class="alert alert-warning">⚠️ No user selected.</div>';
                        exit;
                    }
                    $row = $userObj->getById($id);
                    $headers = ["First Name", "Last Name", "Address", "Country", "Gender", "Skills","username", "Department", "Image"];
                    $columns = ['first_name', 'last_name', 'address','country', 'gender', 'skills','username', 'department', 'image'];

                ?>

                <table class="table table-bordered mb-4">
                    <?php foreach($headers as $key => $header): ?>
                        <tr>
                            <th class="text-black w-35"><?= $header ?></th>
                            <td>
                                <?php
                                    $value = $row[$columns[$key]] ?? '';
                                    if ($header == "Skills" && $value != '') {
                                        $skills = explode(",", $value);
                                        echo implode(" , ", $skills);
                                    }
                                    elseif($header=="Image"){
                                       echo '<img src="uploads/' . htmlspecialchars($value) . '" width="80" class="rounded">';

                                    }
                                     else {
                                        echo $value;
                                    }
                                ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </table>

                <a href="users.php" class="btn text-white" style="background-color: hotpink;">← Back to Users</a>

            </div>
        </div>
    </div>

</body>
</html>