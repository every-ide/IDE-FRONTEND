const EmptyState = () => {
  return (
    <div className="flex h-[calc(100vh-151px)] flex-col items-center justify-center">
      <div className="rounded-xl border border-[#555] p-6 text-center text-neutral-200">
        <p>생성된 컨테이너가 없습니다.</p>
        <p>
          <span className="font-black text-accent">EVERYIDE</span>와 함께 새로운
          작업을 시작해보세요!
        </p>
      </div>
    </div>
  );
};

export default EmptyState;