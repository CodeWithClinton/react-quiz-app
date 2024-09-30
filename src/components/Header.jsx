import { TbCloudComputing } from "react-icons/tb"

function Header() {
  return (
    <header className='app-header'>
      <TbCloudComputing style={{fontSize: "100px"}} />
      {/* <img src='logo512.png' alt='React logo' /> */}
      <h1>The Django Quiz</h1>
    </header>
  );
}

export default Header;
