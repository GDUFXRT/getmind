$(function() {
	window.username = null;
	window.homepage = null;
	var logoparam = Readurl();
	username = logoparam["username"];
	sendLogonInfo();
})

/**
 *解析url的参数
 */
function Readurl() {
	var urlparam = location.search;
	urlparam = urlparam.slice(1); //url除去？后的参数
	var paramArr = urlparam.split("&");
	var infoArr = new Array;
	var detalArr = new Array
	for (var i = 0; i < paramArr.length; i++) {
		infoArr = paramArr[i].split('=')
		detalArr[infoArr[0]] = infoArr[1];
	};
	return detalArr
}
/**
 *将用户名发回服务器获取密码
 */
function sendLogonInfo() {
	var password
	$.ajax({
		type: "POST",
		url: "servlet/LoginServlet",
		data: {
			"type": 0,
			"username": username
		},
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				password = data.password;
				setcookie(username, password)
			} else {
				sendLogonInfo()
			}
		},
		error: function(jqXHR) {
			alert(jqXHR.status)
		}
	})
}

function setcookie(username, password) {
	$.cookie("username", username)
	$.cookie("password", password)
	goToHomepage()
}

function goToHomepage() {
	setTimeout("location='.'", 3000)
}