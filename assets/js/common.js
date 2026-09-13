$(document).ready(function () {
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
