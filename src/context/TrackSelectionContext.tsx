import React, { createContext, useContext, useState, ReactNode } from "react";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyTrackId?: string;
};

type TrackSelectionContextType = {
  selectedTracks: Item[];
  addTrack: (item: Item) => void;
  removeTrack: (seq: string) => void;
  toggleTrack: (item: Item) => void;
  setTracks: (items: Item[]) => void;
  resetTracks: () => void;
};

const TrackSelectionContext = createContext<
  TrackSelectionContextType | undefined
>(undefined);

export function TrackSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedTracks, setSelectedTracks] = useState<Item[]>([]);

  const addTrack = (item: Item) => {
    setSelectedTracks((prev) => {
      if (prev.some((t) => t.seq === item.seq)) return prev;
      return [...prev, item];
    });
  };

  const removeTrack = (seq: string) => {
    setSelectedTracks((prev) => prev.filter((t) => t.seq !== seq));
  };

  const toggleTrack = (item: Item) => {
    setSelectedTracks((prev) => {
      const exists = prev.some((t) => t.seq === item.seq);
      return exists ? prev.filter((t) => t.seq !== item.seq) : [...prev, item];
    });
  };

  const setTracks = (items: Item[]) => {
    setSelectedTracks(items);
  };

  const resetTracks = () => {
    setSelectedTracks([]);
  };

  return (
    <TrackSelectionContext.Provider
      value={{
        selectedTracks,
        addTrack,
        removeTrack,
        toggleTrack,
        setTracks,
        resetTracks,
      }}
    >
      {children}
    </TrackSelectionContext.Provider>
  );
}

export function useTrackSelection() {
  const context = useContext(TrackSelectionContext);
  if (!context) {
    throw new Error(
      "useTrackSelection must be used within a TrackSelectionProvider"
    );
  }
  return context;
}
