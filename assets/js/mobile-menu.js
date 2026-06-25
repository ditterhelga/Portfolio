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
        if (document.documentElement.classList.contains("mobile-menu-active")) return;

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

        var staleOverlay = document.getElementById("peppered-menu-overlay");
        if (staleOverlay && staleOverlay.parentNode) {
            staleOverlay.parentNode.removeChild(staleOverlay);
        }

        document.documentElement.style.position = "";
        document.documentElement.style.top = "";
        document.documentElement.style.left = "";
        document.documentElement.style.right = "";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";
        document.documentElement.style.backgroundColor = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";

        requestAnimationFrame(function () {
            window.scrollTo(0, scrollY);
            window.scrollTo(0, scrollY + 1);
            window.scrollTo(0, scrollY);
            void document.documentElement.offsetHeight;
        });
    }

    function openMobileMenu(header, menuTween) {
        if (header) header.classList.add("menu-open");
        if (menuTween) menuTween.restart();
        lockMenuScroll();
    }

    function closeMobileMenu(header, menuTween) {
        if (header) header.classList.remove("menu-open");
        unlockMenuScroll();
        if (menuTween) menuTween.reverse();
    }

    window.pepperedLockMenuScroll = lockMenuScroll;
    window.pepperedUnlockMenuScroll = unlockMenuScroll;
    window.pepperedOpenMobileMenu = openMobileMenu;
    window.pepperedCloseMobileMenu = closeMobileMenu;
    window.__pepperedMobileMenu = true;

    var staleOverlay = document.getElementById("peppered-menu-overlay");
    if (staleOverlay && staleOverlay.parentNode) {
        staleOverlay.parentNode.removeChild(staleOverlay);
    }
})();
