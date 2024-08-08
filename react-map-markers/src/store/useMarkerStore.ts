import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Marker = {
  lat: number;
  lng: number;
  color: string;
  time: Date;
  name: string;
};

type MarkerStore = {
  markers: Marker[];
  selectedMarker: Marker | null;
  selectedMarkers: Marker[];
  directions: google.maps.DirectionsResult | null;
  addMarker: (marker: Marker) => void;
  updateMarker: (marker: Marker) => void;
  setSelectedMarker: (marker: Marker | null) => void;
  toggleSelectMarker: (marker: Marker) => void;
  setDirections: (directions: google.maps.DirectionsResult | null) => void;
  clearSelectedMarkers: () => void;
  updateSelectedMarker: (marker: Partial<Marker>) => void;
};

export const useMarkerStore = create<MarkerStore>()(
  persist(
    (set) => ({
      markers: [],
      selectedMarker: null,
      selectedMarkers: [],
      directions: null,
      addMarker: (marker) =>
        set((state) => ({
          markers: [...state.markers, marker],
        })),
      updateMarker: (updatedMarker) =>
        set((state) => ({
          markers: state.markers.map((marker) =>
            marker.lat === updatedMarker.lat && marker.lng === updatedMarker.lng
              ? { ...marker, ...updatedMarker }
              : marker
          ),
        })),
      setSelectedMarker: (marker) => set({ selectedMarker: marker }),
      toggleSelectMarker: (marker) =>
        set((state) => {
          const isSelected = state.selectedMarkers.some(
            (m) => m.lat === marker.lat && m.lng === marker.lng
          );
          if (isSelected) {
            return {
              selectedMarkers: state.selectedMarkers.filter(
                (m) => m.lat !== marker.lat || m.lng !== marker.lng
              ),
            };
          } else {
            return { selectedMarkers: [...state.selectedMarkers, marker] };
          }
        }),
      setDirections: (directions) => set({ directions }),
      clearSelectedMarkers: () => set({ selectedMarkers: [] }),
      updateSelectedMarker: (marker) =>
        set((state) => ({
          selectedMarker: state.selectedMarker ? { ...state.selectedMarker, ...marker } : null,
        })),
    }),
    {
      name: 'markers',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          parsed.state.markers = parsed.state.markers.map((marker: Marker) => ({
            ...marker,
            time: new Date(marker.time),
          }));
          return parsed;
        },
        setItem: (name, state) => {
          const serializedState = JSON.stringify(state, (key, value) =>
            value instanceof Date ? value.toISOString() : value
          );
          localStorage.setItem(name, serializedState);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      partialize: (state) => state,
    }
  )
);