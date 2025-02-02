import Card from "./Card";

const CommonChartCardLayout = ({ icon, text, content }) => {
  return (
    <Card>
      <div className="flex gap-2 items-center">
        {icon}
        <span className="text-lg font-semibold">{text}</span>
      </div>
      <div className="mt-4">{content}</div>
    </Card>
  );
};

export default CommonChartCardLayout;
