(function () {
    if (window.__pepperedMobileMenu) return;

    var scrollY = 0;
    var overlay = null;

    function getOverlay() {
        if (overlay && overlay.isConnected) return overlay;
        overlay = document.createElement("div");
        overlay.id = "peppered-menu-overlay";
        overlay.setAttribute("aria-hidden", "true");
        document.body.appendChild(overlay);
        return overlay;
    }

    function lockMenuScroll() {
        if (document.documentElement.classList.contains("stop-scrolling")) return;
        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.classList.add("stop-scrolling");
        document.documentElement.style.position = "fixed";
        document.documentElement.style.top = "-" + scrollY + "px";
        document.documentElement.style.left = "0";
        document.documentElement.style.right = "0";
        document.documentElement.style.width = "100%";
        getOverlay().classList.add("is-visible");
    }

    function unlockMenuScroll() {
        var el = document.getElementById("peppered-menu-overlay");
        if (el) el.classList.remove("is-visible");

        document.documentElement.classList.remove("stop-scrolling");
        document.documentElement.style.position = "";
        document.documentElement.style.top = "";
        document.documentElement.style.left = "";
        document.documentElement.style.right = "";
        document.documentElement.style.width = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        window.scrollTo(0, scrollY);
    }

    window.pepperedLockMenuScroll = lockMenuScroll;
    window.pepperedUnlockMenuScroll = unlockMenuScroll;
    window.__pepperedMobileMenu = true;
})();
