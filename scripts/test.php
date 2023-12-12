<?php
	
	$str = "../../images";
	echo $str . "\n";
	$str = preg_replace("/\.\.\//", "", $str, 1);
	echo $str; // выводит " ../images"

?>