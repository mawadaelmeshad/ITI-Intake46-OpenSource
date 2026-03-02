<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: pink;
            text-align: center;
        }
    </style>
</head>
<body>
    <?php
        $id = $_POST['id'] ?? null;
        if ($id === null) {
            echo "No user selected!";
            exit;
        }
        $lines = file("data.txt");

        $skills_str =  implode(",", $_POST['skills']);
        $updated = [
            $_POST['fname'],
            $_POST['lname'],
            $_POST['address'],
            $_POST['gender'],
            $skills_str,
            $_POST['department'],
            $_POST['country'] ?? ''
        ];
        $lines[$id] = implode("|", $updated);
        file_put_contents("data.txt", implode("", $lines));       
        echo "<h2>User Updated successfully!</h2><br>";
        echo '<a href="users.php">Back to Users</a>';

    ?>
    
</body>
</html>