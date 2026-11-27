---
layout: page
title: Projects
permalink: /projects/
description: A closer look at the questions, methods, and systems behind the papers.
nav: true
nav_order: 3
---

<div class="project-index">
  {% for work in site.data.featured_work %}{% include work_card.liquid work=work %}{% endfor %}
</div>
<div class="tool-note">
  <p class="eyebrow">Research tools</p>
  <h2><a href="{{ '/projects/llm_orchestra/' | relative_url }}">LLM Orchestra <span aria-hidden="true">↗</span></a></h2>
  <p>A multi-agent workflow system for research and academic writing.</p>
</div>
