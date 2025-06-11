import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import prevIcon from "../../images/chevron-left.svg";
import FinishButton from "../../components/FinishButton";
import { useNavigate } from "react-router-dom";
import sample from "../../images/playlistSample.svg";
import Button from "../../components/Button";
import {
  registerMyPlaylist,
  uploadMyPlaylistImage,
} from "../../api/myPage/myPlaylist";
export default function RegisterPlaylist() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [preview, setPreview] = useState(sample);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    setObjectUrl(imageUrl);
    setFile(selectedFile);
    setIsDirty(true);
  };

  const handlePlaylistRegister = async () => {
    if (!playlistName.trim()) {
      toast.error("플레이리스트 제목을 입력해주세요.");
      return;
    }
    if (!playlistDescription.trim()) {
      toast.error("플레이리스트 소개글을 입력해주세요.");
      return;
    }
    if (!file) {
      toast.error("플레이리스트 이미지를 등록해주세요.");
      return;
    }

    try {
      const response = await registerMyPlaylist({
        name: playlistName,
        description: playlistDescription,
      });

      const spotifyPlaylistId = response.data.data;

      if (spotifyPlaylistId) {
        await uploadMyPlaylistImage(file, spotifyPlaylistId);
      }

      toast.success("성공적으로 등록되었습니다.");
      setIsDirty(false);
    } catch (error) {
      toast.error("플레이리스트 등록에 실패했습니다.");
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm("저장하지 않고 나가시겠습니까?");
      if (confirmLeave) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between md:justify-center md:px-[20%] md:relative">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer md:absolute md:left-[20%]"
          onClick={handleBack}
        />
        <h1 className="font-bold text-lg ">새 플레이리스트 만들기</h1>
        <div className="md:hidden">
          <FinishButton onClick={handleBack} />
        </div>
      </header>
      <main className="w-full min-h-screen bg-bg-peach p-4 py-7 md:px-[20%]">
        <section className="flex flex-col items-center gap-4">
          <h2 className="sr-only">플레이리스트 등록하기</h2>
          <img
            onClick={handleImageClick}
            src={preview}
            alt="플레이리스트 이미지"
            className="w-[150px] h-[150px] object-cover rounded-md cursor-pointer mb-3"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label htmlFor="playlistTitle" className="sr-only">
            플레이리스트 제목
          </label>
          <input
            onChange={(e) => {
              setPlaylistName(e.target.value);
              setIsDirty(true);
            }}
            id="playlistTitle"
            name="playlistTitle"
            type="text"
            placeholder="플레이리스트 제목"
            className="p-2 font-bold w-full focus:outline-none rounded-md bg-white/60 placeholder:text-gray-400"
          />
          <label htmlFor="playlistInfo" className="sr-only">
            플레이리스트 소개글
          </label>
          <input
            onChange={(e) => {
              setPlaylistDescription(e.target.value);
              setIsDirty(true);
            }}
            id="playlistInfo"
            name="playlistInfo"
            type="text"
            placeholder="소개글을 입력하세요"
            className="p-2 text-sm w-full focus:outline-none rounded-md bg-white/60"
          />
        </section>
        <div className="mt-5 flex justify-end">
          <Button primary onClick={handlePlaylistRegister}>
            등록하기
          </Button>
        </div>
      </main>
    </>
  );
}
