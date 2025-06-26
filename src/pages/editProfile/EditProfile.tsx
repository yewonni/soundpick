import { useState, useRef, useEffect } from "react";
import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../images/profile.svg";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { uploadProfile, editProfile } from "../../api/profile/editProfile";
import { getProfile } from "../../api/profile/getProfile";
import { profileEditSchema } from "../../utils/validations/profileSchema";
import { z } from "zod";
import { showToast } from "../../utils/toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const { setUserNickname } = useAuth();
  const [preview, setPreview] = useState<string>(sample);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [formError, setFormError] = useState<{
    nickname?: string;
    introduction?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const { nickname, introduction, imageUrl } = res.data.data;

        setNickname(nickname);
        setIntroduction(introduction);
        setPreview(imageUrl ? `${baseUrl}${imageUrl}` : sample);
      } catch (err) {
        showToast("프로필 정보를 불러오지 못했습니다.");
      }
    };

    fetchProfile();
  }, [baseUrl]);

  // 유효성 검사
  const validate = (name: string, value: string) => {
    try {
      if (name === "nickname") {
        profileEditSchema.pick({ nickname: true }).parse({ nickname: value });
        setFormError((prev) => ({ ...prev, nickname: undefined }));
      }
      if (name === "introduction") {
        profileEditSchema
          .pick({ introduction: true })
          .parse({ introduction: value });
        setFormError((prev) => ({ ...prev, introduction: undefined }));
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMsg = err.errors[0]?.message;
        setFormError((prev) => ({ ...prev, [name]: errorMsg }));
      }
    }
  };

  // 프로필 업데이트
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

  // 저장하기 및 api 호출
  const handleSave = async () => {
    try {
      profileEditSchema.parse({ nickname, introduction });
      setFormError({});

      if (file) {
        await uploadProfile(file);
      }
      await editProfile({ nickname, introduction });
      setUserNickname(nickname);

      showToast("프로필이 저장되었습니다.", "success");
      navigate("/mypage");
      setIsDirty(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: typeof formError = {};
        err.errors.forEach((e) => {
          const field = e.path[0] as keyof typeof formError;
          fieldErrors[field] = e.message;
        });
        setFormError(fieldErrors);
        showToast("입력값을 확인해주세요.");
      } else {
        showToast("저장에 실패했습니다.");
      }
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "변경사항이 저장되지 않았습니다. 나가시겠습니까?"
      );
      if (confirmLeave) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center relative  md:px-[20%] items-center">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute md:left-[20%] left-4 "
          onClick={handleBack}
        />
        <h1 className="font-bold text-lg">프로필 수정</h1>
      </header>
      <main className="w-full min-h-screen bg-bg-peach p-4 md:px-[20%]">
        <div className="flex justify-center flex-col items-center mt-4">
          <img
            src={preview}
            alt="프로필 이미지"
            onClick={handleImageClick}
            className="w-[120px] h-[120px] rounded-[100px] md:w-[130px] md:h-[130px] cursor-pointer"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="font-bold text-sm mt-2 text-primary md:text-base">
            profile
          </p>

          <p className="text-xs text-bg-sub mt-1 md:text-sm">
            이미지를 눌러서 사진을 등록할 수 있어요!
          </p>
        </div>
        <div className="flex gap-3 items-center mb-2 mt-7  text-sm  md:text-base">
          <label
            htmlFor="nickName"
            className="font-bold text-primary  w-[50px] "
          >
            닉네임
          </label>
          <input
            id="nickName"
            name="nickName"
            type="text"
            placeholder="본인의 닉네임"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              validate("nickname", e.target.value);
              setIsDirty(true);
            }}
            className={
              "focus:outline-none w-full border-b p-2 rounded-md bg-white/60 border-b-gray-200"
            }
          />
        </div>
        {formError.nickname && (
          <p className="text-purple-800 text-xs mt-2 mb-2 md:ml-16 ml-14">
            {formError.nickname}
          </p>
        )}
        <div className="flex gap-3 items-center  text-sm  md:text-base">
          <label
            htmlFor="profileInfo"
            className="font-bold text-primary  w-[50px]"
          >
            소개글
          </label>
          <input
            id="profileInfo"
            name="profileInfo"
            placeholder="본인을 소개해주세요"
            type="text"
            value={introduction}
            onChange={(e) => {
              setIntroduction(e.target.value);
              validate("introduction", e.target.value);
              setIsDirty(true);
            }}
            className={
              "focus:outline-none w-full border-b p-2 rounded-md bg-white/60 border-b-gray-200"
            }
          />
        </div>
        {formError.introduction && (
          <p className="text-purple-800 text-xs mt-2 mb-2 md:ml-16 ml-14">
            {formError.introduction}
          </p>
        )}
        <div className="justify-end mt-4 flex">
          <Button onClick={handleSave}>저장하기</Button>
        </div>
      </main>
    </>
  );
}
