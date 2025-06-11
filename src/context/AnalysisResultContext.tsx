import { createContext, useState, ReactNode, useContext } from "react";
import { AnalysisResultType } from "../api/analysis/myPreference";

interface AnalysisResultContextType {
  recommendationData: AnalysisResultType | null;
  setRecommendationData: (data: AnalysisResultType) => void;
}

const AnalysisResultContext = createContext<
  AnalysisResultContextType | undefined
>(undefined);

export const AnalysisResultProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recommendationData, setRecommendationData] =
    useState<AnalysisResultType | null>(null);

  return (
    <AnalysisResultContext.Provider
      value={{ recommendationData, setRecommendationData }}
    >
      {children}
    </AnalysisResultContext.Provider>
  );
};

export const useAnalysisResult = () => {
  const context = useContext(AnalysisResultContext);
  if (!context) {
    throw new Error("usePreference must be used within PreferenceProvider");
  }
  return context;
};
