import { createContext, useContext, useState, ReactNode } from "react";

interface LikeContextType {
  isLiked: boolean;
  likeCount: number;
  toggleLike: () => void;
  setLikedState: (liked: boolean, count: number) => void;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({
  children,
  initialLiked,
  initialCount,
}: {
  children: ReactNode;
  initialLiked: boolean;
  initialCount: number;
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const toggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikeCount((prev) => prev + (next ? 1 : -1));
  };

  const setLikedState = (liked: boolean, count: number) => {
    setIsLiked(liked);
    setLikeCount(count);
  };

  return (
    <LikeContext.Provider
      value={{ isLiked, likeCount, toggleLike, setLikedState }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLikeContext must be used within a LikeProvider");
  }
  return context;
};
