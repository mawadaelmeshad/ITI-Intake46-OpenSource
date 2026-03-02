<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete</title>
     <style>
        body{
            background-color: pink;
            text-align: center;
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
        unset($lines[$id]);
        $lines = array_values($lines);
        file_put_contents("data.txt", implode("", $lines));    
        echo "<h2>User deleted successfully!<h2><br>";
        echo '<a href="users.php">Back to Users</a>';

    ?>
    
</body>
</html>