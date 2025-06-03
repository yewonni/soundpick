import { useState } from "react";
import HamburgerMenu from "../../components/HamburgerMenu";
import useMediaQuery from "../../hooks/useMediaQuery";
import ProfileHeader from "./component/ProfileHeader";
import MyAllTimeHitsPreview from "./component/MyAllTimeHitsPreview";
import MyActivityPreview from "./component/MyActivityPreview";
import MyPlaylistPreview from "./component/MyPlaylistPreview";
import LikedPlaylistsPreview from "./component/LikedPlaylistsPreview";

export default function MyPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen">
      <ProfileHeader onClick={handleMenuOpen} />
      <main className="w-full min-h-screen bg-bg-peach pt-6 md:pt-10 pb-11 flex flex-col gap-6 items-center md:px-[10%] md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4 md:grid md:grid-rows-2 md:gap-6 md:content-start w-full flex flex-col gap-6 items-center">
          <MyAllTimeHitsPreview isMobile={isMobile} />
          <MyActivityPreview isMobile={false} />
        </div>
        <div className=" md:col-span-8 md:grid md:grid-rows-2 md:gap-6 md:content-start w-full flex flex-col gap-6 items-center">
          <MyPlaylistPreview isMobile={isMobile} />
          <LikedPlaylistsPreview isMobile={isMobile} />
        </div>
        <MyActivityPreview isMobile={true} />
      </main>

      {/* Mobile Menu */}
      <div
        className={`fixed z-20 inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-80 visible" : "opacity-0 invisible"
        }`}
        onClick={handleMenuClose}
      ></div>
      <HamburgerMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </div>
  );
}
