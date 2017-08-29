var myApp = new Framework7();
 
var $$ = Dom7;

$$('.open-left-panel').on('click', function (e) {
    // 'left' position to open Left panel
    myApp.openPanel('left');
});

$$('.open-right-panel').on('click', function (e) {
    // 'right' position to open Right panel
    myApp.openPanel('right');
});

$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});


$$('.popup-about').on('popup:opened', function () {
  console.log('About Popup opened')
});
$$('.popup-about').on('popup:close', function () {
  console.log('About Popup is closing')
});


$$('.popup-services').on('popup:open', function () {
  console.log('Services Popup is opening')
});
$$('.popup-services').on('popup:closed', function () {
  console.log('Services Popup is closed')
});