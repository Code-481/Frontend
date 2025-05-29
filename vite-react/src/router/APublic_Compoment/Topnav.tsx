import { useNavigate } from "react-router";

import deulogo from "../../assets/image/logo-symbol-01.png";

function Topnav() {
  const navigate = useNavigate();
  function hadle() {
    navigate("/dashboard");
  }
  return (
    <nav className="flex p-4 line_nav" onClick={() => hadle()}>
      <img src={deulogo} className="h-8 pr-4" />
      <p className="text-2xl font-semibold dark:text-white">Deu Info Service</p>
    </nav>
  );
}

export default Topnav;
