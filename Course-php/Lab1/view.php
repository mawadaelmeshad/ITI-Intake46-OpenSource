<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View</title>
     <style>
        body{
            background-color: pink;
        }
    </style>
</head>
<body>
    <?php 
        $id = $_GET['id'];
        if($id==null){
            echo "no user selected";
            exit;
        }
        $lines = file("data.txt");
        $line = trim($lines[$id]);
        $values = explode("|", $line);
        $headers = ["First Name", "Last Name", "Address", "Gender", "Skills", "Department"];
    ?>
    <h2 style="text-align: center;">View User</h2>
    <?php foreach($headers as $key => $header):?>
            <h3><?= $header ?>:</h3>
            <div>
                <?php
                $value = $values[$key] ?? '';
                if($header == "Skills" && $value != ''){
                    $skills = explode(",", $value);
                    echo implode(" , ", $skills);
                } else {
                    echo $value;
                }
                ?>
            </div>
        <?php endforeach; ?>

    
</body>
</html>