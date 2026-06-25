(function () {
    if (window.__pepperedMobileMenu) return;

    var scrollY = 0;
    var overlay = null;
    var touchBlocker = null;

    function isMobileMenuViewport() {
        return window.matchMedia("(max-width: 767px)").matches;
    }

    function preventTouchMove(event) {
        event.preventDefault();
    }

    function ensureOverlay() {
        if (overlay && overlay.isConnected) return overlay;
        overlay = document.createElement("div");
        overlay.id = "peppered-menu-overlay";
        overlay.setAttribute("aria-hidden", "true");
        document.documentElement.appendChild(overlay);
        return overlay;
    }

    function lockMenuScroll() {
        if (!isMobileMenuViewport()) return;
        if (document.documentElement.classList.contains("mobile-menu-active")) return;

        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.classList.add("mobile-menu-active", "stop-scrolling");
        ensureOverlay().classList.add("is-visible");

        touchBlocker = preventTouchMove;
        document.addEventListener("touchmove", touchBlocker, { passive: false });
    }

    function unlockMenuScroll() {
        var el = document.getElementById("peppered-menu-overlay");
        if (el) {
            el.classList.remove("is-visible");
        }

        document.documentElement.classList.remove("mobile-menu-active", "stop-scrolling");

        if (touchBlocker) {
            document.removeEventListener("touchmove", touchBlocker, { passive: false });
            touchBlocker = null;
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
            void document.documentElement.offsetHeight;
            requestAnimationFrame(function () {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                overlay = null;
            });
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
})();
