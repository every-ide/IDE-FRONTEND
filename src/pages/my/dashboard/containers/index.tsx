import Header from "@components/my/Header";
import SearchBar from "@components/my/SearchBar";

const ContainerPage = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <SearchBar />
      <h1>all containers</h1>
    </div>
  );
};

export default ContainerPage;
