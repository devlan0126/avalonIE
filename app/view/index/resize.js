
// mdc/adrg 
function mdcAdrgResize() {
    var $tab = $('.ui-tabs-panel')
    var h = $tab.height() - 50 - 45;
    $('.mdc-mdcAdrg-tab__list').css('height', h + 'px');
}





window.mdcAdrgResize = mdcAdrgResize