const Footer = () => {
  return (
    <div className="py-4 mt-32 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 mb-2">
            <a href="https://github.com/wiridlangit">
                <i className="ri-github-fill text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/wiridlangit">
                <i className="ri-linkedin-fill text-2xl"></i>
            </a>
        </div>
        <div className="flex gap-7 mb-2">
            <a href="#home" className="hover:text-gray-400">Home</a>
            <a href="#about" className="hover:text-gray-400">About</a>
            <a href="#projects" className="hover:text-gray-400">Projects</a>
            <a href="#certificates" className="hover:text-gray-400">Certificates</a>
        </div>
        <h1 className="text-2xl font-bold mt-2 text-center">
            Wiridlangit Portfolio 😁✌️ 2025
        </h1>
    </div>
  )
}

export default Footer