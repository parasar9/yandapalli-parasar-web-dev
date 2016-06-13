$(function(){
    $w = $('.pic').width();
    $h = $('.pic').height();
    $w2 = $w + 6;
    $h2 = $h + 6;

    $('.pic').hover(function(){
        $(this).stop().animate({height:$h2,width:$w2,left:"-3px",top:"-3px"},500);
    },function(){
        $(this).stop().animate({height:$h,width:$w,left:"0px",top:"0px"},500);
    });
});