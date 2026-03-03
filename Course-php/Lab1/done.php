<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Done</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color: #f9f0f3; }
        .navbar { background-color: hotpink; }
    </style>
</head>
<body>

    <!-- Navbar -->
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
        $fname      = $_POST['fname']      ?? '';
        $lname      = $_POST['lname']      ?? '';
        $address    = $_POST['address']    ?? '';
        $gender     = $_POST['gender']     ?? '';
        $country    = $_POST['country']    ?? '';
        $username   = $_POST['username']   ?? '';
        $skills     = $_POST['skills']     ?? [];
        $department = $_POST['department'] ?? '';
        $user_code  = $_POST['user_code']  ?? '';
        $real_code  = $_POST['real_code']  ?? '';

        $title = ($gender == "male") ? "Mr." : "Miss.";
    ?>

    <div class="container">
        <div class="card shadow mx-auto" style="max-width: 550px;">
            <div class="card-header fw-bold fs-5 text-white" style="background-color: hotpink;">
                ✅ Registration Summary
            </div>
            <div class="card-body">

                <?php if ($user_code != $real_code): ?>

                    <div class="alert alert-danger">❌ Wrong code! Please go back and try again.</div>
                    <a href="registration.php" class="btn text-white" style="background-color: hotpink;">← Back to Registration</a>

                <?php else: ?>

                    <h5 class="fw-bold mb-3">Thanks, <?= $title . " " . htmlspecialchars($fname) . " " . htmlspecialchars($lname) ?>! 🎉</h5>
                    <p class="text-muted mb-3">Please review your information below:</p>

                    <table class="table table-bordered">
                        <tr>
                            <th  >Full Name</th>
                            <td><?= htmlspecialchars($fname) . " " . htmlspecialchars($lname) ?></td>
                        </tr>
                        <tr>
                            <th  >Address</th>
                            <td><?= htmlspecialchars($address) ?></td>
                        </tr>
                        <tr>
                            <th  >Gender</th>
                            <td><?= htmlspecialchars($gender) ?></td>
                        </tr>
                        <tr>
                            <th  >Country</th>
                            <td><?= htmlspecialchars($country) ?></td>
                        </tr>
                        <tr>
                            <th >Skills</th>
                            <td><?= htmlspecialchars(implode(", ", $skills)) ?></td>
                        </tr>
                        <tr>
                            <th >Department</th>
                            <td><?= htmlspecialchars($department) ?></td>
                        </tr>
                        <tr>
                            <th >Username</th>
                            <td><?= htmlspecialchars($username) ?></td>
                        </tr>
                    </table>

                    <?php
                        require "db.php";
                        $skills_string = implode(",", $skills);

                        $stmt = $connection->prepare("INSERT INTO users (first_name, last_name, address, gender, skills, department, country, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                        $stmt->bind_param("ssssssss", $fname, $lname, $address, $gender, $skills_string, $department, $country, $username);

                        if ($stmt->execute()) {
                            echo '<div class="alert alert-success mt-3">✅ User registered and saved successfully!</div>';
                        } else {
                            echo '<div class="alert alert-danger mt-3">❌ Something went wrong while saving.</div>';
                        }
                    ?>

                    <a href="users.php" class="btn text-white mt-2" style="background-color: hotpink;">← View All Users</a>

                <?php endif; ?>

            </div>
        </div>
    </div>
    <br>

</body>
</html>