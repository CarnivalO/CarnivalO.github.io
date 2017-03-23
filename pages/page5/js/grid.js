var images = "", count = 29;
for(var i = 1; i <= count; i++)
	images += '<a href="http://www.baidu.com"><img src="./img/faces/'+i+'.jpg" /></a>';
	
$(".grid").append(images);

var d = 0; //delay
var ry, tz, s; //transform params

$(document).ready(function(){
	$(".grid img").each(function(){
		d = Math.random()*1000; //1ms to 1000ms delay
		$(this).delay(d).animate({opacity: 0}, {
			step: function(n){
				s = 1-n; //scale - will animate from 0 to 1
				$(this).css("transform", "scale("+s+")");
			}, 
			duration: 1000, 
		})
	}).promise().done(function(){
		storm();
	})
})
function storm()
{
	$("img").each(function(){
		d = Math.random()*1000;
		$(this).delay(d).animate({opacity: 1}, {
			step: function(n){
				ry = (1-n)*360;
				tz = (1-n)*1000;
				$(this).css("transform", "rotateY("+ry+"deg) translateZ("+tz+"px)");
			}, 
			duration: 3000, 
			easing: 'easeOutQuint', 
		})
	})
}
