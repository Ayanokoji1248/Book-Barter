import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem('token');

    const commonNavItems = ['Browse'];
    const protectedNavItems = ['Add', 'Requests', 'Profile'];

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Logo />

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-8 transition-all duration-300">
                    {commonNavItems.map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 transition-all duration-300"
                                    : "text-gray-700 hover:text-blue-600 transition-all duration-300"
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                    {token &&
                        protectedNavItems.map((item) => (
                            <NavLink
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold border-b-2 border-blue-600 transition-all duration-300"
                                        : "text-gray-700 hover:text-blue-600 transition-all duration-300"
                                }
                            >
                                {item}
                            </NavLink>
                        ))
                    }
                    {token && (
                        <Button variant="danger" text="Logout" onClick={Logout} />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-3 bg-white px-4 pb-4">
                    {commonNavItems.map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-fit text-blue-600 font-semibold border-b-2 border-blue-600 transition-all"
                                    : "w-fit text-gray-700 hover:text-blue-600 transition-all"
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                    {token && protectedNavItems.map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-fit text-blue-600 font-semibold border-b-2 border-blue-600 transition-all"
                                    : "w-fit text-gray-700 hover:text-blue-600 transition-all"
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                    {token && <Button variant="danger" text="Logout" onClick={Logout} />}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
