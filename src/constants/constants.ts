export const SECTION_TITLES = {
  POPULAR_ARTISTS: "인기 아티스트",
  RECOMMENDED_PLAYLISTS: "추천 플레이리스트 🌷",
} as const;

export const RECOMMENDED_SECTION_TITLES = {
  TASTE_MATCHING_MUSIC: "님 취향 저격 음악 🎵",
  CUSTOM_PLAYLISTS_FOR_YOU: "님을 위한, 맞춤 플리 🌈",
} as const;

export const RECOMMENDATION_LIMITS = {
  MIN_TRACKS: 5,
  MAX_TRACKS: 20,
  MIN_ARTISTS: 3,
  MAX_ARTISTS: 20,
} as const;

export const ANALYSIS_LIMITS = {
  MIN_GENRES: 1,
  MAX_GENRES: 3,
  MIN_ARTISTS: 1,
  MAX_ARTISTS: 5,
} as const;
