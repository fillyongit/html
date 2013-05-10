<!DOCTYPE html>
<!--[if IEMobile 7 ]>    <html class="no-js iem7"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="cleartype" content="on">
        <script>
			// For responsive images/resources.
			var connectionSpeed;  
			// create a custom object if navigator.connection isn't available  
			var connection = navigator.connection || {'type':'0'}; 
			/*
			{  
			  "type": "3",  
			  "UNKNOWN": "0",  
			  "ETHERNET": "1",  
			  "WIFI": "2",  
			  "CELL_2G": "3",  
			  "CELL_3G": "4"  
			}  
			*/
			// set connectionSpeed 
			switch(connection.type) { 
			  case connection.CELL_3G: 
			    // 3G 
			    connectionSpeed = 'mediumbandwidth'; 
			  break; 
			  case connection.CELL_2G: 
			    // 2G 
			    connectionSpeed = 'lowbandwidth'; 
			  break; 
			  default: 
			    // WIFI, ETHERNET, UNKNOWN 
			    connectionSpeed = 'highbandwidth'; 
			} 

			document.cookie = "device_dimensions={\"width\":" + screen.width + ",\"height\":" + screen.height + ",\"pixelRatio\":" + window.devicePixelRatio + ",\"connection\":\"" + connectionSpeed + "\"}";
        </script>
    </head>
    <body>
		
		<div id="content">
			<div id="images">
				<figure class="image">
					<img src="img.php?prova.jpg" />
				</figure>
				<figure class="image">
					<img src="img.php?prova.jpg" />
				</figure>
			</div>
		</div>
    </body>
</html>
