<?php

$scheme = "400m.coach";
if(isset($_GET['isDev'])) {
    $scheme = urldecode($_GET['isDev']);
}

header('Location: ' . $scheme .'://?code=' . $_GET['code']);