import Header from "@components/my/Header";
import SearchBar from "@components/my/SearchBar";
import useLogout from "@src/hooks/useLogout";

const ContainerPage = () => {
  const logout = useLogout();

  return (
    <div className="container mx-auto">
      <Header />
      <SearchBar />
      <h1>all containers</h1>

      {/* test용 임시 로그아웃 버튼 */}
      <button
        onClick={logout}
        className="bg-mdark p-3 rounded-lg border-[2px] border-accent"
      >
        logout
      </button>
    </div>
  );
};

export default ContainerPage;
