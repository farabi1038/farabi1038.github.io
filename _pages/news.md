---
layout: page
title: news
permalink: /news/
description: Recent announcements and updates
nav: true
nav_order: 2
---

<div class="news">
  {% assign news = site.news | reverse %}
  {% if news.size > 0 %}
    <div class="table-responsive">
      <table class="table table-sm table-borderless">
        {% for item in news %}
          <tr>
            <th scope="row" style="width: 20%">{{ item.date | date: '%b %d, %Y' }}</th>
            <td>
              {% if item.inline %}
                {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
              {% else %}
                <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
              {% endif %}
            </td>
          </tr>
        {% endfor %}
      </table>
    </div>
  {% else %}
    <p>No news so far...</p>
  {% endif %}
</div>
