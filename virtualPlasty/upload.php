<?php

$filename = $_FILES['image']['name']; //имя файла
$filetmpname = $_FILES['image']['tmp_name'];	//адрес tmp
$fileType = $_FILES["image"]["type"]; //тип файла
$fileSizekB = ($_FILES["image"]["size"] / 1024 ); //размер файла

echo 'temp name: '.$filetmpname."\nname: ".$filename."\nsize: ".$fileSizekB.' kB';
?>