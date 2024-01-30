import Header from "../../../../components/mycontainer/Header";
import SearchBar from "../../../../components/mycontainer/SearchBar";

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
