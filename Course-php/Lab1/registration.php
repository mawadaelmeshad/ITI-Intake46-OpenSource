<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <style>
        body { background-color:#fce4ec; }
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

        $errors = [];
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (empty(trim($_POST['fname']))) {
            $errors['fname'] = "First name is required.";
        }
        if (empty(trim($_POST['lname']))) {
            $errors['lname'] = "Last name is required.";
        }

        if (empty(trim($_POST['address']))) {
            $errors['address'] = "Address is required.";
        }

        if (empty($_POST['country'])) {
            $errors['country'] = "Please select a country.";
        }

        if (empty($_POST['gender'])) {
            $errors['gender'] = "Please select a gender.";
        }

        if (empty($_POST['skills'])) {
            $errors['skills'] = "Please select at least one skill.";
        }

        if (empty(trim($_POST['username']))) {
            $errors['username'] = "Username is required.";
        }

        if (empty($_POST['password'])) {
            $errors['password'] = "Password is required.";
        } 
        elseif (strlen($_POST['password']) < 6) {
            $errors['password'] = "Password must be at least 6 characters.";
        }
        $image_name = NULL;
        if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
            $image_name = uniqid() . "_" . basename($_FILES['image']['name']);
            move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $image_name);
        }
        else{
            $errors['image'] = "Please upload a profile image.";
        }
        if (empty($errors)) {
        require "db.php";
        $fname      = trim($_POST['fname']);
        $lname      = trim($_POST['lname']);
        $address    = trim($_POST['address']);
        $gender     = $_POST['gender'];
        $country    = $_POST['country'];
        $username   = trim($_POST['username']);
        $password   = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $skills_str = implode(",", $_POST['skills']);
        $department = $_POST['department'];

        $stmt = $connection->prepare("INSERT INTO users (first_name, last_name, address, gender, skills, department, country, username, password, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssss", $fname, $lname, $address, $gender, $skills_str, $department, $country, $username, $password, $image_name);
        if ($stmt->execute()) {
            header("Location: users.php");
            exit();
        } else {
            $errors['db'] = "Something went wrong. Please try again.";
        }
    }
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
                    <li class="nav-item"><a class="nav-link text-white active" href="registration.php">Add User</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="logout.php">Logout</a></li>
                    <li class="nav-item"><span class="nav-link ms-4 text-white fw-semibold">👋 Hello, <?= $_SESSION['user'] ?></span></li>

                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="card shadow mx-auto" style="max-width: 600px;">
            <div class="card-header fw-bold fs-5" style="background-color: hotpink; color: white;">
                👤 User Registration
            </div>
            <div class="card-body">
                <form action="registration.php" method="POST" enctype="multipart/form-data">

                    <div class="mb-3">
                        <label class="form-label fw-semibold">First Name</label>
                        <input type="text" name="fname" class="form-control <?= isset($errors['fname']) ? 'is-invalid' : '' ?>" value="<?= htmlspecialchars($_POST['fname'] ?? '') ?>">
                        <div class="invalid-feedback"><?= $errors['fname'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Last Name</label>
                        <input type="text" name="lname" class="form-control <?= isset($errors['lname']) ? 'is-invalid' : '' ?>" value="<?= htmlspecialchars($_POST['lname'] ?? '') ?>">
                        <div class="invalid-feedback"><?= $errors['lname'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Address</label>
                        <textarea name="address" class="form-control <?= isset($errors['address']) ? 'is-invalid' : '' ?>" rows="2"><?= htmlspecialchars($_POST['address'] ?? '') ?></textarea>
                        <div class="invalid-feedback"><?= $errors['address'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Country</label>
                        <select name="country" class="form-select <?= isset($errors['country']) ? 'is-invalid' : '' ?>">
                            <option value="">Select Country</option>
                            <option value="Egypt" <?= ($_POST['country'] ?? '') == 'Egypt' ? 'selected' : '' ?>>Egypt</option>
                            <option value="USA"   <?= ($_POST['country'] ?? '') == 'USA'   ? 'selected' : '' ?>>USA</option>
                        </select>
                        <div class="invalid-feedback"><?= $errors['country'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Gender</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input <?= isset($errors['gender']) ? 'is-invalid' : '' ?>" type="radio" name="gender" value="male" <?= ($_POST['gender'] ?? '') == 'male' ? 'checked' : '' ?>>
                            <label class="form-check-label">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input <?= isset($errors['gender']) ? 'is-invalid' : '' ?>" type="radio" name="gender" value="female" <?= ($_POST['gender'] ?? '') == 'female' ? 'checked' : '' ?>>
                            <label class="form-check-label">Female</label>
                        </div>
                        <?php if (isset($errors['gender'])): ?>
                            <div class="text-danger small mt-1"><?= $errors['gender'] ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Skills</label><br>
                        <?php foreach (["PHP", "MySQL", "J2SE", "PostgreSQL"] as $skill): ?>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input <?= isset($errors['skills']) ? 'is-invalid' : '' ?>" type="checkbox" name="skills[]" value="<?= $skill ?>" <?= in_array($skill, $_POST['skills'] ?? []) ? 'checked' : '' ?>>
                            <label class="form-check-label"><?= $skill ?></label>
                        </div>
                        <?php endforeach; ?>
                        <?php if (isset($errors['skills'])): ?>
                            <div class="text-danger small mt-1"><?= $errors['skills'] ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Username</label>
                        <input type="text" name="username" class="form-control <?= isset($errors['username']) ? 'is-invalid' : '' ?>" value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">
                        <div class="invalid-feedback"><?= $errors['username'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control <?= isset($errors['password']) ? 'is-invalid' : '' ?>">
                        <div class="invalid-feedback"><?= $errors['password'] ?? '' ?></div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Department</label>
                        <input type="text" name="department" class="form-control bg-light" value="OpenSource" readonly>
                    </div>
                            
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Profile Image</label>
                        <input type="file" name="image" class="form-control <?= isset($errors['image']) ? 'is-invalid' : '' ?>" accept="image/*">
                        <div class="invalid-feedback"><?= $errors['image'] ?? '' ?></div>
                    </div>

                    <div class="d-flex gap-2">
                        <input type="submit" value="Submit" class="btn w-50 text-white" style="background-color: hotpink;">
                        <input type="reset" value="Reset" class="btn btn-outline-secondary w-50">
                    </div>

                </form>
            </div>
        </div>
    </div>
    <br>

</body>
</html>