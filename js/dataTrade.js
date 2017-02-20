$(function() {
	window.url = null;
	window.theme = getBodyID();
	if (theme == 'question') {
		url = 'sdf';
		doFour();
	}
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
 *获取body ID
 */
function getBodyID() {
	var a = $('body').attr('id');
	return a
}

/**
四大板块的数据处理
 */
function doFour() {
	window.urlArr = Readurl();
	window.MajorType = urlArr['MajorType'];
	MajorType = MajorType == undefined ? 'allMajor' : urlArr['MajorType'];
	var MajorTypeId = "#" + MajorType;
	window.order = urlArr['order'];
	order = order == undefined ? 0 : urlArr['order'];
	setTaO(MajorType, MajorTypeId, order);
	sendSet();
}

/**
 *页面配置
 */
function setTaO(MajorType, MajorTypeId, order) {
	var orderText = $('#orderText')
	var hot = $('.main-nav-hot');
	var last = $('.main-nav-last');
	var classif = $('.classif');
	classif.find('a').removeClass('active');
	$(MajorTypeId).addClass('active')
	hot.attr('href', 'question.html?order=1&MajorType=' + MajorType);
	last.attr('href', 'question.html?order=0&MajorType=' + MajorType);
	$(MajorTypeId).addClass();
	if (order == 1) {
		orderText.html('最近发表')
	} else {
		orderText.html('热门帖子')
	}
}

/**
 *发送用户配置信息
 */
function sendSet() {
	$.ajax({
		type: 'POST',
		url: url,
		data: {
			"MajorType": MajorType,
			"order": order
		},
		success: function(data) {
			if (data.success == 1) {
				getContent(data);
			} else {
				sendSet();
			};
		},
		error: function(jqXHR) {
			alert(jqXHR.status);
		}

	})
}

/**
 *配置内容
 */
function getContent(data) {
	var article = data.article;
	var alength = article.length;
	for (var i = 0; i < alength; i++) {
		addArtLi()
		dogetContent(i, article)
	};
}

/**
 *添加文章列表标签
 */
function addArtLi() {
	var a = function() {
		/*<li class="card">
											<a href="" class="left card-userImg"><img src="" alt=""></a>
											<div class="Tcontents">
												<h4><a href="" class="card-title"></a></h4>
												<a href="" class="card-userName"></a>
												<span class="card-time"></span>
												<br>
												<p class="card-preview"></p>
												<div class="card-bottom">
													<span class="glyphicon glyphicon-comment" style="color: #00B7EE"></span>
													<a href="" class="card-answer"></a>
													<span class="glyphicon glyphicon-pushpin" style="color: #00B7EE"></span>
													<a href="javascript:;" class="card-follow"></a>
													<span class="glyphicon glyphicon-share-alt" style="color: #00B7EE"></span>
													<a href="javascript:;" class="card-share"></a>
												</div>
											</div>
										</li>*/
	};
	var aTag = a.toString().slice(19, -6);
	$('section').append(aTag);
}

/**
 * [配置文章列表信息]
 * @param  {[numbner]} i [第i条]
 * @return {[null]}   
 */
function dogetContent(i, article) {
	var card = $('.card').eq(i);
	var info = article[i];
	var user = card.find('.card-userImg'); //user href
	var userImg = user.find('img'); //img src
	var username = card.find('.card-userName'); //user href  html
	var time = card.find('card-time'); //html
	var preview = card.find('.card-preview'); //html
	var answer = card.find('.card-answer'); //html
	var answerString2 = "条回复";
	var title = card.find('.card-title');
	user.attr('href', info.userUrl);
	userImg.attr('src', info.userImg);
	username.html(info.userName);
	username.attr('href', info.userUrl);
	time.html(info.Atime);
	preview.html(info.preview);
	answer.html(info.answer + answerString2)
	title.html(info.title);
	title.attr('href', info.titleUrl);
}