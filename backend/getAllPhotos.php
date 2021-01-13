<?
require_once("components/photoGallery.php");
$result = $mysqli->query("SELECT * FROM `photos` ORDER BY `id` DESC");
for($photos = []; $row = $result->fetch_assoc(); $photos[] = $row);

exit(json_encode($photos));

