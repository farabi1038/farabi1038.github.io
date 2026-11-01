---
layout: page
permalink: /travel/
title: travel
description: U.S. states and national parks I have visited
nav: true
nav_order: 10
chart:
  plotly: true
_styles: |
  .travel-map-card {
    --travel-state-visited: #74d3a8;
    --travel-state-not-visited: #e3e6ea;
    --travel-state-border: var(--global-card-bg-color);
    --travel-park-visited: #d9480f;
    --travel-park-not-visited: #495057;
    --travel-park-outline: var(--global-card-bg-color);
  }
  html[data-theme="dark"] .travel-map-card {
    --travel-state-visited: #1f8a62;
    --travel-state-not-visited: #3d434a;
    --travel-park-visited: #ffa94d;
    --travel-park-not-visited: #ced4da;
  }
  .travel-map {
    width: 100%;
    aspect-ratio: 19 / 10;
  }
  .travel-map-unavailable {
    aspect-ratio: auto;
    margin: 0;
    padding: 1rem;
    text-align: center;
    color: var(--global-text-color-light);
  }
  .travel-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem 1.25rem;
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.9rem;
  }
  .travel-legend li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .travel-swatch {
    display: inline-block;
    width: 1.1rem;
    height: 0.8rem;
    border-radius: 2px;
  }
  .travel-swatch-visited {
    background: var(--travel-state-visited);
  }
  .travel-swatch-not-visited {
    background: var(--travel-state-not-visited);
  }
  .travel-dot {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
  }
  .travel-dot-visited {
    background: var(--travel-park-visited);
  }
  .travel-dot-not-visited {
    border: 2px solid var(--travel-park-not-visited);
  }
  .travel-list {
    columns: 3 12rem;
    column-gap: 2rem;
  }
  .travel-list li {
    break-inside: avoid;
  }
---

{% assign travel = site.data.travel %}
{% assign states_total = travel.states | size %}
{% assign states_visited = travel.states | where: "visited", true %}
{% assign states_left = travel.states | where: "visited", false %}
{% assign parks_total = travel.national_parks | size %}
{% assign parks_visited = travel.national_parks | where: "visited", true %}
{% assign parks_left = travel.national_parks | where: "visited", false %}
{% assign parks_off_map = travel.national_parks | where: "territory", true %}
{% assign states_pct = states_visited.size | times: 100.0 | divided_by: states_total | round: 1 %}
{% assign states_pct_whole = states_pct | floor %}
{% if states_pct == states_pct_whole %}{% assign states_pct = states_pct_whole %}{% endif %}
{% assign parks_pct = parks_visited.size | times: 100.0 | divided_by: parks_total | round: 1 %}
{% assign parks_pct_whole = parks_pct | floor %}
{% if parks_pct == parks_pct_whole %}{% assign parks_pct = parks_pct_whole %}{% endif %}

## U.S. States & National Parks Visited

This page keeps track of where I have traveled in the United States. The map shades every state I have visited and marks each national park: filled dots are parks I have been to, and open dots are parks I have not seen yet. Hover over or tap a state or a park for details.

<div class="row mt-4 mb-3">
  <div class="col-md-6 mb-3">
    <div class="card h-100 shadow-sm border-0">
      <div class="card-body text-center">
        <i class="fas fa-flag-usa fa-2x text-primary mb-3"></i>
        <h5 class="card-title">U.S. States</h5>
        <p class="h4 mb-1">{{ states_visited.size }} / {{ states_total }} <span class="text-muted">({{ states_pct }}%)</span></p>
        <p class="card-text text-muted mb-0">{{ states_left.size }} remaining</p>
      </div>
    </div>
  </div>
  <div class="col-md-6 mb-3">
    <div class="card h-100 shadow-sm border-0">
      <div class="card-body text-center">
        <i class="fas fa-mountain-sun fa-2x text-success mb-3"></i>
        <h5 class="card-title">National Parks</h5>
        <p class="h4 mb-1">{{ parks_visited.size }} / {{ parks_total }} <span class="text-muted">({{ parks_pct }}%)</span></p>
        <p class="card-text text-muted mb-0">{{ parks_left.size }} remaining</p>
      </div>
    </div>
  </div>
</div>

<div class="card shadow-sm border-0 mb-4 travel-map-card">
  <div class="card-body">
    <div
      id="travel-map"
      class="travel-map"
      role="img"
      aria-label="Map of the United States showing {{ states_visited.size }} of {{ states_total }} states and {{ parks_visited.size }} of {{ parks_total }} national parks visited"
    >
      <noscript><p class="travel-map-unavailable">The interactive map needs JavaScript. The lists below have the same information.</p></noscript>
    </div>
    <ul class="travel-legend">
      <li><span class="travel-swatch travel-swatch-visited"></span>State visited</li>
      <li><span class="travel-swatch travel-swatch-not-visited"></span>State not visited yet</li>
      <li><span class="travel-dot travel-dot-visited"></span>National park visited</li>
      <li><span class="travel-dot travel-dot-not-visited"></span>National park not visited yet</li>
    </ul>
  </div>
</div>

<script type="application/json" id="travel-map-data">{{ travel | jsonify }}</script>
<script defer src="{{ '/assets/js/travel-map.js' | relative_url | bust_file_cache }}"></script>

### National Parks Visited

<ul class="travel-list">
  {% for park in parks_visited %}
    <li>{{ park.name }} <span class="text-muted">({{ park.states | join: ", " }})</span></li>
  {% endfor %}
</ul>

### States Not Visited Yet

<ul class="travel-list">
  {% for state in states_left %}
    <li>{{ state.name }}</li>
  {% endfor %}
</ul>

### National Parks Outside the Map

The map covers the {{ states_total }} states, so national parks in U.S. territories are listed here instead.

<ul>
  {% for park in parks_off_map %}
    <li>{{ park.name }} ({{ park.states | join: ", " }}): {% if park.visited %}visited{% else %}not visited yet{% endif %}</li>
  {% endfor %}
</ul>

_Park names and locations follow Wikipedia's [List of national parks of the United States](https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States), which counts {{ parks_total }} parks._
