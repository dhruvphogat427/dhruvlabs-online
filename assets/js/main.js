/**
 * DhruvLabs — progressive-enhancement only.
 * The page is fully usable with this file absent: nav uses <details>, links
 * use native anchors, layout needs no JS, and all animated content is visible
 * by default (motion is only layered on when JS + capable device + motion-OK).
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------------------
     Sticky nav shadow
  --------------------------------------------------------------------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Close mobile nav after a link is tapped
  --------------------------------------------------------------------- */
  var mobileNav = document.querySelector(".nav-mobile");
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.removeAttribute("open");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     Content is visible by default. We only opt into the hidden→shown
     animation when JS runs, motion is allowed, and IntersectionObserver
     exists. Multiple failsafes guarantee nothing can stay hidden.
  --------------------------------------------------------------------- */
  var revealEls = [].slice.call(document.querySelectorAll("[data-reveal]"));

  function revealAll() {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      root.classList.add("anim-ready");

      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
      );

      revealEls.forEach(function (el) {
        io.observe(el);
      });

      // Safety net only: the observer reveals content as it scrolls into
      // view (the intended effect). This hard cap exists solely so nothing
      // can ever stay hidden if the observer misbehaves — it's long enough
      // not to interfere with normal scrolling.
      setTimeout(revealAll, 8000);
    }
  }

  /* ---------------------------------------------------------------------
     3D tilt (desktop, motion-OK only)
     Cards lean toward the cursor using CSS custom properties consumed by
     the stylesheet. Uses rAF so mousemove never thrashes layout.
  --------------------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    var tiltEls = [].slice.call(document.querySelectorAll("[data-tilt]"));
    var MAX = 6; // degrees

    tiltEls.forEach(function (el) {
      var frame = null;

      el.addEventListener("mousemove", function (e) {
        if (frame) return;
        frame = requestAnimationFrame(function () {
          frame = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", (px * MAX).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-py * MAX).toFixed(2) + "deg");
        });
      });

      el.addEventListener("mouseleave", function () {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      });
    });

    /* -------------------------------------------------------------------
       Magnetic buttons — subtle pull toward the cursor
    ------------------------------------------------------------------- */
    var magnetEls = [].slice.call(document.querySelectorAll("[data-magnet]"));
    var PULL = 0.25;

    magnetEls.forEach(function (el) {
      var frame = null;

      el.addEventListener("mousemove", function (e) {
        if (frame) return;
        frame = requestAnimationFrame(function () {
          frame = null;
          var r = el.getBoundingClientRect();
          var mx = (e.clientX - r.left - r.width / 2) * PULL;
          var my = (e.clientY - r.top - r.height / 2) * PULL;
          el.style.transform = "translate(" + mx.toFixed(1) + "px," + my.toFixed(1) + "px)";
        });
      });

      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }
})();
