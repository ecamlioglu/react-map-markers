'use client'
import { useEffect } from "react";

type AdvancedMarkerProps = {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  title: string;
  onClick: () => void;
};

const AdvancedMarker = ({ map, position, title, onClick }: AdvancedMarkerProps) => {
  useEffect(() => {
    if (!map) return;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map,
      title,
    });

    marker.addListener("click", onClick);

    return () => {
      marker.map = null;
    };
  }, [map, position, title, onClick]);

  return null;
};

export default AdvancedMarker;