<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
    <style>
        body {
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            background-color: pink;
        }

        form {
            font-size: 1.3rem;
            width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
        }
        div{
            margin-bottom: 8px;
        }

    </style>
</head>
<body>
    <?php
        $id = $_GET['id'] ?? null;

        if ($id === null) {
            echo "No user selected!";
            exit;
        }
        $lines = file("data.txt");

        $line = trim($lines[$id]);
        $values = explode("|", $line);

        $fname = $values[0] ?? '';
        $lname = $values[1] ?? '';
        $address = $values[2] ?? '';
        $gender = $values[3] ?? '';
        $skills = isset($values[4]) ? explode(",", $values[4]) : [];
        $department = $values[5] ?? '';
        $country = $values[6] ?? '';
        $username = $values[0] . strtolower($values[1]);
        $password = ''; 

    ?>
    <form action="update.php" method="POST">
        <input type="hidden" name="id" value="<?= $id ?>">

        <div>
            <span>First name</span>
            <input type="text" name="fname" value="<?= $fname ?>"><br><br>
        </div>
        <div>
            <span>Last name</span>
            <input type="text" name="lname" value="<?=$lname ?>"><br><br>
        </div>
        <div>
            <span>Address</span>
            <textarea name="address"><?= $address ?></textarea><br><br>
        </div>
        <div>
            <span>Country</span>
            <select name="country">
                <option value="">Select Country</option>
                <option value="Egypt" <?= $country=="Egypt" ? 'selected' : '' ?>>Egypt</option>
                <option value="USA" <?= $country=="USA" ? 'selected' : '' ?>>USA</option>
            </select><br><br>
        </div>
        <div>
            <span>Gender</span>
            <input type="radio" name="gender" value="male" <?= $gender=="male" ? 'checked' : '' ?>> Male
            <input type="radio" name="gender" value="female" <?= $gender=="female" ? 'checked' : '' ?>> Female
            <br><br>        
        </div>
        <div>
            <span>Skills</span>
            <input type="checkbox" name="skills[]" value="PHP" <?= in_array("PHP",$skills) ? 'checked' : '' ?>> PHP
            <input type="checkbox" name="skills[]" value="MySQL" <?= in_array("MySQL",$skills) ? 'checked' : '' ?>> MySQL
            <input type="checkbox" name="skills[]" value="J2SE" <?= in_array("J2SE",$skills) ? 'checked' : '' ?>> J2SE
            <input type="checkbox" name="skills[]" value="PostgreSQL" <?= in_array("PostgreSQL",$skills) ? 'checked' : '' ?>> PostgreSQL
            <br><br>
        </div>
        <div>
            <span>Department</span>
            <input type="text" name="department" value="<?= $department ?>" readonly><br><br>
        </div>
        <div>
            <span>Username</span>
            <input type="text" name="username" value="<?= $username?>"><br><br>
        </div>
        <div>
            <span>Password</span>
            <input type="password" name="password" placeholder="Enter new password if you want"><br><br>
        </div>

        <input type="submit" value="Update">
        <input type="reset" value="Reset">
    </form>
    
</body>
</html>