var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;
$(document).ready(function() {
	var stepW = 24;
	var stars = $("#star > li");
	$("#showb").css("width", 0);
	stars.each(function(i) {
		$(stars[i]).click(function(e) {
			var n = i + 1;
			$("#showb").css({
				"width": stepW * n
			});
			$('#starcounts').val($(this).text());
			$(this).find('a').blur();
			return stopDefault(e);
		});
	});
});

function stopDefault(e) {
	if (e && e.preventDefault)
		e.preventDefault();
	else
		window.event.returnValue = false;
	return false;
};

$(".next").click(function() {
	if (animating) return false;
	animating = true;
	changebg();
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	next_fs.show();
	current_fs.animate({
		opacity: 0
	}, {
		step: function(now, mx) {
			scale = 1 - (1 - now) * 0.2;
			left = (now * 50) + "%";
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')'
			});
			next_fs.css({
				'left': left,
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function() {
			current_fs.hide();
			animating = false;
		},
		easing: 'easeInOutBack'
	});
});

function changebg() {
	var bgnum = Math.floor(Math.random() * 8);
	//document.getElementsByTagName("html")[0].style.background = 'url("../../common/boobreview/img/bg' + bgnum + '.jpg") no-repeat';
	document.getElementsByTagName("html")[0].style.backgroundImage = 'url("./img/bg' + bgnum + '.jpg")';
}
$(".previous").click(function() {
	if (animating) return false;
	animating = true;
	changebg();
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	previous_fs.show();
	current_fs.animate({
		opacity: 0
	}, {
		step: function(now, mx) {
			scale = 0.8 + (1 - now) * 0.2;
			left = ((1 - now) * 50) + "%";
			opacity = 1 - now;
			current_fs.css({
				'left': left
			});
			previous_fs.css({
				'transform': 'scale(' + scale + ')',
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function() {
			current_fs.hide();
			animating = false;
		},
		easing: 'easeInOutBack'
	});
});
/* 关于上传 */
var maxsize = 20 * 1024 * 1024; //2M  
var errMsg = "上传的附件文件不能超过1M！！！";
var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过2M，建议使用IE、FireFox、Chrome浏览器。";
var browserCfg = {};
var ua = window.navigator.userAgent;
if (ua.indexOf("MSIE") >= 1) {
	browserCfg.ie = true;
} else if (ua.indexOf("Firefox") >= 1) {
	browserCfg.firefox = true;
} else if (ua.indexOf("Chrome") >= 1) {
	browserCfg.chrome = true;
}

function checkfile(fileId, imgId) {
	try {
		var obj_file = document.getElementById("" + fileId + "");
		if (obj_file.value == "") {
			alert("请先选择上传文件");
			return;
		}
		var filesize = 0;
		if (browserCfg.firefox || browserCfg.chrome) {
			filesize = obj_file.files[0].size; //如果用jquery是obj_file[0]
			//alert(filesize)
		} else if (browserCfg.ie) {
			var obj_img = document.getElementById("" + imgId + "");
			obj_img.dynsrc = obj_file.value;
			filesize = obj_img.fileSize;
		} else {
			alert(tipMsg);
			return;
		}
		if (filesize == -1) {
			alert(tipMsg);
			return;
		} else if (filesize > maxsize) {
			alert(errMsg);
			return;
		} else {
			return filesize;
		}
		
	} catch (e) {
		// alert(e);  
	}

}

$(document).ajaxStart(function(){
	$('#wating').modal({
		 fadeDuration: 100
	});
})
$(document).ajaxStop(function(){
	$.modal.close();
})



function butf(obj,path) {
	if (obj.id == "bookcover") {
		if ($("#bookcover").val().length > 0) {
			var size = checkfile("bookcover", "bookcoverImg")
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择图片");
		}
	} else if (obj.id == "pci1") {
		if ($("#pci1").val().length > 0) {
			var size = checkfile("pci1", "tempimg1")
				//alert(size)
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择图片");
		}
	} else if (obj.id == "pci2") {
		if ($("#pci2").val().length > 0) {
			var size = checkfile("pci2", "tempimg2")
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择图片");
		}
	} else if (obj.id == "pci3") {
		if ($("#pci3").val().length > 0) {
			var size = checkfile("pci3", "tempimg3")
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择图片");
		}
	} else if (obj.id == "pci4") {
		if ($("#pci4").val().length > 0) {
			var size = checkfile("pci4", "tempimg4")
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择图片");
		}
	} else if (obj.id == "video") {
		if ($("#video").val().length > 0) {
			var size = checkfile("video", "tempimgvideo")
			ajaxFileUpload(obj.id, size,path);
		} else {
			alert("请选择视频");
		}
	}
	
}



function ajaxFileUpload(fileId, size,path) {
	//alert(fileId)
	
	
	var fl;
	if (fileId == 'bookcover') {
		fl = 'bookcover';
	} else if (fileId == 'pci1') {
		fl = 'pci1';
	} else if (fileId == 'pci2') {
		fl = 'pci2';
	} else if (fileId == 'pci3') {
		fl = 'pci3';
	} else if (fileId == 'pci4') {
		fl = 'pci4';
	} else if (fileId == 'video') {
		fl = 'video';
	}

	$.ajaxFileUpload({
		url: path+'/studentrecord/uploadImg.do', //用于文件上传的服务器端请求地址
		type: 'post',
		data: {
			flag: fl,
			uploadSize: size
		}, //此参数非常严谨，写错一个引号都不行
		secureuri: false, //一般设置为false
		fileElementId: fl, //文件上传空间的id属性  <input type="file" id="file" name="file" />
		dataType: 'json', //返回值类型 一般设置为json
		success: function(data) //服务器成功响应处理函数
			{
				
			
				var TS = data.flag;
				//alert(TS)
				if (data.flag == 'bookcover') {
					$("#fenmian").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.flag == 'pci1') {
					$("#pci1val").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.flag == 'pci2') {
					$("#pci2val").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.flag == 'pci3') {
					$("#pci3val").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.flag == 'pci4') {
					$("#pci4val").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.flag == "video") {
					$("#videoval").attr("value", data.fileId);
					alert("保存成功");
				} else if (data.isname == "1") {
					alert("此文件以存在")
				}

			},
		error: function(data, status, e) //服务器响应失败处理函数
			{
				alert(e);
			}
	})
	return false;
}