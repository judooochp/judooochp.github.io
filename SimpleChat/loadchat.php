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

//  Get last message id#
$start = $_POST["start"];
if ($start == 0) {
    $query = "SELECT * FROM item ORDER BY id";
} else {
//  Load only those id's that are new.
    $query = "SELECT * FROM item WHERE id>" . $start . " ORDER BY id";
}
$result = mysqli_query($conn, $query);

//  Parse the results of the query and send them to the client.
while ( $row = mysqli_fetch_assoc($result)) {
    $date = strtotime($row["created"]); //Convert mySQL DATETIME to UNIX timestamp.
    echo '<div class="msg" id="' . $row["id"] . '">';
    echo '<p>' . $row["user"] . ' - '. date("m/d/Y h:i:sa", $date) /*format that timestamp mm/dd/yyyy hh:mm:ssAM */ . '</p>';
    echo '<span>' . $row["message"] . '</span>';
    echo '</div>';
}

mysqli_close($conn);

?>