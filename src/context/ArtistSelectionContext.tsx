import { createContext, useContext, useState, ReactNode } from "react";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
};

type ArtistSelectionContextType = {
  selectedArtists: Item[];
  toggleArtist: (item: Item) => void;
  setArtists: (items: Item[]) => void;
  resetArtists: () => void;
};

const ArtistSelectionContext = createContext<
  ArtistSelectionContextType | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export function ArtistSelectionProvider({ children }: Props) {
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
    <ArtistSelectionContext.Provider
      value={{ selectedArtists, toggleArtist, setArtists, resetArtists }}
    >
      {children}
    </ArtistSelectionContext.Provider>
  );
}

export function useArtistSelection() {
  const context = useContext(ArtistSelectionContext);
  if (!context) {
    throw new Error(
      "useArtistSelection must be used within an ArtistSelectionProvider"
    );
  }
  return context;
}
