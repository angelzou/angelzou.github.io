var pagenum = getUrlParam('pagenum');
$(".mobile-menu").click(function(){
	var $main_menu = $("#main-menu");
	if(!$main_menu.is(":visible")){
		$main_menu.removeClass("collapse").addClass("menu-down");
	}else{
		$main_menu.removeClass("menu-down").addClass("collapse");
	}	
});