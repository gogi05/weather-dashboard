import SkeletonLoader from "../../../components/SkeletonLoader";

const OverviewPageSkeleton = () => {
  return (
    <div className="p-6 bg-lightGrey h-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="mb-5">
          <SkeletonLoader width="240px" height="36px" />
        </div>
      </div>
      <div className="mb-3 flex gap-3">
        <SkeletonLoader width="240px" height="40px" />
        <SkeletonLoader width="240px" height="40px" />
      </div>
      <div className="mt-3 grid lg:grid-cols-2 gap-4">
        <SkeletonLoader width="100%" height="360px" />
        <SkeletonLoader width="100%" height="360px" />
        <SkeletonLoader width="100%" height="360px" />
      </div>
    </div>
  );
};

export default OverviewPageSkeleton;
