/* Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
 * param  iNumber Integer Число на основе которого нужно сформировать окончание
 * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5), например ['яблоко', 'яблока', 'яблок']
 * return String */
function getNumEnding(iNumber, aEndings) {
	var sEnding, i;
	iNumber = iNumber % 100;
	if (iNumber>=11 && iNumber<=19) {
		sEnding=aEndings[2];
	} else {
		i = iNumber % 10;
		switch (i) {
			case (1): sEnding = aEndings[0]; break;
			case (2):
			case (3):
			case (4): sEnding = aEndings[1]; break;
			default: sEnding = aEndings[2];
		}
	}
	return iNumber+'&nbsp;'+sEnding;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
	options = options || {};
	var expires = options.expires;
	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}
	value = encodeURIComponent(value);
	var updatedCookie = name + "=" + value;
	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}
	document.cookie = updatedCookie;
}

function GetMirrorSize(link, id="size") {
	$.ajax({
		type: "POST",
		url: "/ajax_get_mirror_size.php",
		data: {link: link},
		cache: false,
		success: function(response){
			if (response.length < 9) {
				$("#"+id).val(response);
			}
		}
	});
}

function translit(str) {
	var ru = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
		'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
	}, n_str = [];
	str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
	for ( var i = 0; i < str.length; ++i ) {
		n_str.push(ru[ str[i] ] || ru[ str[i].toLowerCase() ] == undefined && str[i] || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() }) );
	}
	return n_str.join('');
}

function str2url(str) {
	str = translit(str.toLowerCase());
	str = str.replace(/[^a-z0-9]/g, '_'); // заменяем всё ненужное нам на "_"
	str = str.replace(/__+/g, '_'); // заменяем идущие подряд несколько "_" на один
	// аналог trim("_");
	if (str[0] == "_") {
		str = str.slice(1);
	}
	if (str[str.length - 1] == "_") {
		str = str.slice(0, -1);
	}
	return str;
}

function like(id, user_id) {
	if (user_id > 0) {
		$.ajax({
			type: "POST",
			url: "/ajax.php",
			data: { like: id },
			cache: false,
			success: function(response){
				resp = JSON.parse(response);
				if (resp.res == 'block') {
					$("#like_res").html('Возможность оценивать ограничена!');
				} else {
					$("#like").toggleClass('noactive');
					$("#likes_count").html(resp.likes);
					$("#like_res").html('Спасибо за оценку!');
				}
			}
		});
	} else {
		$("#like_res").html('Оценивать могут только<br><a href="/login/">авторизованные</a> пользователи');
	}
}

$(function () {
	// после полной загрузки страницы

	$('.b-nav > ul > li.b-drop1 > a').click(function(){
	  $('.b-nav > ul > li.b-drop1 > .b-dropdown').toggleClass('active');
	  $('.b-nav > ul > li.b-drop1').toggleClass('active');
	  event.preventDefault();
	});

	$(document).on('click', function(event) {
	  if (!$(event.target).closest(".b-nav > ul > li.b-drop1 , .b-nav > ul > li.b-drop1 > .b-dropdown").length) {
		$('.b-nav > ul > li.b-drop1 > .b-dropdown').removeClass('active');
		$('.b-nav > ul > li.b-drop1').removeClass('active');
	  }
	  event.stopPropagation();
	});

	$('.b-nav > ul > li.b-drop2 > a').click(function(){
	  $('.b-nav > ul > li.b-drop2 > .b-dropdown').toggleClass('active');
	  $('.b-nav > ul > li.b-drop2').toggleClass('active');
	  event.preventDefault();
	});

	$(document).on('click', function(event) {
	  if (!$(event.target).closest(".b-nav > ul > li.b-drop2 , .b-nav > ul > li.b-drop2 > .b-dropdown").length) {
		$('.b-nav > ul > li.b-drop2 > .b-dropdown').removeClass('active');
		$('.b-nav > ul > li.b-drop2').removeClass('active');
	  }
	  event.stopPropagation();
	});

	$('.b-nav > ul > li.b-drop0 > a').click(function(){
	  $('.b-nav > ul > li.b-drop0 > .b-dropdown').toggleClass('active');
	  $('.b-nav > ul > li.b-drop0').toggleClass('active');
	  event.preventDefault();
	});

	$(document).on('click', function(event) {
	  if (!$(event.target).closest(".b-nav > ul > li.b-drop0 , .b-nav > ul > li.b-drop0 > .b-dropdown").length) {
		$('.b-nav > ul > li.b-drop0 > .b-dropdown').removeClass('active');
		$('.b-nav > ul > li.b-drop0').removeClass('active');
	  }
	  event.stopPropagation();
	});


	$('.menu-icon').click(function(){
	  $('.b-header-top').toggleClass('active');
	  $('.menu-icon').toggleClass('active');
	});

	$(document).on('click', function(event) {
	  if (!$(event.target).closest(".menu-icon , .b-header-top").length) {
		$('.b-header-top').removeClass('active');
		$('.menu-icon').removeClass('active');
	  }
	  event.stopPropagation();
	});

	$('#game-menu .nav [href="'+location.pathname+'"]').addClass('active');

	$('[data-toggle="tooltip"]').tooltip();

	// $('.input-group-search input').focus(function() {
	// 	$('.input-group-search').addClass('focus');
	// });
	// $('.input-group-search input').blur(function() {
	// 	$('.input-group-search').removeClass('focus');
	// });

	// $(window).scroll(function() {
	// 	if($(this).scrollTop() != 0) {
	// 		$('#toTop').fadeIn();
	// 	} else {
	// 		$('#toTop').fadeOut();
	// 	}
	// });
	// $('#toTop').click(function() {
	// 	$('body,html').animate({scrollTop:0},200);
	// });

});