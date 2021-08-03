<?php
error_reporting(E_ALL); 
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$db_name = "messages";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db_name);

// Check connection
if (mysqli_connect_errno()){
die("Connection failed: " . mysqli_connect_error());
exit();
}

//  Put sent data into the database or die trying.
$query = "INSERT INTO item (message, user) VALUES ('" . $_POST['message'] . "', '" . $_POST['user'] . "');";
if (mysqli_query($conn, $query)) {
} else {
    die(mysqli_connect_error());
}

mysqli_close($conn);

?>