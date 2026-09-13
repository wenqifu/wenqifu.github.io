$(document).ready(function () {
  // Reuse decoded local GIFs as still previews, without introducing another media library.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll('.publication-media img.preview[src$=".gif"]').forEach((img) => {
    const animatedSource = img.src;
    if (new URL(animatedSource).origin !== location.origin) return;
    const initialize = () => {
      if (!img.naturalWidth) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      let stillSource;
      try {
        context.drawImage(img, 0, 0);
        stillSource = canvas.toDataURL("image/png");
      } catch {
        // A redirected image may be cross-origin; retain the original preview.
        return;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "preview-motion";
      const pause = () => {
        img.src = stillSource;
        button.textContent = "Play preview";
        button.setAttribute("aria-label", "Play preview: " + img.alt);
        button.setAttribute("aria-pressed", "false");
      };
      button.addEventListener("click", () => {
        if (button.getAttribute("aria-pressed") === "true") pause();
        else {
          img.src = animatedSource;
          button.textContent = "Pause preview";
          button.setAttribute("aria-label", "Pause preview: " + img.alt);
          button.setAttribute("aria-pressed", "true");
        }
      });
      motionPreference.addEventListener("change", (event) => {
        if (event.matches) pause();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) pause();
      });
      pause();
      img.closest(".publication-media").append(button);
    };
    if (img.complete) initialize();
    else img.addEventListener("load", initialize, { once: true });
  });

  // add toggle functionality to abstract, award and bibtex buttons
  $(".links .abstract, .links .award, .links .bibtex").click(function () {
    const entry = $(this).parent().parent();
    const kind = ["abstract", "award", "bibtex"].find((name) => $(this).hasClass(name));
    const panel = entry.find("." + kind + ".hidden");
    const willOpen = !panel.hasClass("open");
    entry.find(".hidden.open").removeClass("open");
    entry.find(".links [aria-expanded]").attr("aria-expanded", "false");
    panel.toggleClass("open", willOpen);
    $(this).attr("aria-expanded", String(willOpen));
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
