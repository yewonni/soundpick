import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getArtists } from "../../api/analysis/artists";
import { SECTION_TITLES } from "../../constants/constants";
export default function PopularArtistsPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchArtists = async (subject: "korea") => {
    try {
      const res = await getArtists(subject, 0, 10);
      const artistData = res.data.data.content.map((artist) => ({
        imageSrc: artist.imageList[0]?.url ?? "",
        title: artist.name,
      }));
      setArtists(artistData);
    } catch (error) {
      console.error(`${subject} 아티스트 불러오기 실패`, error);
      setError("아티스트 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchArtists("korea");
  }, []);

  return (
    <>
      <Header />
      <main className="px-[10%] p-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold">
          {SECTION_TITLES.POPULAR_ARTISTS}
        </h2>
        <div className="flex flex-wrap gap-8 mt-6 justify-center md:justify-start">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="w-[120px] md:w-[150px] flex-shrink-0 group relative cursor-pointer"
            >
              <div className="relative">
                <img
                  src={artist.imageSrc}
                  alt={artist.title}
                  className="w-[120px] h-[120px] md:w-[150px]  md:h-[150px] rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-full">
                  <button className="bg-white p-2 rounded-full text-black text-sm">
                    ▶
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-sm md:text-base text-text-base font-semibold text-center group-hover:text-text-hover group-active:text-text-subtle">
                {artist.title}
              </h3>
            </div>
          ))}
          {error && <p className="text-gray-100 pt-3 ">{error}</p>}
        </div>
      </main>
    </>
  );
}
