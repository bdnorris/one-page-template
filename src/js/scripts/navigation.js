import ScrollTrigger from "@terwanerik/scrolltrigger";
// https://github.com/terwanerik/ScrollTrigger

var directionChangeCounter = 1;

var navigation = document.getElementById('site-navigation');

export default () => {

  const animationTrigger = new ScrollTrigger({
    trigger: {
      once: true,
      offset: {
        viewport: {
          y: (trigger, frame, direction) => {
            return trigger.visible ? 0 : 0.5;
          }
        }
      },
      toggle: {
        class: {
          in: 'visible', // Either a string, or an array of strings
          out: ['invisible', 'extraClassToToggleWhenHidden']
        }
      }
    }
  });
  animationTrigger.add('[data-trigger]');

  const navigationTrigger = new ScrollTrigger({
    trigger: {
      once: false,
      offset: {
        element: {
          y: (trigger, frame, direction) => {
            // console.log(direction);
            return direction === 'top' ? 1 : 0;
          }
        },
        viewport: {
          y: (trigger, frame, direction) => {
            // console.log(direction);
            return direction === 'bottom' ? trigger.visible ? 0 : 0.666 : 0;
          }
        }
      },
      toggle: {
        class: {
          in: "visible--nav", // Either a string, or an array of strings
          out: ["invisible--nav"]
        },
        callback: {
          visible: () => {
            checkNav();
          },
          out: () => {
            checkNav();
          }
        }
      }
    },
    scroll: {
      directionChange: (trigger) => {
        if (directionChangeCounter % 2 === 0) {
          // even = up
          // console.log('direction change', 'up')
          // toggleNav('up');
        } else {
          // odd = down
          // console.log('direction change', 'down')
          // toggleNav('down');
        }
        directionChangeCounter++;
      }
    }
  });

  navigationTrigger.add('[data-trigger]')

  const navItems = document.querySelectorAll('#site-navigation ul > li > a');

  function toggleNav(direction) {
    if (direction === 'up') {
      navigation.classList.remove('hide');
    } else {
      navigation.classList.add('hide');
    }
  }
  
  function checkNav() {
    console.log('checking')
    const visibleBands = document.querySelectorAll(".band.visible--nav");
    if (visibleBands.length > 0) {
      visibleBands.forEach(b => {
        navItems.forEach(n => {
          if (b.id === n.href.split('#')[1]) {
            n.classList.add('is-visible');
          } else {
            n.classList.remove('is-visible');
          }
        })
      })
    } else {
      navItems.forEach(n => {
        n.classList.remove('is-visible');
      })
    }
  }

  // window.addEventListener("scroll", scrollWatcher);
  window.addEventListener("resize", resizeWatcher);

  // function scrollWatcher() {
  //   requestAnimationFrame(checkNav);
  // }
  function resizeWatcher() {
    requestAnimationFrame(checkNav);
  }
};