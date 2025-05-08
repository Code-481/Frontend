
import deulogo from "../../../assets/image/logo-symbol-01.png";

function Topnav() {
    return (
        <div className="flex p-4 line_nav">
            <img src={deulogo} className="h-8 pr-4" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Deu Info Service</span>
        </div>
        
    )
}

export default Topnav;