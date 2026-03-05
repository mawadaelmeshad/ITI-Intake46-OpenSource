<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        class DB{
            private static $instance = null;
            private $connection;
            private $host     = "localhost";
            private $user     = "root";
            private $password = "";
            private $dbname   = "lab_system";

            private function __construct() {
                    $this->connection = new mysqli(
                    $this->host,
                    $this->user,
                    $this->password,
                    $this->dbname
                );
                if ($this->connection->connect_error) {
                    die("Connection failed: " . $this->connection->connect_error);
                }

            }
            public static function getInstance(){
                if(self::$instance == null){
                    self::$instance = new DB();
                }

                return self::$instance;
            }
            public function getConnection(){
                return $this->connection;
            }

        }
    ?>
    
</body>
</html>