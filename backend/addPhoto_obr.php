<?php
  header('Content-type: text/html; charset=utf-8');
  require_once("components/photoGallery.php");
  $name = $_POST["name"];
  $comment = $_POST["comment"];
  $filter = $_POST["filter"];
  $time = $_POST["time"];
  $imageSrc = $_POST["image_src"];
  $userLike = $_POST["userLike"];
  $favorite = $_POST["favorite"];

  $result = $mysqli->query("INSERT INTO `photos`(`name`, `comment`, `filter`, `time`, `image_src`, `userLike`, `favorite`) VALUES ('$name', '$comment', '$filter', '$time', '$imageSrc', '$userLike', '$favorite')");
  
  if($result) {
    exit("ok");
  } else {
    exit("Не удалось добавить товар");
  }

  
