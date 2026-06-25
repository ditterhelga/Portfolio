(function () {
    if (window.__pepperedMobileMenu) return;

    var scrollY = 0;
    var touchBlocker = null;

    function isMobileMenuViewport() {
        return window.matchMedia("(max-width: 767px)").matches;
    }

    function preventTouchMove(event) {
        event.preventDefault();
    }

    function ensureBackdrop() {
        var backdrop = document.getElementById("peppered-menu-backdrop");
        if (backdrop) return backdrop;

        backdrop = document.createElement("div");
        backdrop.id = "peppered-menu-backdrop";
        backdrop.setAttribute("aria-hidden", "true");
        document.documentElement.appendChild(backdrop);
        return backdrop;
    }

    function showBackdrop() {
        ensureBackdrop().classList.add("is-active");
    }

    function hideBackdrop() {
        var backdrop = document.getElementById("peppered-menu-backdrop");
        if (!backdrop) return;
        backdrop.classList.remove("is-active");

        // Keep the node in the DOM (see mobile-menu.css). Nudge a transform on
        // the backdrop's own layer to force iOS Safari to re-tile the regions it
        // covered, so no blue ghost strips remain in the top/bottom toolbar areas.
        backdrop.style.transform = "translateZ(0)";
        void backdrop.offsetHeight;
        requestAnimationFrame(function () {
            backdrop.style.transform = "";
        });
    }

    function lockMenuScroll() {
        if (!isMobileMenuViewport()) return;
        if (document.documentElement.classList.contains("stop-scrolling")) return;

        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.classList.add("stop-scrolling");

        touchBlocker = preventTouchMove;
        document.addEventListener("touchmove", touchBlocker, { passive: false });
    }

    function unlockMenuScroll() {
        document.documentElement.classList.remove("stop-scrolling");

        if (touchBlocker) {
            document.removeEventListener("touchmove", touchBlocker, { passive: false });
            touchBlocker = null;
        }

        requestAnimationFrame(function () {
            window.scrollTo(0, scrollY);
        });
    }

    function openMobileMenu(header, menuTween) {
        showBackdrop();
        if (header) header.classList.add("menu-open");
        lockMenuScroll();
        if (menuTween) menuTween.restart();
    }

    function closeMobileMenu(header, menuTween) {
        if (menuTween) menuTween.reverse();
        if (header) header.classList.remove("menu-open");
        hideBackdrop();
        unlockMenuScroll();
    }

    window.pepperedOpenMobileMenu = openMobileMenu;
    window.pepperedCloseMobileMenu = closeMobileMenu;
    window.__pepperedMobileMenu = true;
})();
