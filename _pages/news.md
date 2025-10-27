---
layout: page
permalink: /news/
title: news
description: Recent announcements and updates
nav: true
nav_order: 3
---

<div class="news">
  {% if site.announcements and site.announcements.enabled %}
    {% include news.liquid %}
  {% endif %}
</div>
