<?php
	session_start();
	session_unset($_SESSION['username']);
	echo '{"state":true}';
?>