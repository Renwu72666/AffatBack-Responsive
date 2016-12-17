var introPlayState   = false,
  intervalID         = 0,
  krpano             = document.getElementById("krpanoSWFObject"),
  leftMenuToggleBtn  = document.getElementById('toggle-right-menu'),
  introAudio         = document.getElementById('introduction'),
  rightMenuContainer = document.getElementById('right-menu-container').firstElementChild,
  callContainer      = document.getElementsByClassName('call-container').item(0),
  contactBtn = document.getElementById('contact'),
  callDefault        = callContainer.firstElementChild,
  contactTel         = callDefault.firstElementChild.nextElementSibling;
  leaveContactInfo   = callContainer.lastElementChild,
  leaveContact       = document.getElementById('leave-contact'),
  submitInfo         = document.getElementById('submit-info'),
  cancelInfo         = document.getElementById('cancel-info'),
  leftMenu           = document.getElementById('left-menu'),
  bgMusic            = document.getElementById('bg-music'), 
  gyroSwitch         = document.getElementById('gyro-switch'),
  autorotateSwitch   = document.getElementById('autorotate-switch'),
  vrSwitch = document.getElementById('vr-switch'),
  big = document.getElementById('vr-big'),
  navRight           = document.getElementsByClassName('nav-right').item(0),
  popoutContainer    = document.getElementsByClassName('popout-container').item(0),
  xhr                = null,
  jsonObj            = null;



// 右部菜單收起、放下動畫的事件處理程序
function handleSlide(e) {
  e.preventDefault();

  if (intervalID !== 0) {
    return;
  }

  var height = Math.ceil(parseInt(rightMenuContainer.clientHeight)) + 50;

  if (e.target.firstChild.data === '-') {
    intervalID = setInterval(function() {

      rightMenuContainer.style.top = rightMenuContainer.style.top ?
        parseInt(rightMenuContainer.style.top) - 16 + 'px' : '0px';

      if (parseInt(rightMenuContainer.style.top) * -1 > height) {
        clearInterval(intervalID);
        intervalID = 0;
      }
    }, 10);

    e.target.innerHTML = '+';
  } else if (e.target.firstChild.data === '+') {
    intervalID = setInterval(function() {
      rightMenuContainer.style.top = parseInt(rightMenuContainer.style.top) === 0 ?
        0 : parseInt(rightMenuContainer.style.top) + 16 + 'px';

      if (parseInt(rightMenuContainer.style.top) === 0) {
        clearInterval(intervalID);
        intervalID = 0;
      }
    }, 10);

    e.target.innerHTML = '-';
  }
}

leftMenuToggleBtn.addEventListener('click', handleSlide, false);


// 為聯繫經紀人按鈕添加事件處理程序
contactBtn.addEventListener('click', function(e) {
  e.preventDefault();
  showItem(callContainer.firstChild);
}, false);
/*homeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showItem(callContainer.firstChild);
}, false);*/

leaveContact.addEventListener('click', function(e) {
  callDefault.style.display = 'none';
  leaveContactInfo.style.display = 'block';
}, false);


submitInfo.addEventListener('click', function(e) {
  e.preventDefault();
}, false);


cancelInfo.addEventListener('click', function(e) {
  e.preventDefault();
  leaveContactInfo.style.display = 'none';
  callDefault.style.display = 'block';
  e.stopImmediatePropagation();
}, false);



// 為陀螺儀開關按鈕添加事件處理程序
gyroSwitch.addEventListener('click', function(e) {
  e.preventDefault();

  if (krpano.get('Plugin[skin_gyro].enabled')) {
    krpano.set('Plugin[skin_gyro].enabled', false);
    gyroSwitch.style.backgroundPosition = '0 -30px';
  } else {
    krpano.set('Plugin[skin_gyro].enabled', true);
    gyroSwitch.style.backgroundPosition = '0 0';
  }
}, false);


// 為自動旋轉開關按鈕添加事件處理程序
autorotateSwitch.addEventListener('click', function(e) {
  e.preventDefault();

  if (krpano.get('autorotate.enabled')) {
    krpano.set('autorotate.enabled', false);
    autorotateSwitch.style.backgroundPosition = '0 -30px';
  } else {
    krpano.set('autorotate.enabled', true);
    autorotateSwitch.style.backgroundPosition = '0 0';
  }
}, false);


// 為 VR 開關按鈕添加事件處理程序
vrSwitch.addEventListener('click', function(e) {
    e.preventDefault();
    krpano.call('webvr.enterVR()');
}, false);

big.addEventListener('click', function (e) {
    e.preventDefault();
    krpano.set('fullscreen', true);
}, false);


// 菜單的淡入
function fadeInLeftPanel() {
  leftMenu.classList.add('fade-in-ltr');
}


function fadeInRightPanel() {
  navRight.classList.add('fade-in-rtl');
}


// 顯示彈出式界面
function showItem(item) {
  var parent        = item.parentNode,
    activePopout    = parent,
    activeContainer = parent.parentNode;

  parent.parentNode.style.display = 'block';
  parent.classList.remove('fade-out');
  setTimeout(function() {
    parent.classList.add('fade-in');
  }, 10);

  activeContainer.addEventListener('click', function(e) {
    coord = activePopout.getBoundingClientRect();

    if (!(e.clientX > coord.left && e.clientX < coord.right && e.clientY >
      coord.top && e.clientY < coord.bottom)) {
        setTimeout(function() {
          activePopout.classList.add('fade-out');
        }, 10);
        setTimeout(function() {
          activeContainer.style.display = 'none';
          activePopout.classList.remove('fade-in');
          activeContainer.removeEventListener('click', arguments.callee, false);
          if (!activePopout.classList.contains('call-container')) {
            krpano.call('zoomto(120)');
          }
        }, 400);
      }
  }, false);
}


// 獲取並設置經紀人電話號碼、名字及頭像
function setContactTel() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 304) {
      jsonObj = JSON.parse(xhr.responseText);
      contactTel.innerHTML = jsonObj[0].telNumber;
      contactTel.previousElementSibling.innerHTML += jsonObj[0].contactName + '：)';
      contactTel.nextElementSibling.href = 'tel:' + jsonObj[0].telNumber;
      navRight.firstElementChild.style.backgroundImage = 'url(' + jsonObj[0].avatar + ')';
    }
  }
}
function aa() {
    parent.aa();
}

xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', setContactTel, false);
xhr.open('get', '../../vr-web/data/contactInfo.json');
xhr.send(null);
