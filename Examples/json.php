<?php  
error_reporting(E_ALL);
if (!empty($_POST['json'])) {
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	print ($_POST['json']);
}

?>