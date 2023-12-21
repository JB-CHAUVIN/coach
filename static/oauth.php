<?php

$scheme = "com.400m.coach.app";
$header = 'Location: ' . $scheme .'://?code=' . $_GET['code'];

echo "Code : " . $_GET['code'] . "<br>";
echo "Scheme : " . $scheme . "<br>";

header($header);
