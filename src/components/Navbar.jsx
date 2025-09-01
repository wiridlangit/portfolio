import { useState, useEffect } from "react";

const Navbar = () => {
const  [active, setActive] = useState(false);
useEffect(() => {
const handleScroll = () => {
if (window.scrollY > 150) {
setActive(true);
} else {
setActive(false);
}
};
window.addEventListener("scroll", handleScroll);
return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []);

  return ( <div  className="navbar py-7 flex justify-between items-center">
    <div className="logo">
       <h1 className="text-3xl font-bold bg-white text-black p-1 md:bg-transparent md:text-white">Wiridlangit Portfolio</h1>
    </div>
    <ul className={`menu flex items-center sm:gap-10 gap-4 md:static fixed left-1/2 -translate-x-1/2 md:-translate-x-0 md:opacity-100 bg-white/30 backdrop-blur-md p-4 rounded-br-2xl rounded-bl-2xl md:bg-transparent transition-all md:transition-none z-40 ${active ? "top-0 opacity-100" : "top-[-10px] opacity-0"}`}>
        <li><a href="#home" className='sm:text-lg text-base font-medium hover:text-gray-400'>Home</a></li>
        <li><a href="#about" className='sm:text-lg text-base font-medium hover:text-gray-400'>About</a></li>
        <li><a href="#projects" className='sm:text-lg text-base font-medium hover:text-gray-400'>Projects</a></li>
        <li><a href="#certificates" className='sm:text-lg text-base font-medium hover:text-gray-400'>Certificates</a></li>
        <li><a href="#contact" className='sm:text-lg text-base font-medium hover:text-gray-400'>Contact</a></li>
    </ul>
  </div>
);
};

export default Navbar