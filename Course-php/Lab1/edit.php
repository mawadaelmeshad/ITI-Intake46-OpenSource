<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
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

    <?php
        require "db.php";

        $id = $_GET['id'] ?? null;

        if ($id === null) {
            echo '<div class="container"><div class="alert alert-warning">⚠️ No user selected.</div></div>';
            exit;
        }

        $stmt = $connection->prepare("SELECT * FROM users WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();

        if (!$row) {
            echo '<div class="container"><div class="alert alert-danger">❌ User not found.</div></div>';
            exit;
        }

        $fname = $row['first_name'];
        $lname  = $row['last_name'];
        $address = $row['address'];
        $gender  = $row['gender'];
        $skills = explode(",", $row['skills']);
        $department = $row['department'];
        $country  = $row['country'];
        $username = $row['username'];
    ?>

    <!-- Form Card -->
    <div class="container">
        <div class="card shadow mx-auto" style="max-width: 600px;">
            <div class="card-header fw-bold fs-5 text-white" style="background-color: hotpink;">
                ✏️ Edit User
            </div>
            <div class="card-body">
                <form action="update.php" method="POST">
                    <input type="hidden" name="id" value="<?= $id ?>">

                    <div class="mb-3">
                        <label class="form-label fw-semibold">First Name</label>
                        <input type="text" name="fname" class="form-control" value="<?= htmlspecialchars($fname) ?>">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Last Name</label>
                        <input type="text" name="lname" class="form-control" value="<?= htmlspecialchars($lname) ?>">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Address</label>
                        <textarea name="address" class="form-control" rows="2"><?= htmlspecialchars($address) ?></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Country</label>
                        <select name="country" class="form-select">
                            <option value="">Select Country</option>
                            <option value="Egypt" <?= $country=="Egypt" ? 'selected' : '' ?>>Egypt</option>
                            <option value="USA"   <?= $country=="USA"   ? 'selected' : '' ?>>USA</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Gender</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="male" <?= $gender=="male" ? 'checked' : '' ?>>
                            <label class="form-check-label">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="female" <?= $gender=="female" ? 'checked' : '' ?>>
                            <label class="form-check-label">Female</label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Skills</label><br>
                        <?php foreach(["PHP","MySQL","J2SE","PostgreSQL"] as $skill): ?>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="skills[]" value="<?= $skill ?>" <?= in_array($skill, $skills) ? 'checked' : '' ?>>
                            <label class="form-check-label"><?= $skill ?></label>
                        </div>
                        <?php endforeach; ?>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Department</label>
                        <input type="text" name="department" class="form-control bg-light" value="<?= htmlspecialchars($department) ?>" readonly>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Username</label>
                        <input type="text" name="username" class="form-control" value="<?= htmlspecialchars($username) ?>">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Enter new password to change it">
                    </div>

                    <div class="d-flex gap-2">
                        <input type="submit" value="Update" class="btn w-50 text-white" style="background-color: hotpink;">
                        <input type="reset"  value="Reset"  class="btn btn-outline-secondary w-50">
                    </div>

                </form>
            </div>
        </div>
    </div>
    <br>

</body>
</html>