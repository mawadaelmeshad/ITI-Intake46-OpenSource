<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Done</title>
</head>
<body>
    <?php
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $skills = $_POST['skills'];
    $department = $_POST['department'];
    $user_code = $_POST['user_code'];
    $real_code = $_POST['real_code'];

    if($gender== "male"){
        $title = "Mr.";
    }
    else{
        $title = "Miss.";
    }
    if($user_code != $real_code){
        echo "Wrong Code";
        exit();
    }


    ?>
    <h2>Thanks <?php echo $title . " " . $fname . " " . $lname; ?></h2>
    <h3>Please Review Your Information:</h3>

    Name: <?php echo $fname." ". $lname ?> <br><br>
    Address: <?php echo $address; ?> <br><br>
    Your skills:
    <ul>
        <?php
        foreach($skills as $skill){
            echo "<li>$skill</li>";
        }
        ?>
    </ul>
    Department: <?php echo $department; ?>

    
</body>
</html>