<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<title>Flash Application</title>
	<meta name="description" content="" />
	
	<script src="js/swfobject.js"></script>
	<script>
		var flashvars = {
			clientDomain:'<?php echo $_SERVER['SERVER_NAME'] ?>'
		}
		var params = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			wmode: "transparent"
		}
		var attributes = {
			id:"wowza"
		}
		swfobject.embedSWF(
			"Webcam.swf", 
			"altContent", "665", "330", "9.0.0", 
			"expressInstall.swf", 
			flashvars, params, attributes);
	</script>
	<style>
		html, body { height:100%; overflow:hidden;}
		body { margin:0; }
	</style>
</head>
<body  bgcolor="#333333">
	<div id="altContent">
		<p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
	</div>
</body>
</html>