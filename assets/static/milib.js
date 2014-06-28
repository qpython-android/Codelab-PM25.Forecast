var milib;
if (milib==undefined) {

var milib = function(){
};

milib.qeditor = function(str){
alert('please open it with QPython browser')
};
milib.a8playVideoFromGW= function(url){
    window.open(url)
};
milib.qpyChecklibinstall = function(cat, target) {
    return '0';
};
milib.qpylibinstall = function(cat,url,target){
    window.open(url)
};

milib.gotoIfPay = function(url, packageId, packageUrl){
    window.open(url)
};

milib.closeMtb= function() {
location.href='qpy://close'
};

milib.call= function(number) {
location.href='qpy://call:'+number
};

}


// waiting dialog
$('.js-loading-bar').html(
'<div class="modal-dialog">'+
'<div class="modal-content">'+
'<div class="modal-body">'+
'<div class="progress progress-popup">'+
'<div class="progress-bar"></div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'
)
this.$('.js-loading-bar').modal({
    backdrop: 'static',
    show: false
});



function init() {
var $modal = $('.js-loading-bar'),
  $bar = $modal.find('.progress-bar');

/*$modal.modal('show');
$bar.addClass('animate');

setTimeout(function() {
    $bar.removeClass('animate');
    $modal.modal('hide');
}, 1000);
*/

/*$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})*/


}

$( document ).ready(function() {
    init();
});
$.ready(function(e){
    init();
});


