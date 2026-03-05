<?php
require_once "classes/DB.php";

class User {

    private $conn;
    public function __construct() {
        $this->conn = DB::getInstance()->getConnection();
    }

    public function getAll() {
        $result = $this->conn->query("SELECT * FROM users");
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        return $users;
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function create($data, $image_name) {
        $stmt = $this->conn->prepare("INSERT INTO users (first_name, last_name, address, gender, skills, department, country, username, password, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssss",
            $data['fname'],
            $data['lname'],
            $data['address'],
            $data['gender'],
            $data['skills_str'],
            $data['department'],
            $data['country'],
            $data['username'],
            $data['password'],
            $image_name
        );
        return $stmt->execute();
    }

    public function update($id, $data, $image_name) {
        if (!empty($data['password'])) {
            $stmt = $this->conn->prepare("UPDATE users SET first_name=?, last_name=?, address=?, gender=?, skills=?, department=?, country=?, username=?, password=?, image=? WHERE id=?");
            $stmt->bind_param("ssssssssssi",
                $data['fname'],
                $data['lname'],
                $data['address'],
                $data['gender'],
                $data['skills_str'],
                $data['department'],
                $data['country'],
                $data['username'],
                $data['password'],
                $image_name,
                $id
            );
        } else {
            $stmt = $this->conn->prepare("UPDATE users SET first_name=?, last_name=?, address=?, gender=?, skills=?, department=?, country=?, username=?, image=? WHERE id=?");
            $stmt->bind_param("sssssssssi",
                $data['fname'],
                $data['lname'],
                $data['address'],
                $data['gender'],
                $data['skills_str'],
                $data['department'],
                $data['country'],
                $data['username'],
                $image_name,
                $id
            );
        }
        return $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function login($username, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return null;
    }
}