$(function() {
	cookieCheck()
	setHotZone();
	definedWindow();
	$(":input").val("");
	$(":checkbox").attr('checked', false);
	setClick();
	scrollAction();
	checkRe_me();
	signBlurCheck();
	logonBlurCheck()
})

/**
 *定义全局变量
 */
function definedWindow() {
	//是否可注册登陆的判断
	window.LogonFlag = 1; //0为不可登陆，1为可登录
	window.SignFlag = 1; //0为不可注册，1为可注册
	window.cookieTime = 0;
	window.uRegisterFlag = 0;
	window.eRegisterFlag = 0;
}

/**
 *检查cookie
 */
function cookieCheck() {
	var username = $.cookie('username');
	var password = $.cookie('username');
	if (username != undefined) {
		showUser(1);
		sendCookie(username)
	} else {
		return;
	};
}

/*
 *是否显示登陆后框1为登陆后 0为未登录
 **/
function showUser(flag) {
	var user = $('#logoned');
	var logon = $('#logon');
	if (flag) {
		user.removeClass('hide')
		user.addClass('show');
		logon.removeClass('show')
		logon.addClass('hide')
	} else {
		user.removeClass('show');
		user.addClass('hide');
		logon.removeClass('hide');
		logon.addClass('show')
	};
}

/**
 *客户端发送用户名
 *data为用户信息
 */
function sendCookie(username) {
	$.ajax({
		type: "POST",
		url: "servlet/UserInfoServlet",
		data: {
			"username": username
		},
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				showUser(1);
				setUser(data);
			} else {
				sendCookie(username);
			};
		},
		error: function(jqXHR) {
			alert(jqXHR.status);
		}
	})
}

/**
 *根据服务器发回的data设置用户信息
 */
function setUser(data) {
	var a = function() { /*<a href="">请点击这里设置</a>*/ }
	var aTag = a.toString().slice(16, -4)
	var userBarUserName = $('#userBarUserName');
	var headUserName = $('#headUserName');
	var headUserImg = $('#headUserImg');
	var userAge = $('#userAge');
	var userPost = $('#userPost');
	var UserSchool = $('#UserSchool');
	var UserMajor = $('#UserMajor');
	var UserInterest = $('#UserInterest');
	if (UserSchool == 0) {
		UserSchool.append(aTag)
	} else if (UserMajor == 0) {
		UserMajor.append(aTag);
	} else if (UserInterest == 0) {
		UserInterest.append(aTag)
	} else {
		UserSchool.html(data.school);
		UserMajor.html(data.major);
		UserInterest.html(data.interest + "等话题")
	};
	headUserName.html(data.username);
	userBarUserName.html(data.username);
	headUserImg.attr('src', data.Usrimg);
	userAge.html(data.JoinTime);
	userPost.html(data.arti_num);
}

/**
 *滚动事件
 */
function scrollAction() {
	$(window).scroll(function() {
		window.winTop = $(window).scrollTop();
		navbarFixed();
	})
}

/**
 *click事件框架
 */
function setClick() {
	$(document).click(function(e) {
		if (e.which == 1) {
			var target = e.target;
			var targetName = target.tagName;
			var targetClass = $(target).attr('class');
			var targetID = $(target).attr('id');
			closeLogon(targetClass);
			while (targetID == undefined && targetName != 'HTML') {
				target = $(target).parent();
				targetID = $(target).attr('id');
				targetName = $(target)[0].tagName;
			}
			BindClickID(targetID);
		}
	})
}


/**
 *绑定click事件
 */
function BindClickID(targetID) {
	if (targetID == 'logon')
		logonshow();
	else if (targetID == 'sign_btn')
		showSign();
	else if (targetID == 'logon_btn')
		showLogon();
	else if (targetID == 'removeLogon')
		removeLogon();
	else if (targetID == 'logonsend')
	//登陆触发事件
		logonNullCheck();
	else if (targetID == 'signsend') {
		signNullCheck();
	} else if (targetID == 'quit') {
		UserQuit();
	} else if (targetID == 'classifTag') {
		asideBarChange(0)
	} else if (targetID == 'infoTag') {
		asideBarChange(1)
	};

}

/**
 *登录层弹出
 */
function logonshow() {
	$('.logon_container').addClass('show');
	$('.logon_bg').addClass('show');
	$('.logon_wrap').addClass('show');
}

/**
 *转到注册
 */
function showSign() {
	setTimeout(function() {
		$('.logon_body_row1').hide();
		$('.logon_body_row2').show();
		$('.glyphicon-remove').addClass('posLeft')
	}, 150);
	$('.logon_body').addClass('turn')
}

/**
 *转到登录
 */
function showLogon() {
	setTimeout(function() {
		$('.logon_body_row2').hide();
		$('.logon_body_row1').show();
		$('.glyphicon-remove').removeClass('posLeft')
	}, 150);
	$('.logon_body').removeClass('turn')
}

/**
 *关闭登录层效果
 */
function removeLogon() {
	$('.logon_container').removeClass('show');
	$('.logon_bg').removeClass('show');
	$('.logon_wrap').removeClass('show');
	showLogon();
	$(":input").val("");
	$(":checkbox").attr('checked', false);
	$('.input_tips').removeClass('show');
	$(":input").removeClass('wrong_input')
}

/**
 *绑定关闭登录层事件
 */
function closeLogon(targetClass) {
	if ($('.logon_container').hasClass('show')) {
		if (targetClass == 'logon_wrap show' || targetClass == 'logon_container show') {
			removeLogon()
		};
	}
}

/**
 *导航条变化事件
 */
function navbarFixed() {
	var body = $('body').attr('id');
	var navbarH = $('.navbar').height();
	var changeTop = $('.head').height();
	if (winTop > changeTop) {
		$('#searchcon').show();
		if (body == 'index') {
			$('.navbar li').addClass('blue');
			$('.navbar-brand').addClass('blue');
		};
		$('.navbar').removeClass('navbar_absolute');
		$('.navbar').addClass('navbar-fixed-top');
	}
	if (winTop == 0) {
		$('#searchcon').hide();
		$('.navbar li').removeClass('blue');
		$('.navbar-brand').removeClass('blue');
		$('.navbar').addClass('navbar_absolute');
		$('.navbar').removeClass('navbar-fixed-top');
	};
}

/**
 *登录框空值查询及绑定发送登录信息
 */
function logonNullCheck() {
	var logon = $('#logon_main');
	var username = logon.find('.username');
	var password = logon.find('.password')
	var a = Nullcheck(username)
	var b = Nullcheck(password)
	if (LogonFlag == 1 && a == 1 && b == 1) {
		Logonsend(username, password)
	} else
		return;
}

/**
 *注册框空值查询及绑定发送注册信息
 */
function signNullCheck() {
	var sign = $('#sign_main');
	var username = sign.find('.username')
	var email = sign.find('.email');
	var password = sign.find('.password');
	Nullcheck(username);
	Nullcheck(email);
	Nullcheck(password);
	passswrodCheck(password);
	//如果可注册就执行注册方法
	if (SignFlag == 1 && eRegisterFlag == 1 && uRegisterFlag == 1) {
		RegisterSend(username, email, password);
	} else
		return;
}
/**
 *空值查询
 */
function Nullcheck(target) {
	var flag = 0
	if (target.val() == '') {
		addwrong(target);
		flag = 0
	} else {
		flag = 1;
	};
	return flag
}

/**
 *添加输入错误红框
 */
function addwrong(target) {
	target.addClass('wrong_input');
	cancel_wrong(target)
}

/**
 *用于取消输入错误的红框事件
 *
 */
function cancel_wrong(target) {
	//绑定事件
	var target = target;
	target.bind('keyup', function() {
		if (target.hasClass('wrong_input')) {
			target.removeClass('wrong_input');
		};
	})
}

/**
 *注册界面
 *注册用户名失去焦点触发事件(usernamecheck)
 *校验用户名格式
 *检查用户名是否被注册(usernameExit)
 *邮箱失去焦点触法事件(emailcheck)
 *检验邮箱格式
 *检查邮箱是否注册(emailExit)
 */
function signBlurCheck() {
	SignFlag = 1; //0为不可注册，1为可注册
	var sign = $('#sign_main');
	var username = sign.find('.username');
	var email = sign.find('.email');
	var password = sign.find('.password');
	usernamecheck = username.blur(function() {
		var registerFlag = 0;
		var usernameText = username.val();
		var usernameTips1 = username.nextAll('.input_tips').eq(0);
		var usernameTips2 = username.nextAll('.input_tips').eq(1);
		//格式校验
		if (usernameText.length > 10 || usernameText.length < 2) {
			addwrong(username)
			usernameTips2.addClass('show');
			cancel_Tips(username, usernameTips2)
			SignFlag = 0;
		} else {
			usernameTips2.removeClass('show')
				//用户名存在校验
			usernameExit = $.ajax({
				type: "POST",
				url: "servlet/RegisterServlet",
				data: {
					"type": 0,
					"username": usernameText
				},
				dataType: "json",
				success: function(data) {
					registerFlag = data.registerFlag;
					if (registerFlag == 0) {
						uRegisterFlag = 1;
						usernameTips1.removeClass('show')
					} else {
						uRegisterFlag = 0;
						usernameTips1.addClass('show')
						cancel_Tips(username, usernameTips1);
					}
				},
				error: function(jqXHR) {
					alert(jqXHR.status)
				},
			})
		}
	})
	emailcheck = email.blur(function() {
		var registerFlag = 0;
		var emailText = email.val();
		//格式校验错误提示
		var emailTips1 = email.nextAll('.input_tips').eq(0);
		//已注册错误提示
		var emailTips2 = email.nextAll('.input_tips').eq(1);
		var regObj = /[\w!#$%&'*+\/=?^_`{|}~-]+(?:\/\.[\/\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
		var emailFormatflag = regObj.test(emailText);
		if (!emailFormatflag) {
			addwrong(email);
			emailTips2.addClass('show');
			cancel_Tips(email, emailTips2);
			SignFlag = 0;
		} else {
			emailTips2.removeClass('show')
			emailExit = $.ajax({
				type: "POST",
				url: "servlet/RegisterServlet",
				data: {
					"type": 1,
					"email": emailText
				},
				dataType: "json",
				success: function(data) {
					registerFlag = data.emailFlag;
					if (registerFlag == 0) {
						eRegisterFlag = 1;
						emailTips1.removeClass('show');
					} else {
						eRegisterFlag = 0;
						emailTips1.addClass('show');
						cancel_Tips(email, emailTips1);
					}
				},
				error: function(jqXHR) {
					alert(jqXHR.status)
				}
			})
		}
	})

}

/**
 *@parm:cancel Tips
 *		用于绑定目标文本框，键盘输入时取消输入提示
 */
function cancel_Tips(target, targetTips) {
	target.bind('keyup', function() {
		if (targetTips.hasClass('show')) {
			targetTips.removeClass('show')
		};
	})
}

/**
 *检查密码格式
 */
function passswrodCheck(password) {
	var passwordText = password.val();
	var passwordTips = password.nextAll('.input_tips');
	if (passwordText.length < 6 || passwordText.length > 20) {
		SignFlag = 0;
		addwrong(password);
		passwordTips.addClass('show')
		cancel_Tips(password, passwordTips)
	} else {
		SignFlag = 1;
		passwordTips.removeClass('show')
	}
}

/**
 *发送注册信息
 */
function RegisterSend(username, email, password) {
	this.username = username.val();
	this.email = email.val();
	this.password = password.val();
	var url;
	$.ajax({
		type: "POST",
		url: "servlet/RegisterServlet",
		data: {
			"type": 2,
			"username": this.username,
			"email": this.email,
			"password": this.password
		},
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				url = data.url;
				location = url;
			} else {
				RegisterSend(username, email, password)
			};
		},
		error: function(jqXHR) {
			alert(jqXHR.status)
		}
	})
}

/**
 *登录界面
 *登录用户名失去焦点触发事件
 */
function logonBlurCheck() {
	LogonFlag = 1;
	var logon = $('#logon_main')
	var username = logon.find('.username');
	var usernameTips1 = username.nextAll('.input_tips').eq(0);
	username.blur(function() {
		var registerFlag = 0;
		var usernameText = username.val();
		if (usernameText.length > 0) {
			$.ajax({
				type: "POST",
				url: "servlet/LoginServlet",
				data: {
					"type": 2,
					"username": usernameText
				},
				dataType: "json",
				success: function(data) {
					registerFlag = data.registerFlag
					if (registerFlag == 0) {
						LogonFlag = 0;
						usernameTips1.addClass('show');
						cancel_Tips(username, usernameTips1)
					} else {
						LogonFlag = 1;
						usernameTips1.removeClass('show')
					};
				},
				error: function(jqXHR) {
					alert(jqXHR.status)
				}
			})
		};

	})
}

/**
 *发送登录信息
 */
function Logonsend(username, password) {
	var usernameText = username.val();
	var passwordText = password.val();
	var passwordTips = password.nextAll('.input_tips').eq(0);
	$.ajax({
		type: "POST",
		url: "servlet/LoginServlet",
		data: {
			"type": 1,
			"username": usernameText,
			"password": passwordText
		},
		dataType: "json",
		success: function(data) {
			if (data.success == 1) {
				setcookie(usernameText, passwordText);
			} else {
				passwordTips.addClass('show');
				cancel_Tips(password, passwordTips)
			};
		},
		error: function(jqXHR) {
			alert(jqXHR.status)
		}
	})
}

/**
 *设置登录信息cookie
 */

function setcookie(username, password) {
	if (cookieTime > 0) {
		$.cookie("username", username, {
			expires: cookieTime
		});
		$.cookie("password", password, {
			expires: cookieTime
		});

	} else {
		$.cookie('username', username);
		$.cookie('password', password);
	}
	location = ".";
}

/**
 *检查是否勾选记住我
 *勾选了将cookie过期时间cookieTime设置为7
 *否则设置为0
 */
function checkRe_me() {
	var a = $('#re_me')
	a.bind('change', function() {
		if (a.get(0).checked) {
			cookieTime = 7
		} else {
			cookieTime = 0
		};
	})
}

/**
 *退出登录
 */
function UserQuit() {
	$.cookie('username', '', {
		expires: -1
	});
	$.cookie('password', '', {
		expires: -1
	});
	location.reload()
}

function setHotZone() {
	$.ajax({
		url: '/',
		type: 'POST',
		dataType: 'json',
		data: {

		},
		success: function(data) {

		},
		error: function(jqXHR) {

		}
	})

}



/**
 * 除主页外通用
 */

/**
 * 侧边栏切换
 * @param  {int} i 0为显示类型 1为显示通知
 * @return {[type]}   [description]
 */
function asideBarChange(i) {
	if (i == 0) {
		$('.classif').show();
		$('.infoCon').hide();
		$('.aside-bar').find('lable').eq(0).removeClass('asideNav')
		$('.aside-bar').find('lable').eq(1).addClass('asideNav')

	} else {
		$('.classif').hide();
		$('.infoCon').show();
		$('.aside-bar').find('lable').eq(1).removeClass('asideNav')
		$('.aside-bar').find('lable').eq(0).addClass('asideNav')
	};
}