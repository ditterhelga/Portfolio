(function () {
    if (window.__pepperedMobileMenu) return;

    var scrollY = 0;

    function lockMenuScroll() {
        if (document.documentElement.classList.contains("stop-scrolling")) return;
        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.documentElement.classList.add("stop-scrolling");
        document.body.style.position = "fixed";
        document.body.style.top = "-" + scrollY + "px";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
    }

    function unlockMenuScroll() {
        if (!document.documentElement.classList.contains("stop-scrolling")) return;
        document.documentElement.classList.remove("stop-scrolling");
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
