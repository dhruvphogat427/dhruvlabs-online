/**
 * DhruvLabs — progressive-enhancement only.
 * Every feature here is optional: the page is fully usable, readable and
 * navigable with this file absent (nav uses <details>, links use native
 * anchors, layout needs no JS).
 */
(function () {
  "use strict";

  // Sticky nav shadow once the page has scrolled past the top.
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Close the mobile nav disclosure after a link is tapped.
  var mobileNav = document.querySelector(".nav-mobile");
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.removeAttribute("open");
      });
    });
  }
})();
