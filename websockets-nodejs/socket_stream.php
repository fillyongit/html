<?php 
$fp = stream_socket_client("unix:///tmp/bac.sock", $errno, $errstr, 30);
if (!$fp) {
	echo "$errstr ($errno)<br />\n";
} else {
	$event = json_encode(
			array(
					'link' => '',
					'id' => 2, 
					'tipo' => 'MANCATO_INGRESSO', 
					'dispositivo_id' => 'sdf234rf', 
					'beacon' => '0x4234234',
					'agenzia' => 'Pulizie Splendor',
					'ufficio' => 'Sede',
					'batteria_beacon' => '67%',
					'created' => '2015-03-20 00:00:00'
			)
	);
	fwrite($fp, $event);
	/*while (!feof($fp)) {
		echo fgets($fp, 1024);
	}*/
	fclose($fp);
}
?>