import Header from "../../components/Header";
import sampleImg from "../../images/sample.png";
export default function PopularArtistsPage() {
  const artists = [
    { imageSrc: sampleImg, title: "G-DRAGON", subTitle: "" },
    { imageSrc: sampleImg, title: "NewJeans", subTitle: "" },
    { imageSrc: sampleImg, title: "BIGBANG", subTitle: "" },
    { imageSrc: sampleImg, title: "DAY6(데이식스)", subTitle: "" },
    { imageSrc: sampleImg, title: "아이유", subTitle: "" },
    { imageSrc: sampleImg, title: "BIGBANG", subTitle: "" },
    { imageSrc: sampleImg, title: "DAY6(데이식스)", subTitle: "" },
    { imageSrc: sampleImg, title: "아이유", subTitle: "" },
  ];

  return (
    <>
      <Header />
      <main className="px-[10%] p-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold">
          인기 아티스트
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
        </div>
      </main>
    </>
  );
}
