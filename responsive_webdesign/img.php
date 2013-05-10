<?php
$device_width = 0;
$device_height = 0;
$file = dirname(__FILE__) . '/../images/' . $_SERVER['QUERY_STRING'];

function get_mime($file) {
	if (function_exists("finfo_file")) {
		$finfo = finfo_open(FILEINFO_MIME_TYPE); // return mime type ala mimetype extension
		$mime = finfo_file($finfo, $file);
		finfo_close($finfo);
		return $mime;
	} else if (function_exists("mime_content_type")) {
		return mime_content_type($file);
	} else if (!stristr(ini_get("disable_functions"), "shell_exec")) {
		// http://stackoverflow.com/a/134930/1593459
		$file = escapeshellarg($file);
		$mime = shell_exec("file -bi " . $file);
		return $mime;
	} else {
		$mime = 'image/'.pathinfo($file, PATHINFO_EXTENSION);
		return $mime;
	}
}

// Read the device viewport dimensions
if (isset($_COOKIE['device_dimensions'])) {
	$dimensions = json_decode($_COOKIE['device_dimensions']);
	$device_width = $dimensions->width;
	$device_height = $dimensions->height;
}

$file = substr_replace($file, '-high', strrpos($file, '.'), 0);

if ($device_width > 0) {
	// Low resolution image
	if ($device_width <= 800 || $dimensions->connection == 'lowbandwidth') {
		$file = substr_replace($file, '-low', strrpos($file, '.')-1, 0);
	}

	// Medium resolution image
	else if ($device_width <= 1024 	|| $dimensions->connection == 'mediumbandwidth') {
		$file = substr_replace($file, '-medium', strrpos($file, '.')-1, 0);
	}
}

// check the file exists
if (!file_exists($file))
	$file = dirname(__FILE__) . '/../../images/noimage.gif';

header('Content-Type:'. get_mime($file));
header('Content-Length: ' . filesize($file));

readfile($file);