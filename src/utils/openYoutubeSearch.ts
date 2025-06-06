export const openYoutubeSearch = (trackName: string, artistName: string) => {
  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
  window.open(youtubeUrl, "_blank");
};
