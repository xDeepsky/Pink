<?
require_once("components/photoGallery.php");


if (isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    $page = 1;
}

$notesOnPage = 12;
$from = ($page - 1) * $notesOnPage;

$result = $mysqli->query("SELECT * FROM `photos` WHERE `id` > 0 ORDER BY `id` DESC LIMIT $from,$notesOnPage");
for($photos = []; $row = $result->fetch_assoc(); $photos[] = $row);



exit(json_encode($photos));

