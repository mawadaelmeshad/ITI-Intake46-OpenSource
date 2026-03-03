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
                <form action="done.php" method="POST">

                    <div class="mb-3">
                        <label class="form-label fw-semibold">First Name</label>
                        <input type="text" name="fname" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Last Name</label>
                        <input type="text" name="lname" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Address</label>
                        <textarea name="address" class="form-control" rows="2"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Country</label>
                        <select name="country" class="form-select">
                            <option value="">Select Country</option>
                            <option value="Egypt">Egypt</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Gender</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="male">
                            <label class="form-check-label">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" value="female">
                            <label class="form-check-label">Female</label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Skills</label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="skills[]" value="PHP">
                            <label class="form-check-label">PHP</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="skills[]" value="MySQL">
                            <label class="form-check-label">MySQL</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="skills[]" value="J2SE">
                            <label class="form-check-label">J2SE</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="skills[]" value="PostgreSQL">
                            <label class="form-check-label">PostgreSQL</label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Username</label>
                        <input type="text" name="username" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Department</label>
                        <input type="text" name="department" class="form-control bg-light" value="OpenSource" readonly>
                    </div>

                    <?php $code = "Sh68Sa"; ?>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Code: <span class="text-danger"><?php echo $code; ?></span></label>
                        <input type="text" name="user_code" class="form-control" placeholder="Enter the code above">
                        <input type="hidden" name="real_code" value="<?php echo $code; ?>">
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