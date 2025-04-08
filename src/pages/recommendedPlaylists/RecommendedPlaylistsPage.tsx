import Header from "../../components/Header";
import sampleImg from "../../images/sample.png";

export default function RecommendedPlaylistsPage() {
  const playlists = [
    {
      imageSrc: sampleImg,
      title: "드라이브할 때 듣기 좋은 노래",
      description: "시원한 도로 위 감성 팝 모음",
    },
    {
      imageSrc: sampleImg,
      title: "카페에서 흐르는 잔잔한 음악",
      description: "편안한 하루를 위한 재즈 & 어쿠스틱",
    },
    {
      imageSrc: sampleImg,
      title: "새벽 감성 인디 플레이리스트",
      description: "조용히 사색하기 좋은 노래들",
    },
    {
      imageSrc: sampleImg,
      title: "운동할 때 에너지 UP!",
      description: "비트 강한 EDM & 힙합 모음",
    },
  ];

  return (
    <>
      <Header />
      <main className="px-[10%] py-8">
        <h2 className="text-text-base md:text-2xl text-lg font-bold">
          추천 플레이리스트
        </h2>
        <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className="w-[45%] sm:w-[30%] md:w-[22%] flex-shrink-0"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden">
                <img
                  src={playlist.imageSrc}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-text-base truncate">
                {playlist.title}
              </h3>
              <p className="text-sm text-text-subtle line-clamp-2">
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
