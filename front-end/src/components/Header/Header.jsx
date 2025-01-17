import { useState } from 'react'
import { NavLink } from 'react-router'
import './Header.scss'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

  return (
    <header>
        <nav>
            <button className='hamburger' onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to='/' onClick={closeMenu}>
                        home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/cities' onClick={closeMenu}>
                        cities
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header