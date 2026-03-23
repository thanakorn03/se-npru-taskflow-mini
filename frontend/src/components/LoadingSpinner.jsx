const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-base-content/40">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
