$(document).ready(function () {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updates = new WeakMap();
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => updates.get(entry.target)?.(entry.isIntersecting));
          },
          { threshold: 0.2 }
        )
      : null;

  // Run media only while it can be seen; explicit pause survives scrolling away.
  const manageMotion = (element, button, render) => {
    let visible = !observer;
    let wanted = !motionPreference.matches;
    let hovered = false;
    let focused = false;
    const update = () => {
      const running = wanted && visible && !document.hidden && !hovered && !focused;
      button.textContent = wanted ? "Pause" : "Play";
      button.setAttribute("aria-label", (wanted ? "Pause" : "Play") + " automatic preview");
      button.setAttribute("aria-pressed", String(wanted));
      element.dataset.playing = String(running);
      render(running);
    };
    updates.set(element, (inView) => {
      visible = inView;
      if (inView)
        element.querySelectorAll("img").forEach((img) => {
          img.loading = "eager";
        });
      update();
    });
    button.addEventListener("click", () => {
      wanted = !wanted;
      focused = false;
      update();
    });
    element.addEventListener("mouseenter", () => {
      hovered = true;
      update();
    });
    element.addEventListener("mouseleave", () => {
      hovered = false;
      update();
    });
    element.addEventListener("focusin", () => {
      focused = true;
      update();
    });
    element.addEventListener("focusout", (event) => {
      if (!element.contains(event.relatedTarget)) {
        focused = false;
        update();
      }
    });
    motionPreference.addEventListener("change", (event) => {
      if (event.matches) wanted = false;
      update();
    });
    document.addEventListener("visibilitychange", update);
    observer?.observe(element);
    update();
    return () => {
      wanted = false;
      update();
    };
  };

  document.querySelectorAll(".paper-gallery").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll(".paper-slide")];
    if (slides.length < 2) return;
    let index = 0;
    let timer;
    const controls = document.createElement("div");
    controls.className = "paper-controls";
    const previous = document.createElement("button");
    const next = document.createElement("button");
    const play = document.createElement("button");
    play.className = "paper-autoplay";
    const status = document.createElement("span");
    previous.type = next.type = play.type = "button";
    previous.textContent = "‹";
    next.textContent = "›";
    previous.setAttribute("aria-label", "Previous paper figure");
    next.setAttribute("aria-label", "Next paper figure");
    status.setAttribute("aria-atomic", "true");
    const show = (offset) => {
      slides[index].hidden = true;
      index = (index + offset + slides.length) % slides.length;
      slides[index].hidden = false;
      status.textContent = `${index + 1} / ${slides.length}`;
      status.setAttribute("aria-label", `Figure ${index + 1} of ${slides.length}`);
    };
    controls.append(previous, status, next, play);
    gallery.append(controls);
    show(0);
    const pause = manageMotion(gallery, play, (running) => {
      clearInterval(timer);
      status.setAttribute("aria-live", running ? "off" : "polite");
      if (running) timer = setInterval(() => show(1), 4500);
    });
    previous.addEventListener("click", () => {
      pause();
      show(-1);
    });
    next.addEventListener("click", () => {
      pause();
      show(1);
    });
  });

  document.querySelectorAll(".publication-media img[data-motion-src]").forEach((img) => {
    const poster = img.src;
    const media = img.closest(".publication-media");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preview-motion";
    media.append(button);
    manageMotion(media, button, (running) => {
      const source = running ? img.dataset.motionSrc : poster;
      if (img.src !== new URL(source, location.href).href) img.src = source;
    });
  });

  // The homepage owns filtering; its section anchors are never search terms.
  const search = document.getElementById("research-search");
  if (search) {
    const section = document.getElementById("research");
    const entries = [...section.querySelectorAll(".bibliography > li")];
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let count = 0;
      entries.forEach((entry) => {
        entry.hidden = !entry.textContent.toLocaleLowerCase().includes(query);
        if (!entry.hidden) count++;
      });
      section.querySelectorAll("ol.bibliography").forEach((list) => {
        const empty = [...list.children].every((entry) => entry.hidden);
        list.hidden = empty;
        if (list.previousElementSibling?.matches("h2.bibliography")) list.previousElementSibling.hidden = empty;
      });
      document.getElementById("research-count").textContent = `${count} of ${entries.length} papers`;
      document.getElementById("research-empty").hidden = count > 0;
    };
    section.querySelector(".research-filter").hidden = false;
    search.value = new URLSearchParams(location.search).get("q") || "";
    search.addEventListener("input", filter);
    filter();
  }

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
