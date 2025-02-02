import { useNavigate } from "react-router-dom";
import { ReactComponent as AppLogo } from "../../assets/app-logo.svg";
import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-3 bg-darkGrey">
      <div
        className="flex items-center gap-2 text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AppLogo className="w-6 h-6" />
        <h1 className="text-xl font-roboto">Weather Dashboard</h1>
      </div>
      <ProfileLogo className="w-6 h-6" />
    </div>
  );
};

export default Header;
