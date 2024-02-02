import Header from "@components/my/Header";
import SearchBar from "@components/my/SearchBar";
import Sidebar from "@src/components/my/Sidebar";
import useLogout from "@src/hooks/useLogout";

const ContainerPage = () => {
  const logout = useLogout();

  return (
    <div className="container-lg h-dvh bg-mdark">
      <Header />
      <div className="flex flex-row h-[calc(100vh-80px)]">
        <Sidebar />
        <div>
          <SearchBar />
          Container zone
          {/* test용 임시 로그아웃 버튼 */}
          <button
            onClick={logout}
            className="bg-mdark p-3 rounded-lg border-[2px] border-accent"
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerPage;
