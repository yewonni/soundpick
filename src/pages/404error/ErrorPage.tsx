import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <h1 className="text-6xl font-extrabold text-purple-600 mb-4">404</h1>
      <p className="text-xl font-semibold text-center">
        페이지를 찾을 수 없습니다.
      </p>
      <p className="text-gray-500 text-center max-w-xs mb-6">
        잘못된 주소로 접근하셨거나, 페이지가 삭제되었을 수 있습니다.
      </p>
      <div className="px-4 w-full">
        <Button size="full" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
