import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getArtists } from "../../api/analysis/artists";
import { SECTION_TITLES } from "../../constants/constants";
import HamburgerMenu from "../../components/HamburgerMenu";
import catImg from "../../images/music-cat-full.png";

interface Artist {
  imageSrc: string;
  title: string;
  detailPageUrl: string;
}
export default function PopularArtistsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState("");

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const fetchArtists = async (subject: "korea") => {
    try {
      setError("");
      const res = await getArtists(subject, 0, 12);
      const artistData = res.data.data.content.map((artist) => ({
        imageSrc: artist.imageList[0]?.url ?? "",
        title: artist.name,
        detailPageUrl: artist.detailPageUrl,
      }));
      setArtists(artistData);
    } catch (error) {
      setError("아티스트 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchArtists("korea");
  }, []);

  const handleCardClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div
        className={` fixed z-10 inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-60 visible " : "opacity-0 invisible"
        }`}
        onClick={handleMenuClose}
      ></div>
      <div className="md:hidden">
        {" "}
        <HamburgerMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      </div>

      <Header onClick={handleMenuOpen} />
      <main className="md:px-[10%] px-4 p-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold pl-1">
          {SECTION_TITLES.POPULAR_ARTISTS}
        </h2>
        <div className="flex flex-wrap gap-8 mt-6 justify-center md:justify-start">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="w-[120px] md:w-[150px] flex-shrink-0 group relative cursor-pointer"
              onClick={() => handleCardClick(artist.detailPageUrl)}
            >
              <div className="relative transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg rounded-full overflow-hidden">
                <img
                  src={artist.imageSrc || catImg}
                  alt={artist.title}
                  className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-sm md:text-base text-text-base font-semibold text-center transition-colors group-hover:text-text-hover">
                {artist.title || "알 수 없음"}
              </h3>
            </div>
          ))}

          {error && <p className="text-gray-100 pt-3 ">{error}</p>}
        </div>
      </main>
    </>
  );
}
