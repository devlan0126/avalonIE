
// mdc/adrg 
function mdcAdrgResize() {
    var $tab = document.getElementById('tabs-3')
    var tabHeight = $tab.offsetHeight;
    if ($tab.offsetHeight === 0) {
        tabHeight = $('.ui-tabs-panel').height()
        var h = tabHeight - 50 - 40;
    } else {
        var h = tabHeight - 50 - 60;
    }
    $('.mdc-mdcAdrg-tab__list').css('height', h + 'px');
}

// adrg
function adrgResize() {
    var $tab = document.getElementById('tabs-4')
    var tabHeight = $tab.offsetHeight;
    if ($tab.offsetHeight === 0) {
        tabHeight = $('.ui-tabs-panel').height()
        var h = tabHeight - 50 - 20;
    } else {
        var h = tabHeight - 50 - 40;
    }
    $('.mdc-adrg-tab__list').css('height', h + 'px');
}

// mcc
function mccResize() {
    var $tab = document.getElementById('tabs-5')
    var tabHeight = $tab.offsetHeight;
    if ($tab.offsetHeight === 0) {
        tabHeight = $('.ui-tabs-panel').height()
        var h = tabHeight - 50 - 40;
    } else {
        var h = tabHeight - 50 - 60;
    }
    $('.mdc-mcc-tab__list').css('height', h + 'px');
}

// dfcs
function dfcsResize() {
    var $tab = document.getElementById('tabs-6')
    var tabHeight = $tab.offsetHeight;
    if ($tab.offsetHeight === 0) {
        tabHeight = $('.ui-tabs-panel').height()
        var h = tabHeight - 50 - 35;
    } else {
        var h = tabHeight - 50 - 55;
    }
    $('.ms-dfcs-tab .list-ul').css('height', h + 'px');
}

window.mdcAdrgResize = mdcAdrgResize
window.adrgResize = adrgResize
window.mccResize = mccResize
window.dfcsResize = dfcsResize