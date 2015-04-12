<?php 
$fp = stream_socket_client("unix://tmp/test.sock", $errno, $errstr, 30);
if (!$fp) {
	echo "$errstr ($errno)<br />\n";
} else {
	fwrite($fp, "Ciao!");
	while (!feof($fp)) {
		echo fgets($fp, 1024);
	}
	fclose($fp);
}
?>