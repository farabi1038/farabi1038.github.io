// Travel map for the /travel/ page (_pages/travel.md).
// States are shaded by visit status and national parks are drawn as markers, using Plotly's
// built-in USA map (Albers USA projection with Alaska and Hawaii insets).
// The data is _data/travel.yml, embedded in the page as JSON at build time. Colors come from
// CSS custom properties on the map container, so the map follows the light/dark theme toggle.
(function () {
  "use strict";

  const VISITED = "Visited";
  const NOT_VISITED = "Not visited yet";

  function themeColors(container) {
    const style = getComputedStyle(container);
    const read = (name) => style.getPropertyValue(name).trim();
    return {
      stateVisited: read("--travel-state-visited"),
      stateNotVisited: read("--travel-state-not-visited"),
      stateBorder: read("--travel-state-border"),
      parkVisited: read("--travel-park-visited"),
      parkNotVisited: read("--travel-park-not-visited"),
      parkOutline: read("--travel-park-outline"),
      text: read("--global-text-color"),
      labelBackground: read("--global-card-bg-color"),
      labelBorder: read("--global-divider-color"),
      font: getComputedStyle(document.body).fontFamily,
    };
  }

  function stateTrace(states, colors) {
    return {
      type: "choropleth",
      locationmode: "USA-states",
      locations: states.map((state) => state.code),
      z: states.map((state) => (state.visited ? 1 : 0)),
      zmin: 0,
      zmax: 1,
      colorscale: [
        [0, colors.stateNotVisited],
        [1, colors.stateVisited],
      ],
      showscale: false,
      marker: { line: { color: colors.stateBorder, width: 1 } },
      text: states.map((state) => state.name),
      customdata: states.map((state) => (state.visited ? VISITED : NOT_VISITED)),
      hovertemplate: "<b>%{text}</b><br>%{customdata}<extra></extra>",
    };
  }

  function parkTrace(parks, visited, colors, compact) {
    const subset = parks.filter((park) => park.visited === visited);
    const lineWidth = compact ? 1 : 1.5;
    const marker = visited
      ? { symbol: "circle", size: compact ? 7 : 10, color: colors.parkVisited, line: { color: colors.parkOutline, width: lineWidth } }
      : { symbol: "circle-open", size: compact ? 6 : 8, color: colors.parkNotVisited, line: { width: lineWidth } };
    return {
      type: "scattergeo",
      mode: "markers",
      lat: subset.map((park) => park.lat),
      lon: subset.map((park) => park.lon),
      text: subset.map((park) => park.name),
      customdata: subset.map((park) => park.states.join(", ")),
      hovertemplate: `<b>%{text}</b><br>%{customdata}<br>${visited ? VISITED : NOT_VISITED}<extra></extra>`,
      marker: marker,
    };
  }

  function figure(data, colors, compact) {
    // Parks in U.S. territories fall outside the Albers USA projection; the page lists them in text.
    const parks = data.national_parks.filter((park) => !park.territory);
    return {
      data: [stateTrace(data.states, colors), parkTrace(parks, false, colors, compact), parkTrace(parks, true, colors, compact)],
      layout: {
        geo: {
          scope: "usa",
          projection: { type: "albers usa" },
          bgcolor: "rgba(0,0,0,0)",
          showframe: false,
          // No base land layer: it would paint the Great Lakes in the "not visited" color.
          showland: false,
          showlakes: false,
          subunitcolor: colors.stateBorder,
        },
        margin: { l: 0, r: 0, t: 0, b: 0 },
        paper_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        dragmode: false,
        font: { family: colors.font, color: colors.text },
        hoverlabel: {
          bgcolor: colors.labelBackground,
          bordercolor: colors.labelBorder,
          font: { family: colors.font, color: colors.text },
        },
      },
    };
  }

  function init() {
    const container = document.getElementById("travel-map");
    const source = document.getElementById("travel-map-data");
    if (!container || !source) {
      return;
    }
    if (typeof Plotly === "undefined") {
      container.classList.add("travel-map-unavailable");
      container.textContent = "The interactive map could not load. The lists below have the same information.";
      return;
    }

    const data = JSON.parse(source.textContent);
    const config = { responsive: true, displayModeBar: false, scrollZoom: false };
    // Smaller markers on narrow screens keep clustered parks and the Alaska inset readable.
    const isCompact = () => container.clientWidth < 500;
    let compact = isCompact();
    const draw = () => {
      const fig = figure(data, themeColors(container), compact);
      Plotly.react(container, fig.data, fig.layout, config);
    };

    draw();
    // theme.js switches themes by setting data-theme on <html>; redraw with the new colors.
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", () => {
      if (isCompact() !== compact) {
        compact = !compact;
        draw();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
