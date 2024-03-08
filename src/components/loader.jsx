import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center pt-10">
      <InfinitySpin
        visible={true}
        width="170"
        color="#3B82F6"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
