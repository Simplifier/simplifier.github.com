/**
 * Created with PyCharm.
 * User: Alex
 * Date: 09.04.2015
 * Time: 15:30
 * To change this template use File | Settings | File Templates.
 */

(function () {
	/**data storage*/
	var model = [];
	
	function restoreClosed(data) {
		var buttons = $('.buttons');
		
		for (var i in data) {
			var btns = createBtnGroup(data[i], false);
			buttons.append(btns);
		}
	}
	
	function saveData(data) {
		confectioner.set('words', JSON.stringify(data), {expires: 99999999});
	}
	
	function createBtnGroup(words, save/*:Boolean*/) {
		if (save) {
			model.push(words);
			saveData(model);
		}
		
		var btnGroup = '\
				<div class="alert alert-info alert-dismissible" role="alert">\
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
						<span aria-hidden="true">&times;</span>\
					</button>';
		
		for (var i in words) {
			btnGroup += '<button type="button" class="btn btn-primary">' + words[i] + '  <span class="glyphicon glyphicon-refresh"></span></button>';
		}
		
		btnGroup += '</div>';
		
		var btns = $(btnGroup);
		//word change handler
		btns.find('.btn').click(function (e) {
			var newWord = genWord();
			$(e.currentTarget).empty().html(newWord + '  <span class="glyphicon glyphicon-refresh"></span>');
			
			var index = $(this).parent().index();
			var words = model[index];
			var subindex = $(this).index();
			words.splice(subindex - 1, 1, newWord);
			saveData(model);
		});
		
		//group close handler
		btns.find('.close').click(function () {
			var index = $(this).parent().index();
			model.splice(index, 1);
			saveData(model);
		});
		
		return btns;
	}
	
	function generate(num) {
		var result = [];
		for (var i = 0; i < num; i++) {
			result.push(genWord());
		}
		return result;
	}
	
	function genWord() {
		var len = srcData.length;
		var index = Math.floor(Math.random() * len);
		return srcData.splice(index, 1)[0];
	}
	
	var confectioner = {
		get: function (name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		
		//options: {expires, path, domain, secure}
		set: function (name, value, options) {
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
		},
		
		delete: function (name) {
			confectioner.set(name, "", {
				expires: -1
			});
		}
	};
	
	$(window).load(function () {
		var cookies = confectioner.get('words');
		model = cookies ? JSON.parse(cookies) : [];
		restoreClosed(model);
		
		var buttons = $('.buttons');
		
		$('.drop-item').click(function () {
			var words = generate(parseInt($(this).text()));
			var btns = createBtnGroup(words, true);
			
			buttons.append(btns);
		});
	});
})();