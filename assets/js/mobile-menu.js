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

    function lockMenuScroll() {
        if (!isMobileMenuViewport()) return;
        if (document.documentElement.classList.contains("stop-scrolling")) return;

        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.classList.add("mobile-menu-active", "stop-scrolling");

        touchBlocker = preventTouchMove;
        document.addEventListener("touchmove", touchBlocker, { passive: false });
    }

    function unlockMenuScroll() {
        document.documentElement.classList.remove("mobile-menu-active", "stop-scrolling");

        if (touchBlocker) {
            document.removeEventListener("touchmove", touchBlocker, { passive: false });
            touchBlocker = null;
        }

        requestAnimationFrame(function () {
            window.scrollTo(0, scrollY);
        });
    }

    function repaintViewport() {
        document.documentElement.style.backgroundColor = "#ffffff";
        document.body.style.backgroundColor = "#ffffff";
        void document.documentElement.offsetHeight;
        requestAnimationFrame(function () {
            document.documentElement.style.backgroundColor = "";
            document.body.style.backgroundColor = "";
        });
    }

    function openMobileMenu(header, menuTween) {
        if (header) header.classList.add("menu-open");
        if (menuTween) menuTween.restart();
        lockMenuScroll();
    }

    function closeMobileMenu(header, menuTween) {
        if (menuTween) menuTween.reverse();
        if (header) {
            header.style.backgroundColor = "#ffffff";
            header.classList.remove("menu-open");
            requestAnimationFrame(function () {
                header.style.backgroundColor = "";
            });
        }
        unlockMenuScroll();
        repaintViewport();
    }

    window.pepperedLockMenuScroll = lockMenuScroll;
    window.pepperedUnlockMenuScroll = unlockMenuScroll;
    window.pepperedOpenMobileMenu = openMobileMenu;
    window.pepperedCloseMobileMenu = closeMobileMenu;
    window.__pepperedMobileMenu = true;
})();
