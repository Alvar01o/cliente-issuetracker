$(document).ready(function(){
    if($('.toast-body').text() !== "") {
        setTimeout( function(){
            $('.toast').toast('show');
        },1500);
    }
})