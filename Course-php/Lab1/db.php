<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $connection = new mysqli("localhost", "root", "","lab_system");

        if($connection->connect_errno){
            die("connection failed");
        }
    ?>
    
</body>
</html>