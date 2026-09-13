$(document).ready(function () {
  // Manual paper figures: no timers, automatic motion, or extra media dependency.
  document.querySelectorAll(".paper-gallery").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll(".paper-slide")];
    if (slides.length < 2) return;
    let index = 0;
    const controls = document.createElement("div");
    controls.className = "paper-controls";
    const previous = document.createElement("button");
    const next = document.createElement("button");
    const status = document.createElement("span");
    previous.type = next.type = "button";
    previous.textContent = "Previous";
    next.textContent = "Next";
    previous.setAttribute("aria-label", "Previous paper figure");
    next.setAttribute("aria-label", "Next paper figure");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    const show = (offset) => {
      slides[index].hidden = true;
      index = (index + offset + slides.length) % slides.length;
      slides[index].hidden = false;
      status.textContent = `${index + 1} / ${slides.length}`;
      status.setAttribute("aria-label", `Figure ${index + 1} of ${slides.length}: ${slides[index].querySelector("figcaption").textContent}`);
    };
    previous.addEventListener("click", () => show(-1));
    next.addEventListener("click", () => show(1));
    controls.append(previous, status, next);
    gallery.append(controls);
    show(0);
  });

  // Real simulation footage uses a deliberate source frame as its static poster.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll(".publication-media img[data-motion-src]").forEach((img) => {
    const stillSource = img.src;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preview-motion";
    const pause = () => {
      img.src = stillSource;
      button.textContent = "Play demo";
      button.setAttribute("aria-label", "Play demo: " + img.alt);
      button.setAttribute("aria-pressed", "false");
    };
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") pause();
      else {
        img.src = img.dataset.motionSrc;
        button.textContent = "Pause demo";
        button.setAttribute("aria-label", "Pause demo: " + img.alt);
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
