<?php
$css = file_get_contents("test/css/bootstrap.min.css");
$css = str_replace(" ", "", $css);
$css = str_replace("\n", "", $css);
$css = str_replace("\t", "", $css);
$css = str_replace(PHP_EOL, "", $css);
$css = str_replace(";}", "}", $css);

$css = str_replace("{", "{\n\t", $css);
$css = str_replace("}", "\n}\n", $css);
$css = str_replace(";", ";\n\t", $css);
file_put_contents("1.txt", $css);
?>
