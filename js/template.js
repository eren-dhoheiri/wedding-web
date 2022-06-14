/* 
    ++++++++++ ATTENTION!!! ++++++++++
    Before including this file
    make sure if your had included JQUERY too
*/

/*  ================================================
    GENERAL CONFIGURATION
============================================= */

// ---------- Start Your Journey (Function) --------------------------------------------------
function startTheJourney() {
  $('.top-cover').eq(0).addClass('hide');
  $('body').eq(0).css('overflow', 'visible');

  playMusicOnce();

  setTimeout(function () {
    // Looping the aos animate
    $('.aos-animate').each(function (i, el) {
      // If the parent is not 'Top Cover'
      if ($(el).closest('.top-cover').length == 0) {
        // Remove 'aos-animate' class
        $(el).removeClass('aos-animate');
        setTimeout(function () {
          // Add 'aos-amimate' class
          $(el).addClass('aos-animate');
        }, 1000);
      }
    });
  }, 50);

  setTimeout(function () {
    $('.top-cover').eq(0).remove();
  }, 3000);
}

// Sendto
const params = new URL(document.location).searchParams;
const SendTo = params.get('to');
if (SendTo) {
  document.getElementById('send-to').innerHTML +=
    '<p>Hi, ' +
    SendTo +
    '! You are invited to celebrate our special day! </p><br/>';
} else {
  document.getElementById('send-to').innerHTML +=
    '<p>Hi!' + ' You are invited to celebrate our special day! </p><br/>';
}

if (SendTo) {
  document.getElementById('confrim-rsvp').innerHTML +=
    '<p>Hi, ' +
    SendTo +
    '! We loved to invited you, will you attend to our special day?</p><br/>';
} else {
  document.getElementById('confirm-rsvp').innerHTML +=
    '<p>Hi!' +
    ' We loved to invited you, will you attend to our special day?</p><br/>';
}

// ---------- ALERT --------------------------------------------------
var $alert = $('#alert'); // alert
var $alertClose = $('#alert .alert-close'); // alert close
var $alertText = $('#alert .alert-text'); // Alert Text

// ---------- Hide Alert (Function) --------------------------------------------------
function hideAlert() {
  $alert.removeClass(); // Remove All Class
  $alert.addClass('alert hide'); // hiding alert
}

// ---------- Show Alert (Function) --------------------------------------------------
function showAlert(message, status) {
  if (status != '') {
    $alert.removeClass(); // Remove All Class
    $alert.addClass('alert show ' + status);
    $alertText.text(message);
    setTimeout(hideAlert, 3000);
  }
}

// ---------- MODAL ---------------------------------------------------------------------------------
var $modal = $('#modal');
var $modalContents = $('.modal-content');

// ---------- Open Modal (Function) --------------------------------------------------
function openModal() {
  $modal.html('');
  if ($modal.css('display') == 'none') {
    $modal.css('display', 'flex');
  }
  $modalContents.each(function (i, modal) {
    $(modal).hide();
  });
  $('html').css('overflow', 'hidden');
}

// ---------- Close Modal (Function) --------------------------------------------------
function closeModal() {
  if ($modal.css('display') == 'flex') {
    $modal.css('display', 'none');
  }
  $('html').css('overflow', 'scroll');
  $modal.html('');
}

// ---------- Close Modal [ON CLICK] --------------------------------------------------
$(document).on('click', '.close-modal', closeModal);

// ---------- Copy to  (Function) --------------------------------------------------
function copyToClipboard(text) {
  var dummy = document.createElement('textarea');
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". â€“ Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  showAlert('Berhasil di salin ke papan klip', 'success');
}

// ---------- URLify  (Function) --------------------------------------------------
function urlify(text) {
  var lineBreak = '';
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    var finalURL = url;
    if (url.indexOf('<br>') > -1) {
      finalURL = url.replace(/<br>/g, '');
      lineBreak = '<br>';
    }
    return (
      '<a href="' +
      finalURL +
      '" target="_blank">' +
      finalURL +
      '</a>' +
      lineBreak
    );
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

// ---------- Copy Account [ON CLICK] ---------------------------------------------------------------
$(document).on('click', '.copy-account', function (e) {
  e.preventDefault();
  var book = $(this).closest('.book');
  var number = $(book).find('.account-number');
  copyToClipboard(number.html());
});

// ---------- Number Format (Variables) ---------------------------------------------------------------
var numberFormat = new Intl.NumberFormat('ID', {
  // style: 'currency',
  // currency: 'IDR',
});

// ---------- Disabled Dragging an image [ON DRAGSTART] -----------------------------------------------
$('img').on('dragstart', function (e) {
  e.preventDefault();
});

// ---------- Textarea [ON KEY, FOCUS] -----------------------------------------------------------------
$(document)
  .on('keyup focus', 'textarea', function (e) {
    e.preventDefault();
    this.style.height = '1px';
    this.style.height = this.scrollHeight + 'px';
  })
  .on('focusout', 'textarea', function (e) {
    e.preventDefault();
    this.style.height = 24 + 'px';
  });

/*  ==============================
      COVERS
============================== */
// ---------- Slider Options (Function) --------------------------------------------------
function sliderOptions() {
  return {
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    dots: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    draggable: false,
    touchMove: false
  };
}

// Is Cover Played
var isCoverPlayed = false;

// COVER CONFIGURATION
(function coverConfiguration() {
  var windowWidth = $(window).width(), // Window Width
    smallScreen = window.matchMedia('(max-width: 1024px)'); // Small screen

  // If width matched
  if (windowWidth > '1020' && windowWidth < '1030') {
    isCoverPlayed = false; // cover is not played
  }

  // COVERS
  if (typeof window.COVERS != 'undefined') {
    // COVERS LOOP
    $(window.COVERS).each(function (i, cover) {
      var position = cover.position, // position
        details = cover.details, // details
        element = cover.element, // element
        coverInner = $(element).closest('.cover-inner'); // Cover Inner

      // If element does exist
      if ($(element).length > 0) {
        // if the position is MAIN
        if (position == 'MAIN') {
          // COVERS
          // If Cover Inner does exist
          if (coverInner.length) {
            $(coverInner).removeClass('covers'); // Remove class 'covers'
            if (details.desktop != '' || details.mobile != '') {
              $(coverInner).addClass('covers'); // Add Class to cover-inner
            }
          }
        }

        // if cover has been slicked
        if ($(element).hasClass('slick-initialized')) {
          $(element).slick('unslick'); // stop the slider
        }
        $(element).html(''); // empty element

        // if the small screen does not match (DESKTOP SIZE)
        if (!smallScreen.matches) {
          // if cover desktop is not empty
          if (details.desktop != '') {
            // if the position is MAIN and the cover is not played
            if (position == 'MAIN' && !isCoverPlayed) {
              isCoverPlayed = true; // Played the cover
            }

            $(element).append(details.desktop); // Append new cover elements into cover
            $(element).slick(sliderOptions()); // Start the slider
            if (coverInner.length)
              $(coverInner).removeClass('mobile').addClass('desktop'); // Add class desktop
          }
        } else {
          // the screen is small (MOBILE SIZE)
          // if cover desktop is not empty
          if (details.mobile != '') {
            // if the position is MAIN and the cover is not played
            if (position == 'MAIN' && !isCoverPlayed) {
              isCoverPlayed = true; // Played the cover
            }

            $(element).append(details.mobile); // Append new cover elements into cover
            $(element).slick(sliderOptions()); // Start the slider
            if (coverInner.length)
              $(coverInner).removeClass('desktop').addClass('mobile'); // Add class desktop
          }
        }
      }
    });
  }
})();

/*  ================================================
  SAVE THE DATE
============================================= */
// ----------- COUNTDOWN (Function) ------------------------------------------------------
(function countdown() {
  if (typeof window.EVENT != 'undefined') {
    // var schedule = window.EVENT,
    // event = new Date(schedule * 1000).getTime(),
    // change date
    event = new Date(2022, 06, 02, 24, 0, 0, 0);
    start = setInterval(rundown, 1000);

    // Rundown
    function rundown() {
      var now = new Date().getTime(),
        distance = event - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24)), // days
        hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ), // hours
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), // minutes
        seconds = Math.floor((distance % (1000 * 60)) / 1000); // seconds

      if (distance < 0) {
        clearInterval(start);
        $('.count-day').text('0');
        $('.count-hour').text('0');
        $('.count-minute').text('0');
        $('.count-second').text('0');
      } else {
        $('.count-day').text(days);
        $('.count-hour').text(hours);
        $('.count-minute').text(minutes);
        $('.count-second').text(seconds);
      }
    }
  }
})();

/*  ==============================
      MUSIC
============================== */
var isMusicAttemptingToPlay = false,
  isMusicPlayed = false,
  playBoxAnimation,
  pauseBoxAnimation,
  pauseMusic,
  playMusic;

// Background Music
(function backgroundMusic() {
  if (typeof window.MUSIC != 'undefined') {
    // var url = window.MUSIC.url,
    //   box = window.MUSIC.box;
    // change music
    // var url =
    //   'https:katsudoto.id/media/audio/2cab8feb648205b673eaa3aed9b46da8b964b24a8d97a416e3c22e88d78a74cb.mp3';
    const url =
      'https://katsudoto.id/media/audio/Ardhito-Pramono-First-Love.mp3';
    var box = window.MUSIC.box;

    // if url is not empty and the box so
    if (url != '' && box.length) {
      var backgroundMusic = document.createElement('audio'); // Background Music
      backgroundMusic.autoplay = true;
      backgroundMusic.loop = true;
      backgroundMusic.load();
      backgroundMusic.src = url;

      console.log(url);

      // ---------- Playing Box Animation (Function) --------------------------------------------------
      playBoxAnimation = function () {
        if (!$(box).hasClass('playing')) {
          $(box).addClass('playing');
        }
        if ($(box).css('animationPlayState') != 'running') {
          $(box).css('animationPlayState', 'running');
        }
      };

      // ---------- Pause Box Animation (Function) --------------------------------------------------
      pauseBoxAnimation = function () {
        if ($(box).hasClass('playing')) {
          if ($(box).css('animationPlayState') == 'running') {
            $(box).css('animationPlayState', 'paused');
          }
        }
      };

      // ---------- Pause Music (Function) --------------------------------------------------
      pauseMusic = function () {
        isMusicAttemptingToPlay = false;
        var promise = backgroundMusic.pause();
        isMusicPlayed = false;
        pauseBoxAnimation();
      };

      // ---------- Play Music (Function) --------------------------------------------------
      playMusic = function () {
        isMusicAttemptingToPlay = false;
        var promise = backgroundMusic.play();
        if (promise !== undefined) {
          promise
            .then(_ => {
              isMusicPlayed = true;
              // console.log('Audio berhasil diputar');
              playBoxAnimation();
            })
            .catch(error => {
              isMusicPlayed = false;
              // console.log('Tidak dapat memutar audio');
              pauseBoxAnimation();
            });
        }
      };

      // ---------- Music Box [ON CLICK] --------------------------------------------------
      $(document).on('click', box, function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (isMusicPlayed) {
          pauseMusic();
          isMusicAttemptingToPlay = true;
        } else {
          playMusic();
        }
      });

      // Is Box Hidden?
      var prevScrollpos = window.pageYOffset;
      var isBoxHidden = false;
      var boxTimeout;

      // Window On Scroll
      window.addEventListener(
        'scroll',
        function (e) {
          var currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
            // Show Music Box
            $(box).removeClass('hide'); // Showing the box
            isBoxHidden = false; // Box is not hidden
          } else {
            // Hide Music Box
            $(box).addClass('hide'); // Hiding the box
            if (!isBoxHidden) isBoxHidden = true; // Box is hidden
          }
          prevScrollpos = currentScrollPos;

          if (isBoxHidden) {
            clearTimeout(boxTimeout); // Clear Timeout
            boxTimeout = setTimeout(function () {
              // Show Music Box Back
              $(box).removeClass('hide'); // Show Music Box
            }, 5000);
          } else {
            clearTimeout(boxTimeout); // Clear Timeout
          }
        },
        false
      );

      // Window On Load
      window.onload = function () {
        if (!isMusicAttemptingToPlay && !isMusicPlayed) {
          isMusicAttemptingToPlay = true;
          playMusicOnce();
        }
      };
    }
  }
})();

// ---------- Play Music Once --------------------------------------------------
function playMusicOnce() {
  playMusic();
  setTimeout(function () {
    if (isMusicPlayed) {
      pauseMusic();
      setTimeout(playMusic, 1500);
    }
  }, 50);
}

// ---------- Trigger Music to play when document is scroled or clicked --------------------------------------------------
$(document).on('click', function (e) {
  if (!isMusicAttemptingToPlay && !isMusicPlayed) {
    isMusicAttemptingToPlay = true;
    playMusicOnce();
  }
});

$('.top-cover').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

// ---------- Pause Audio When Click Video ---------------------------------------------------------------
$(document).on('click', '.play-btn', function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (isMusicPlayed) {
    pauseMusic();
    isMusicAttemptingToPlay = true;
  }
});

/*  ==============================
      PROTOCOL
============================== */
(function protocolConfiguration() {
  // if protocol is not undefined
  if (typeof window.PROTOCOL != 'undefined') {
    var protocolSlider = window.PROTOCOL.slider,
      protocolDots = window.PROTOCOL.dots;

    var protocolOptions = {
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      variableWidth: true,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 700,
      cssEase: 'ease-in-out',
      dots: false,
      arrows: false,
      asNavFor: protocolDots,
      pauseOnFocus: false,
      pauseOnHover: false,
      draggable: true,
      // touchMove: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    var protocolDotsOptions = {
      centerMode: true,
      variableWidth: true,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 700,
      cssEase: 'ease-in-out',
      dots: false,
      arrows: false,
      asNavFor: protocolSlider,
      pauseOnFocus: false,
      pauseOnHover: false,
      draggable: true
    };

    if ($(protocolSlider).hasClass('slick-initialized'))
      $(protocolSlider).slick('unslick'); // unslick the slider
    if ($(protocolDots).hasClass('slick-initialized'))
      $(protocolDots).slick('unslick'); // Unslick the dots

    $(protocolSlider).slick(protocolOptions); // slick the slider
    $(protocolDots).slick(protocolDotsOptions); // slick the dots

    // Before Change
    $(protocolSlider).on(
      'beforeChange',
      function (event, slick, currentSlide, nextSlide) {
        if (nextSlide == 0) {
          var cls =
            'slick-current slick-active' +
            (protocolOptions.centerMode ? ' slick-center' : '');

          setTimeout(function () {
            $('[data-slick-index="' + slick.$slides.length + '"]')
              .addClass(cls)
              .siblings()
              .removeClass(cls);
            for (
              var i = slick.options.slidesToShow - slick.options.slidesToShow;
              i >= 0;
              i--
            ) {
              $('[data-slick-index="' + i + '"]').addClass(cls);
            }
          }, 10);
        }
      }
    );
  }
})();

/*  ==============================
      GALLERY SLIDER SYNCING
============================== */
// SLIDER SYNCING
function startSliderSyncing() {
  if (
    $('.slider-syncing__preview').length &&
    $('.slider-syncing__nav').length
  ) {
    var sliderSyncingPreviewOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-syncing__nav'
    };
    var sliderSyncingNavOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.slider-syncing__preview',
      arrows: false,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      speed: 750,
      variableWidth: true,
      infinite: true
    };

    var sliderSyncingPreview = $('.slider-syncing__preview');
    var sliderSyncingNav = $('.slider-syncing__nav');

    if ($(sliderSyncingPreview).hasClass('slick-initialized'))
      $(sliderSyncingPreview).slick('unslick');
    if ($(sliderSyncingNav).hasClass('slick-initialized'))
      $(sliderSyncingNav).slick('unslick');

    $(sliderSyncingPreview).slick(sliderSyncingPreviewOptions);
    $(sliderSyncingNav).slick(sliderSyncingNavOptions);
  }
}

// SINGLE SLIDER
function gallerySingleSlider() {
  if (
    typeof window.GALLERY_SINGLE_SLIDER != 'undefined' &&
    window.GALLERY_SINGLE_SLIDER === true
  ) {
    var singleSliderContainer = $('#singleSliderContainer'); // Single Slider Container

    if (singleSliderContainer.length) {
      var singleSliderOptions = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        speed: 300,
        variableWidth: true,
        infinite: false,
        touchThreshold: 1000,
        swipeToSlide: false
      };

      if ($(singleSliderContainer).hasClass('slick-initialized'))
        $(singleSliderContainer).slick('unslick'); //  Unslick if it has initialized
      var singleSlider = $(singleSliderContainer).slick(singleSliderOptions); // Start new slider

      // Single Slider On Wheel
      singleSlider.on('wheel', function (e) {
        e.preventDefault();

        if (e.originalEvent.deltaY > 0) {
          $(this).slick('slickNext');
        } else {
          $(this).slick('slickPrev');
        }
      });

      // is Sliding
      var isSliding = false;

      // Before Change
      $(singleSliderContainer).on(
        'beforeChange',
        function (event, slick, currentSlide, nextSlide) {
          isSliding = true;

          if (nextSlide == 0) {
            var cls =
              'slick-current slick-active' +
              (singleSliderOptions.centerMode ? ' slick-center' : '');

            if (singleSliderOptions.infinite === true) {
              setTimeout(function () {
                $('[data-slick-index="' + slick.$slides.length + '"]')
                  .addClass(cls)
                  .siblings()
                  .removeClass(cls);
                for (
                  var i =
                    slick.options.slidesToShow - slick.options.slidesToShow;
                  i >= 0;
                  i--
                ) {
                  $('[data-slick-index="' + i + '"]').addClass(cls);
                }
              }, 10);
            }
          }
        }
      );

      // After Change
      $(singleSliderContainer).on(
        'afterChange',
        function (event, slick, currentSlide) {
          isSliding = false;
        }
      );

      // Prevent Trigger Clicking While Swiping
      singleSlider.find('.singleSliderPicture > .anchor').click(function (e) {
        if (isSliding) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      });

      // Single Slider Picture
      $(singleSliderContainer)
        .find('.singleSliderPicture')
        .each(function (i, picture) {
          var width = $(this).width();
          var height = width + width / 3;

          $(picture).css('--width', width + 'px');
          $(picture).css('--height', height + 'px');
        });
    }
  }
}

/*  ==============================
      OTHERS
============================== */
// ---------- Modal Video ---------------------------------------------------------------
$('.play-btn').modalVideo({
  youtube: {
    autoplay: 1,
    cc_load_policy: 1,
    color: null,
    controls: 1,
    disableks: 0,
    enablejsapi: 0,
    end: null,
    fs: 1,
    h1: null,
    iv_load_policy: 1,
    // list: null,
    listType: null,
    loop: 0,
    modestbranding: null,
    mute: 0,
    origin: null,
    // playlist: null,
    playsinline: null,
    rel: 0,
    showinfo: 1,
    start: 0,
    wmode: 'transparent',
    theme: 'dark',
    nocookie: false
  }
});

// ---------- AOS (Animation) ------------------------------------------------------
var AOSOptions = {
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 10, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
};

// Run AOS on Load
$(window).on('load', function () {
  AOS.refresh();
});

$(function () {
  AOS.init(AOSOptions);
});

$(window).on('scroll', function () {
  AOS.init(AOSOptions);
});

// ---------- LIGHT GALLERY --------------------------------------------------
$(function () {
  lightGallery(document.getElementById('lightGallery'), {
    download: false
  });

  showGalleries();
});

// SHOW GALLERY
function showGalleries() {
  $('.lightgallery').each(function (i, gallery) {
    lightGallery(gallery, {
      download: false
    });
  });
}

/*  ================================================
      DOCUMENT [ON READY]
============================================= */
$(document).ready(function () {
  // ---------- URLify --------------------------------------------------
  $('p').each(function (i, el) {
    el.innerHTML = urlify(el.innerHTML);
  });

  // ---------- Make Textarea getting small --------------------------------------------------
  $.each($('textarea'), function (i, textarea) {
    textarea.style.height = '1px';
  });

  // ---------- Checking the Quantity Control value --------------------------------------------------
  $('[data-quantity="control"]').each(function (i, input) {
    var max = $(input).prop('max');
    var value = $(input).val();
    if (value > max) {
      $(input).val(max);
    }
  });

  // ---------- Check nominal (Wedding Gift) value --------------------------------------------------
  $('[name="nominal"]').each(function (i, el) {
    if ($(el).is(':checked')) {
      if ($(this).val() <= 0) {
        $('.insert-nominal').slideDown();
        $('.insert-nominal').find('[name="inserted_nominal"]').focus();
      }
    }
  });

  // ---------- Show or Hide Saving Books --------------------------------------------------
  var select = $('select[name="choose_bank"]');
  if (select.length) {
    chooseBank($(select).val());
  }

  // ---------- Attendance Toggling --------------------------------------------------
  $.each($('input[name="attendance"]'), function (i, input) {
    attendanceToggle(input);
  });

  // ---------- RSVP INNER --------------------------------------------------
  var rsvpInner = $('.rsvp-inner');
  if ($(rsvpInner).hasClass('come')) {
    // If RSVP Inner has 'come' class
    $(rsvpInner).find('.rsvp-form').fadeOut();
    $(rsvpInner).find('.rsvp-confirm').fadeIn();
  }
  if ($(rsvpInner).hasClass('not-come')) {
    // If RSVP Inner has 'not-come' class
    $(rsvpInner).find('.rsvp-form').fadeOut();
    $(rsvpInner).find('.rsvp-confirm').fadeIn();
  }
  if ($(rsvpInner).hasClass('no-news')) {
    // If RSVP Inner has 'no-news' class
    $(rsvpInner).find('.rsvp-form').fadeIn();
    $(rsvpInner).find('.rsvp-confirm').fadeOut();
  }
});
