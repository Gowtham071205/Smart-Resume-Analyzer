import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={()=>{
            navigate('/')
          }}>
            <img
              src="/logo.png"
              alt="ResuMate AI Logo"
              className="h-12 w-auto object-contain"
            />
          </button>
        </div>
      </div>
    </header>
  );
}