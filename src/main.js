(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);

		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
			
			Canvas.beginFill(document.body);
			// Canvas.drawLine(1000,0,100,100)
			Canvas.drawRect(30,40,100,100);
			Canvas.beginFill(document.body);
			Canvas.drawRect(100,100,100,100);
			// Canvas.drawCircle(0,0,100,100);
	}

	Main();
})(window);
