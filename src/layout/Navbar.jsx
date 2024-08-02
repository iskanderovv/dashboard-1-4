import { useState } from "react";
import { Link } from "react-router-dom"
import { Badge } from 'antd';
import { useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const data = useSelector(state => state.cart);
  
  return (
    <div className="bg-[#f8f8fa]">
      <nav className="max-w-[1200px] mx-auto px-5 h-20 items-center flex justify-between">
        <Link to="/" className="text-3xl italic">Ai.Dev</Link>
        <ul className="flex justify-between w-1/6">
          <Link to="/cart" className="relative">
            Cart <Badge className="absolute -top-2" count={show ? data.length : 0} />
          </Link>
          <div className="flex gap-4">
            <Link to="/auth">Login</Link>
            <Link to="/auth/register">Register</Link>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
