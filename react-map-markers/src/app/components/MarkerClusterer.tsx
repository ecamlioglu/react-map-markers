'use client'
import React, { useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useMarkerStore } from '@/store/useMarkerStore';

type MarkerClustererProps = {
  map: google.maps.Map | null;
};

const MarkerClustererComponent: React.FC<MarkerClustererProps> = ({ map }) => {
  const markers = useMarkerStore((state) => state.markers);
  const markerRefs = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  useEffect(() => {
    if (!map) {
      markerRefs.current = markers.map((marker) => new google.maps.marker.AdvancedMarkerElement({
        position: { lat: marker.lat, lng: marker.lng },
        title: marker.name,
      }));

      const markerCluster = new MarkerClusterer({ markers: markerRefs.current, map });

      return () => {
        markerCluster.clearMarkers();
      };
    }
  }, [map, markers]);

  return null;
};

export default MarkerClustererComponent;