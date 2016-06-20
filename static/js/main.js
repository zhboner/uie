+function($){


var BODY = jQuery('body'),
	V = '2.1.0',
	_form = jQuery('#commentform'),
	_cancelButton = jQuery('#cancel-comment-reply-link'),
	_cancelText = _cancelButton.text();
jQuery(document).on('submit', '#commentform', function() {
	var _self = jQuery(this);
	jQuery.ajax({
		url: PUMA.ajax_url,
		data: _self.serialize() + "&action=ajax_comment",
		type: _self.attr('method'),
		beforeSend: addComment.createButterbar("提交中...."),
		error: function(request) {
			var t = addComment;
			t.createButterbar(request.responseText);
		},
		success: function(data) {
			jQuery('textarea').each(function() {
				this.value = ''
			});
			var t = addComment,
				cancel = t.I('cancel-comment-reply-link'),
				temp = t.I('wp-temp-form-div'),
				respond = t.I(t.respondId),
				post = t.I('comment_post_ID').value,
				parent = t.I('comment_parent').value;
			if (parent != '0') {
				jQuery('#respond').before('<ol class="children">' + data + '</ol>');
			} else if (!jQuery('.commentlist').length) {
				jQuery('#respond').before('<ol class="commentlist">' + data + '</ol>');
			} else {
				jQuery('.commentlist').append(data); // your comments wrapper
			}
			t.createButterbar("提交成功");
			cancel.style.display = 'none';
			cancel.onclick = null;
			t.I('comment_parent').value = '0';
			if (temp && respond) {
				temp.parentNode.insertBefore(respond, temp);
				temp.parentNode.removeChild(temp)
			}
		}
	});
	return false;
});
addComment = {
	moveForm: function(commId, parentId, respondId) {
		var t = this,
			div, comm = t.I(commId),
			respond = t.I(respondId),
			cancel = t.I('cancel-comment-reply-link'),
			parent = t.I('comment_parent'),
			post = t.I('comment_post_ID');
		_cancelButton.text(_cancelText);
		t.respondId = respondId;
		if (!t.I('wp-temp-form-div')) {
			div = document.createElement('div');
			div.id = 'wp-temp-form-div';
			div.style.display = 'none';
			respond.parentNode.insertBefore(div, respond)
		}!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
		jQuery("body").animate({
			scrollTop: jQuery('#respond').offset().top - 180
		}, 400);
		parent.value = parentId;
		cancel.style.display = '';
		cancel.onclick = function() {
			var t = addComment,
				temp = t.I('wp-temp-form-div'),
				respond = t.I(t.respondId);
			t.I('comment_parent').value = '0';
			if (temp && respond) {
				temp.parentNode.insertBefore(respond, temp);
				temp.parentNode.removeChild(temp);
			}
			this.style.display = 'none';
			this.onclick = null;
			return false;
		};
		try {
			t.I('comment').focus();
		} catch (e) {}
		return false;
	},
	I: function(e) {
		return document.getElementById(e);
	},
	clearButterbar: function(e) {
		if (jQuery(".butterBar").length > 0) {
			jQuery(".butterBar").remove();
		}
	},
	createButterbar: function(message) {
		var t = this;
		t.clearButterbar();
		jQuery("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>');
		setTimeout("jQuery('.butterBar').remove()", 3000);
	}
};

window.addComment = addComment;

jQuery(window).scroll(function() {
	var st = jQuery(this).scrollTop(),
		backToTop = jQuery('.back-to-top');
	if (st > 200) {
		backToTop.removeClass('u-hide');
	} else {
		backToTop.addClass('u-hide');
	}
})

var backToTop = function() {
		jQuery("html,body").animate({
			scrollTop: 0
		}, 800);
	}

jQuery(document).on("click", ".termlike", function() {
	var _self = jQuery(this);
	if (_self.hasClass('is-active')) {
		alert('您已经赞过啦')
	} else {
		_self.addClass('is-active');
		jQuery.ajax({
			url: PUMA.ajax_url,
			data: _self.data(),
			type: 'POST',
			dataType: "json",
			success: function(data) {
				if (data.status === 200) {
					_self.find('.count').html(data.data)
				} else {
					alert('服务器正在努力找回自我')
				}
			}
		})
	}
});

jQuery(document).on('click', '.share-icons span', function() {
	var _self = jQuery(this),
		type = _self.data('type'),
		parent = _self.parent(),
		title = parent.data('title'),
		url = parent.data('url'),
		thumb = parent.data('thumb'),
		box = ["toolbar=0,status=0,resizable=1,width=640,height=560,left=", (screen.width - 640) / 2, ",top=", (screen.height - 560) / 2].join(""),
		link;
	switch (type) {
	case 'weibo':
		link = "http://service.weibo.com/share/share.php?title=" + title + "&appkey=2313279544&url=" + url;
		window.open(link, "分享", box);
		break;
	case 'twitter':
		link = "http://twitter.com/share?text=" + title + "&url=" + url;
		window.open(link, "分享", box);
		break;
	case 'wechat':
		link = "http://qr.liantu.com/api.php?text=" + url;
		window.open(link, "分享", box);
		break;
	}
	return false;
});

jQuery(document).on('click', '.opensearch', function() {
	var _self = jQuery(this),
		searchform = jQuery('.search-form');
	if (searchform.hasClass('is-active')) {
		searchform.removeClass('is-active');
	} else {
		searchform.addClass('is-active');
	}
});

}(jQuery);