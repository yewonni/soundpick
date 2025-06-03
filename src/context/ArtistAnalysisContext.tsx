import { createContext, useContext, useState, ReactNode } from "react";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyArtistId?: string;
};

type ArtistAnalysisContextType = {
  selectedArtists: Item[];
  toggleArtist: (item: Item) => void;
  setArtists: (items: Item[]) => void;
  resetArtists: () => void;
};

const ArtistAnalysisContext = createContext<
  ArtistAnalysisContextType | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export function ArtistAnalysisProvider({ children }: Props) {
  const [selectedArtists, setSelectedArtists] = useState<Item[]>([]);

  const toggleArtist = (item: Item) => {
    setSelectedArtists((prev) => {
      const exists = prev.some((a) => a.seq === item.seq);
      return exists ? prev.filter((a) => a.seq !== item.seq) : [...prev, item];
    });
  };

  const setArtists = (items: Item[]) => {
    setSelectedArtists(items);
  };

  const resetArtists = () => {
    setSelectedArtists([]);
  };

  return (
    <ArtistAnalysisContext.Provider
      value={{ selectedArtists, toggleArtist, setArtists, resetArtists }}
    >
      {children}
    </ArtistAnalysisContext.Provider>
  );
}

export function useArtistAnalysis() {
  const context = useContext(ArtistAnalysisContext);
  if (!context) {
    throw new Error(
      "useArtistSelection must be used within an ArtistSelectionProvider"
    );
  }
  return context;
}
