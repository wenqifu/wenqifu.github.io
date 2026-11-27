---
layout: page
permalink: /publications/
title: Publications
nav: true
nav_order: 2
compact_publications: true
description: Papers and preprints in machine learning, robotics, and statistics.
---

<section id="research" class="publication-index" aria-label="Publication list">
  <div class="research-filter" hidden>
    <label for="research-search">Find a paper</label>
    <input id="research-search" type="search" placeholder="Search by title, author, or topic" autocomplete="off">
    <span id="research-count" role="status" aria-live="polite"></span>
  </div>
  <p id="research-empty" hidden>No papers match. Try another title, author, or topic.</p>
  {% include selected_papers.liquid %}
</section>
