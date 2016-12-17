var elem = {
    galleryImg: null,
    shareBg: null,
    shareBtn: null,
    gallery: null
  },
  coord = {
    sections: null,
    currSection: null,
    currSectionNo: 0,
    opacityStep: 0.001,
    last: null,
    lastElem: null,
    prevY: undefined,
    move: 0,
    currTrans: 0,
    prevTrans: 0
  },
  gly = {
    move: 0,
    dir: undefined,
    startPt: 0,
    endPt: 0,
    prevTrans: 0,
    currTrans: 0,
    prevX: undefined,
    currX: undefined
  }

// initialization
elem.gallery = document.getElementsByClassName('gallery').item(0);
elem.galleryImg = document.getElementsByClassName('gallery-img');
elem.shareBg = document.getElementsByClassName('share-screen').item(0);
elem.shareBtn = document.getElementsByClassName('share').item(0);
coord.sections = document.getElementsByTagName('section');
coord.currSection = coord.sections.item(0);
coord.currSectionNo = 0;
coord.last = document.getElementById('call-me');
coord.lastElem = coord.last;

document.body.addEventListener('touchmove', handleTouchMove, false);
document.body.addEventListener('touchend', handleTouchEnd, false);


function handleTouchMove(e) {
  var clientY = e.touches[0].clientY;

  e.preventDefault();

  // if prevY is not assinged a value, initialize it
  if (coord.prevY === undefined) {
    coord.prevY = clientY;
    coord.currSection.style.transform = 'translateY(0)';
    coord.currSection.style.opacity = 1;
    if (coord.last) {
      coord.last.style.opacity = 1;
      coord.last.style.bottom = '90px';
    }
  } else {
    // initialize prevDir and currDir
    if (coord.prevDir === undefined) {
      if (clientY > coord.prevY) {
        coord.prevDir = true;
        coord.currDir = true;
      } else if (clientY < coord.prevY) {
        coord.prevDir = false;
        coord.currDir = false;
      } else {}
    }

    // calculate touche moves
    coord.move = clientY - coord.prevY;

    coord.prevTrans = parseInt(coord.currSection.style.transform.substring(11));
    coord.currSection.style.transform =
      'translateY(' + (coord.prevTrans + coord.move) + 'px)';
    coord.currTrans = parseInt(coord.currSection.style.transform.substring(11));

    if (coord.last) {
      coord.last.style.bottom =
        parseInt(coord.last.style.bottom) - coord.move + 'px';
    }

    if (Math.abs(coord.currTrans) > Math.abs(coord.prevTrans)) {
      for (i = 0; i < Math.abs(coord.move); i++) {
        coord.currSection.style.opacity =
          parseFloat(coord.currSection.style.opacity) - coord.opacityStep;
        if (coord.last) {
          coord.last.style.opacity = parseFloat(coord.last.style.opacity) - coord.opacityStep;
        }
      }
    } else {
      for (i = 0; i < Math.abs(coord.move); i++) {
        coord.currSection.style.opacity =
          parseFloat(coord.currSection.style.opacity) + coord.opacityStep;
        if (coord.last) {
          coord.last.style.opacity = parseFloat(coord.last.style.opacity) + coord.opacityStep;
        }
      }
    }

    coord.prevY = clientY;
  }
}


function handleTouchStart(e) {
  // e.preventDefault();
}


function handleTouchEnd(e) {
  if (Math.abs(coord.currTrans) < 80) {
    coord.currSection.classList.add('section-return');
    if (coord.last) {
      coord.last.classList.add('call-me-return');
    }

    setTimeout(function() {
      coord.currSection.classList.remove('section-return');
      coord.currSection.style.transform = 'translateY(0)';
      coord.currSection.style.opacity = 1;
      if (coord.last) {
        coord.last.classList.remove('call-me-return');
        coord.last.classList.remove('slide-in-left');
        coord.last.style.bottom = '90px';
        coord.last.style.opacity = 1;
      }
    }, 500);
  } else {
    if (coord.currDir === false) {
      coord.currSection.classList.add('section-slide-up');
      if (coord.last) {
        coord.last.classList.add('call-me-slide-up');
      }

      setTimeout(function() {
        coord.currSection.classList.remove('section-slide-up');
        coord.currSection.style.transform = 'translateY(-100vh)';
        coord.currSection.style.opacity = 0;
        coord.currSection.style.display = 'none';
        if (coord.last) {
          coord.last.classList.remove('call-me-slide-up');
          coord.last.style.bottom = '100vh';
          coord.last.style.opacity = 0;
          coord.last.style.display = 'none';
          coord.last.classList.remove('slide-in-left');
        }
      }, 500);
      switchSectionForward();
    } else {
      coord.currSection.classList.add('section-slide-down');
      if (coord.last) {
        coord.last.classList.add('call-me-slide-down');
      }

      setTimeout(function() {
        coord.currSection.classList.remove('section-slide-down');
        coord.currSection.style.transform = 'translateY(100vh)';
        coord.currSection.style.opacity = 0;
        coord.currSection.style.display = 'none';
        if (coord.last) {
          coord.last.classList.remove('call-me-slide-down');
          coord.last.style.bottom = '-100vh';
          coord.last.style.opacity = 0;
          coord.last.style.display = 'none';
        }
      }, 500);
      switchSectionBackward();
    }
  }

  coord.prevY = undefined;
  coord.currTrans = 0;
  coord.prevTrans = 0;
  coord.currDir = undefined;
  coord.prevDir = undefined;
}


function switchSectionForward() {
  setTimeout(function() {
    // if thi is the last section
    if (coord.currSectionNo === coord.sections.length - 1) {
      coord.currSectionNo = 0;
      coord.currSection = coord.sections[coord.currSectionNo];
      coord.currSection.style.display = 'block';
      coord.currSection.style.transform = 'translateY(0)';
      coord.currSection.style.opacity = 1;
    } else {
      coord.currSectionNo += 1;
      coord.currSection = coord.sections[coord.currSectionNo];
      coord.currSection.style.display = 'block';
      coord.currSection.style.transform = 'translateY(0)';
      coord.currSection.style.opacity = 1;
    }

    if (coord.currSectionNo > 1) {
      coord.last = null;
    } else {
      coord.last = coord.lastElem;
    }

    if (coord.last) {
      coord.last.style.display = 'flex';
      coord.last.classList.add('slide-in-left');
      coord.last.style.bottom = '90px';
      coord.last.style.opacity = 1;
    }
  }, 500);

  if (coord.currSectionNo === 2) {
    setTimeout(function() {
      elem.gallery.style.transform = 'translateX(0)';
    }, 500);
  }
}


function switchSectionBackward() {
  setTimeout(function() {
    if (coord.currSectionNo === 0) {
      coord.currSectionNo = coord.sections.length - 1;
      coord.currSection = coord.sections[coord.currSectionNo];
      coord.currSection.style.display = 'block';
      coord.currSection.style.transform = 'translateY(0)';
      coord.currSection.style.opacity = 1;
    } else {
      coord.currSectionNo -= 1;
      coord.currSection = coord.sections[coord.currSectionNo];
      coord.currSection.style.display = 'block';
      coord.currSection.style.transform = 'translateY(0)';
      coord.currSection.style.opacity = 1;
    }

    if (coord.currSectionNo > 1) {
      coord.last = null;
    } else {
      coord.last = coord.lastElem;
    }

    if (coord.last) {
      coord.last.style.display = 'flex';
      coord.last.classList.add('slide-in-left');
      coord.last.style.bottom = '90px';
      coord.last.style.opacity = 1;
    }
  }, 500);

  if (coord.currSectionNo === 2) {
    setTimeout(function() {
      elem.gallery.style.transform = 'translateX(0)';
    }, 500);
  }
}


elem.gallery.style.transform = 'translateX(0)';

function handleGalleryMove(e) {
  clientX = e.touches[0].clientX;
  e.stopImmediatePropagation();
  e.preventDefault();

  if (gly.prevX === undefined) {
    gly.prevX = clientX;
    gly.currX = clientX;
  } else {
    gly.currX = clientX;
  }

  gly.move = gly.currX - gly.prevX;
  gly.prevTrans = parseInt(elem.gallery.style.transform.substring(11));
  elem.gallery.style.transform =
    'translateX(' + (gly.prevTrans + gly.move) + 'px)';
  gly.currTrans = parseInt(elem.gallery.style.transform.substring(11));

  gly.prevX = gly.currX;
}


function handleGalleryMoveEnd(e) {
  gly.endPt = gly.prevX;
  gly.dir = gly.endPt > gly.startPt ? true : false;
  showImg(findTargetImg(gly.dir));

  gly.prevX = undefined;
}


function handleGalleryMoveStart(e) {
  gly.startPt = e.touches[0].clientX;
  elem.gallery.style.transition = 'unset';
}

elem.gallery.addEventListener('touchmove', handleGalleryMove, false);
elem.gallery.addEventListener('touchend', handleGalleryMoveEnd, false);
elem.gallery.addEventListener('touchstart', handleGalleryMoveStart, false);


function findTargetImg(dir) {
  var rect = null;

  for (var i = 0, len = elem.galleryImg.length; i < len; i++) {
    rect = elem.galleryImg[i].getBoundingClientRect();

    if (i === 0 && rect.left > 0) {
      return 0;
    }

    if (i === len - 1 && rect.right < window.innerWidth) {
      return len - 1;
    }

    if (gly.dir) {

      if (rect.left < 0 && rect.right > 0) {

        return i === 0 ? 0 : i;
      }
    } else {
      if (rect.left < window.innerWidth && rect.right > window.innerWidth) {
        return i === len - 1 ? len - 1 : i;
      }
    }
  }
}

function showImg(index) {
  var move = index * 345;

  elem.gallery.style.transition = '0.4s';
  elem.gallery.style.transform = 'translateX(' + move * -1 + 'px)';
}


elem.shareBtn.addEventListener('click', function() {
  elem.shareBg.style.display = 'block';
}, false);


elem.shareBg.addEventListener('click', function() {
  elem.shareBg.style.display = 'none';
}, false);
