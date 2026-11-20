import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";

/** Ajman Free Zone, Sheikh Rashid Bin Saeed Al Maktoum St (longitude, latitude) */
const OFFICE: [number, number] = [55.453, 25.4184];
const SPACE = { center: [-35, 18] as [number, number], zoom: 1.3 }; // opening view: the whole Earth
const CLOSE_UP = 16.2;

// Satellite Earth on a globe. Imagery: Esri World Imagery (attribution shown on the map).
const STYLE: StyleSpecification = {
  version: 8,
  projection: { type: "globe" },
  sources: {
    earth: {
      type: "raster",
      tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
      tileSize: 256,
      maxzoom: 18,
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
    },
  },
  layers: [
    { id: "space", type: "background", paint: { "background-color": "#050e30" } },
    { id: "earth", type: "raster", source: "earth" },
  ],
  sky: { "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 1, 7, 0] },
};

/** Gold pin that marks the office */
function pin() {
  const el = document.createElement("div");
  el.style.cssText =
    "width:22px;height:22px;border-radius:50%;background:#E9C46A;border:3px solid #fff;box-shadow:0 0 0 6px rgba(233,196,106,.35),0 4px 14px rgba(0,0,0,.45)";
  return el;
}

/**
 * Contact page map: a real satellite globe that flies from space down to the office.
 * Starts when the map scrolls into view; `replay()` runs it again. Visitors who prefer
 * reduced motion get the close-up straight away. The map library loads only on this page.
 */
export function useEarthFlyIn(boxRef: RefObject<HTMLDivElement | null>) {
  const [done, setDone] = useState(false);
  const mapRef = useRef<MapLibreMap | null>(null);
  const reduce = useRef(false);

  const fly = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    setDone(false);
    if (reduce.current) {
      map.jumpTo({ center: OFFICE, zoom: CLOSE_UP });
      setDone(true);
      return;
    }
    map.jumpTo(SPACE);
    map.once("moveend", () => setDone(true));
    // Gentle start and landing, steady descent in between
    const glide = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    map.flyTo({ center: OFFICE, zoom: CLOSE_UP, duration: 13000, curve: 1.25, easing: glide, essential: true });
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let io: IntersectionObserver | undefined;

    import("maplibre-gl").then(({ Map, Marker, NavigationControl, setWorkerUrl }) => {
      if (cancelled) return;
      // Copy of node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs: copy it again after upgrading the library
      setWorkerUrl("/vendor/maplibre-gl-worker.mjs");
      const map = new Map({
        container: box,
        style: STYLE,
        ...SPACE,
        maxZoom: 18,
        attributionControl: { compact: true },
        cooperativeGestures: true, // page scroll passes over the map; Ctrl + scroll zooms it
      });
      mapRef.current = map;
      map.addControl(new NavigationControl({ showCompass: false }), "top-left");
      new Marker({ element: pin() }).setLngLat(OFFICE).addTo(map);
      map.once("load", () => {
        io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io?.disconnect(); fly(); } }, { threshold: 0.4 });
        io.observe(box);
      });
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [boxRef, fly]);

  return { done, replay: fly };
}
