import { useNavigate } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../assets/analytics.svg";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-14 bg-white border-r-[1px] border-blueGrey px-2 py-4 flex justify-center"
      onClick={() => navigate("/")}
    >
      <div className="h-10 p-2 rounded-md cursor-pointer bg-lightGreen hover:bg-lightGrey  transition">
        <DashboardIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Sidebar;
