import { ReactComponent as DesktopIcon } from "../assets/desktop.svg";
const SmallScreenWarning = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <DesktopIcon className="w-60 h-60" />
      <div className="text-base text-darkGrey">
        We recommend using bigger screens to view charts
      </div>
    </div>
  );
};

export default SmallScreenWarning;
