<?php
require_once("components/photoGallery.php");
$id = $_GET["id"];
$result = $mysqli->query("DELETE FROM `photos` WHERE `id`='$id'");

if($result) {
  exit("ok");
} else {
  exit("Не удалось удалить товар");
}
