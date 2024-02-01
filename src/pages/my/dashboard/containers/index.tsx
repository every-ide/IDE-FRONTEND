import Header from "@components/my/Header";
import SearchBar from "@components/my/SearchBar";
import LinkPage from "@src/components/LinkPage";

const ContainerPage = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <SearchBar />
      <h1>all containers</h1>
      <br />
      <LinkPage />
    </div>
  );
};

export default ContainerPage;
