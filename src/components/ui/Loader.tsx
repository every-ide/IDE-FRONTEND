const Loader = () => {
  return (
    <div className="absolute inset-0 bg-neutral-800/70 flex justify-center items-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-accent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Loader;
