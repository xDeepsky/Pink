<?php
  header('Content-type: text/html; charset=utf-8');
  require_once("components/photoGallery.php");
  $lastname = $_POST["lastname"]; //Ключи в массиве $_POST - атрибуты name
  $firstname = $_POST["firstname"];
  $patronim = $_POST["patronim"];
  $trav = $_POST["trav"];
  $phone = $_POST["phone"];
  $email = $_POST["userEmail"];
  $shark = $_POST["shark"];
  $beach = $_POST["beach"];
  $chak = $_POST["chak"];
  $buy = $_POST["buy"];
  $tower = $_POST["tower"];
  $hotel = $_POST["hotel"];
  $userEmotions = $_POST["user_emotions"];
  
  $result = $mysqli->query("INSERT INTO `contest`(`lastname`, `firstname`, `patronim`, `trav`, `phone`, `email`, `shark`, `beach`, `chak`, `buy`, `tower`, `hotel`, `user_emotions`) VALUES ('$lastname', '$firstname', '$patronim', '$trav', '$phone', '$email', '$shark', '$beach', '$chak', ' $buy', '$tower', '$hotel', '$userEmotions')");
  
  if($result) {
    exit('ok');
  } else {
    exit("Не удалось добавить товар");
  }

  
  // var_dump($_GET);