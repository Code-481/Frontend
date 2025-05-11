
import deulogo from "../../assets/image/logo-symbol-01.png";

function Topnav() {
    return (
        <nav className="flex p-4 line_nav">
            <img src={deulogo} className="h-8 pr-4"/>
            <p className="text-2xl font-semibold dark:text-white">Deu Info Service</p>
        </nav>
        
    )
}

export default Topnav;