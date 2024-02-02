const Header = () => {
  return (
    <header
      className="
      sticky
      top-0
      flex
      flex-row
      justify-between
      p-5
      pt-8
      bg-ldark
    "
    >
      <div>[Logo] Every-IDE</div>
      <div className="flex flex-row gap-10">
        <div>Go Community</div>
        <div>usermenu</div>
      </div>
    </header>
  );
};

export default Header;
