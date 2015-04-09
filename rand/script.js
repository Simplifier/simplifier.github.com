/**
 * Created with PyCharm.
 * User: Alex
 * Date: 09.04.2015
 * Time: 15:30
 * To change this template use File | Settings | File Templates.
 */

$(window).load(function(){
	var buttons = $('.buttons');
	$('.drop-item').click(function(){
		var btnGroup = '\
		<div class="alert alert-info alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		
		generate(parseInt($(this).text())).forEach(function(word){
			btnGroup += '<button type="button" class="btn btn-primary">' + word + '  <span class="glyphicon glyphicon-refresh"></span></button>';
		});
		btnGroup += '</div>';
		var btns = $(btnGroup);
		
		buttons.append(btns);
		
		btns.find('.btn').click(function(e){
			$(e.currentTarget).empty().html(genWord()+ '  <span class="glyphicon glyphicon-refresh"></span>');
		});
	});
	
	function generate(num){
		var result = [];
		for(var i = 0; i < num; i++){
			result.push(genWord());
		}
		return result;
	}
	
	function genWord(){
		var len = srcData.length;
		var index = Math.floor(Math.random() * len);
		return srcData.splice(index, 1)[0];
	}
});