var images = "", count = 11 ,imganimates = ['saturate', 'grayscale', 'contrast', 'blur', 'sepia', 'opacity'], index1, animates = ['linear', 'swing', 'jswing', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'], theImage;
for (var i = 1; i <= count; i++) {
	index1 = Math.floor((Math.random() * imganimates.length));
	images += '<img class="' + imganimates[index1] + '" src="./images/' + i + '.jpg" />';
}
$(".grid").append(images);
var d = 0; //delay
var ry, tz, s; //transform params

//animation time
$("document").ready(function () {
	//fading out the thumbnails with style
	$("img").each(function () {
		d = Math.random() * 1000; //1ms to 1000ms delay
		$(this).delay(d).animate({ opacity: 0 }, {
			//while the thumbnails are fading out, we will use the step function to apply some transforms. variable n will give the current opacity in the animation.
			step: function (n) {
				s = 1 - n; //scale - will animate from 0 to 1
				$(this).css("transform", "scale(" + s + ")");
			},
			duration: 1000,
		})
	}).promise().done(function () {
		//after *promising* and *doing* the fadeout animation we will bring the images back
		storm();
	})
})
//bringing back the images with style
function storm() {
	$("img").each(function () {
		d = Math.random() * 1000;
		var index = Math.floor((Math.random() * animates.length));
		$(this).delay(d).animate({ opacity: 1 }, {
			step: function (n) {
				//rotating the images on the Y axis from 360deg to 0deg
				ry = (1 - n) * 360;
				//translating the images from 1000px to 0px
				tz = (1 - n) * 1000;
				//applying the transformation
				$(this).css("transform", "rotateY(" + ry + "deg) translateZ(" + tz + "px)");
			},
			duration: 1000,
			//some easing fun. Comes from the jquery easing plugin.
			easing: animates[index],
		})
	})
}

$("img").on("click", function () {
	var screenImage = $(this);
	theImage = new Image();
	theImage.src = screenImage.attr("src");
	$(".thumb").height(600);
	$(".thumb").width(1000);
	$("#previewBG").css("background", 'url(' + theImage.src + ') ');
	$("#previewBG").css("background-size", 'cover');

	$(".grid").fadeToggle(1000);
	$(".thumb").fadeToggle(1000);
})

$("#previewBG").on("click", function () {
	$(".thumb").fadeToggle(1000);
	$(".grid").fadeToggle(1000);
})