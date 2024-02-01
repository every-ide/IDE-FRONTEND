import Header from "@components/my/Header";
import SearchBar from "@components/my/SearchBar";

const ContainerPage = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <SearchBar />
      <h1>all containers</h1>
      <button
        onClick={() => {}}
        className="bg-mdark p-3 rounded-lg border-[2px] border-accent"
      >
        logout
      </button>
    </div>
  );
};

export default ContainerPage;
