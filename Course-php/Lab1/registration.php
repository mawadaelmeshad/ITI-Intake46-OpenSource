<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    
    <style>
        body {
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }

        form {
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
    <form action="done.php" method="POST">
        <div>
            <span>First name</span>
            <input type="text" name="fname"><br><br>
        </div>
        <div>
            <span>Last name</span>
            <input type="text" name="lname"><br><br>
        </div>
        <div>
            <span>Address</span>
            <textarea name="address"></textarea><br><br>

        </div>
        <div>
            <span>Country</span>
            <select name="country">
                <option value="">Select Country</option>
                <option value="Egypt">Egypt</option>
                <option value="USA">USA</option>
            </select><br><br>
        </div>
        <div>
            <span>Gender</span>
            <input type="radio" name="gender" value="male"> Male
            <input type="radio" name="gender" value="female"> Female
            <br><br>        
        </div>
        <div>
            <span>Skills</span>
            <input type="checkbox" name="skills[]" value="PHP"> PHP
            <input type="checkbox" name="skills[]" value="MySQL"> MySQL
            <input type="checkbox" name="skills[]" value="J2SE"> J2SE
            <input type="checkbox" name="skills[]" value="PostgreSQL"> PostgreSQL
            <br><br>
        </div>

        <div>
            <span>Username</span>
            <input type="text" name="username"><br><br>
        </div>
        <div>
            <span>Password</span>
            <input type="password" name="password"><br><br>
        </div> 
        <div>
            <span>Department</span>
            <input type="text" name="department" value="OpenSource" readonly><br><br>
        </div>

        <?php
            $code = "Sh68Sa";
        ?>
        Code: <?php echo $code; ?><br>
        Insert Code:
        <input type="text" name="user_code"><br><br>

        <input type="hidden" name="real_code" value="<?php echo $code; ?>">

        <input type="submit" value="Submit">
        <input type="reset" value="Reset">




    </form>
    
</body>
</html>