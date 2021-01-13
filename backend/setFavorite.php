<?
  header('Content-type: text/html; charset=utf-8');
  require_once("components/photoGallery.php");
  $id = $_POST['id'];
  $favorite = $_POST["favorite"]; //Ключи в массиве $_POST - атрибуты name


  $result = $mysqli->query("UPDATE `photos` SET `favorite`='$favorite' WHERE `id`='$id'");

  if($result) {
    exit("ok");
  } else {
    exit("Не удалось обновить товар");
  }