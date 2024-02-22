const EmptyStateCommunity = () => {
  return (
    <div className="flex h-[calc(100vh-151px)] flex-col items-center justify-center bg-red-200">
      <div className="rounded-xl border border-[#555] p-6 text-center text-neutral-200">
        <p>생성된 커뮤니티가 없습니다.</p>
        <p>
          <span className="font-black text-accent">EVERYIDE</span>와 함께 새로운
          동료들과 협업을 시작해보세요!
        </p>
      </div>
    </div>
  );
};

export default EmptyStateCommunity;
