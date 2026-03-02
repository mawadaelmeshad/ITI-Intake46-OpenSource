<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>users</title>
    <style>
        body{
            background-color: pink;
        }
        table {
        width: 100%;
        border-collapse: collapse; 
        margin-top: 0; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .table-container {
        max-height: 900px; 
        overflow-y: auto;  
    }
    </style>
</head>
<body>
   
    <?php
        $lines = file("data.txt");
        $headers = ["First Name", "Last Name", "Address", "Gender", "Skills", "Department"];
    ?>
    <div class="table-container">
         <h2>All Users</h2>
          <table border="1" cellpadding="10">
        <tr>
            <th>ID</th>
            <?php foreach($headers as $header): ?>
                <th><?= $header ?></th>
            <?php endforeach; ?>
            <th>Actions</th>
        </tr>
        <?php
        foreach($lines as $index => $line):
            $line = trim($line);
            $values = explode("|", $line);
        ?>
        <tr>
            <td><?= $index ?></td>
            
            <?php foreach($headers as $key => $header): ?>
                <td>
                    <?php
                    $value = $values[$key] ?? '';

                    if($header == "Skills" && $value != ''){
                        $skills = explode(",", $value);
                        echo implode(" , ", $skills);
                    } else {
                        echo $value;
                    }
                    ?>
                </td>
            <?php endforeach; ?>
            <td>
                <a href="view.php?id=<?= $index ?>">View</a>
                <a href="edit.php?id=<?= $index ?>">Edit</a>
                <a href="delete.php?id=<?= $index ?>" onclick="return confirm('Are you sure you want to delete this user?')">Delete</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>

    </div>
  
</body>
</html>