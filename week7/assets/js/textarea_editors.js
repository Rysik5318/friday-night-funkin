function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}
	else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}
function setCaretToPos(input, pos) {
	setSelectionRange(input, pos, pos);
}

function selectedCase(action) {
	return $(curTextarea).each(function() {
		var textarea = $(this);
		var value = textarea.val();
		var start = textarea[0].selectionStart;
		var end = textarea[0].selectionEnd;
		var selectedText = value.substring(start, end);
		switch (action) {
			case 'upperCase':
				selectedText = selectedText.toLocaleUpperCase();
				break;
			case 'lowerCase':
				selectedText = selectedText.toLocaleLowerCase();
				break;
			case 'firstUpperCase':
				selectedText = selectedText.toLocaleLowerCase();
				selectedText = selectedText.charAt(0).toLocaleUpperCase() + selectedText.substr(1);
				break;
			case 'forEachFirstUpperCase':
				selectedText = selectedText.toLocaleLowerCase();
				var arr = selectedText.split(' ');
				selectedText = '';
				arr.forEach(function(val) {
					selectedText += val.charAt(0).toLocaleUpperCase() + val.substr(1) + ' ';
				});
				selectedText = selectedText.slice(0,-1);
				break;
		}
		textarea.val(value.substr(0, start) + selectedText + value.substring(end, value.length));
		textarea.focus();
		setCaretToPos(curTextarea, end);
	});
};

function createLink() {
	$('#linkVal').toggleClass('d-none');
	$('#linkOK').toggleClass('d-none');
	$('#linkVal').focus();
}
function createLinkOK(href) {
	if ($('#linkVal').val()!='') {
		$('#linkVal').toggleClass('d-none');
		$('#linkOK').toggleClass('d-none');
		$('#linkVal').val('');
		// wrapSelectedLink(href);
		var textarea = $(curTextarea);
		var value = textarea.val();
		var start = textarea[0].selectionStart;
		var end = textarea[0].selectionEnd;
		// href = href.replace("https://modslab.net","");
		textarea.val(value.substr(0, start) + '<a target="_blank" rel="nofollow" href="' + href + '">' + value.substring(start, end) + '</a>' + value.substring(end, value.length));
		setCaretToPos(curTextarea, end + href.length + 46);
		$(curTextarea).focus();
	}
}

function createBoldText() {
	var textarea = $(curTextarea);
	var value = textarea.val();
	var start = textarea[0].selectionStart;
	var end = textarea[0].selectionEnd;
	textarea.val(value.substr(0, start) + '<b>' + value.substring(start, end) + '</b>' + value.substring(end, value.length));
	setCaretToPos(curTextarea, end + 7);
	$(curTextarea).focus();
}

function selectedColor(color) {
	var textarea = $(curTextarea);
	var value = textarea.val();
	var start = textarea[0].selectionStart;
	var end = textarea[0].selectionEnd;
	textarea.val(value.substr(0, start) + '<span style="color:' + color + '">' + value.substring(start, end) + '</span>' + value.substring(end, value.length));
	setCaretToPos(curTextarea, end + 35);
	$(curTextarea).focus();
}

$('textarea').focus(function() {
	curTextarea = this;
	$('#textarea-editors').offset({top:$(this).offset().top - 35, left:$(this).offset().left + 100});
});

$("#linkVal").keydown(function(event){
	if(event.keyCode == 13){
		event.preventDefault();
		createLinkOK($('#linkVal').val());
	}
});