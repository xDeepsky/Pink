<?
require_once("components/photoGallery.php");
// $result = $mysqli->query("SELECT * FROM `photos` WHERE `favorite`='checked'");
$result = $mysqli->query("SELECT * FROM `photos` WHERE `photos`.`favorite`='checked' ORDER BY `id` DESC");
for($photos = []; $row = $result->fetch_assoc(); $photos[] = $row);

exit(json_encode($photos));

