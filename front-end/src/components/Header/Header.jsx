import { NavLink } from "react-router"
import './Header.scss'

const Header = () => {
  return (
    <header>
        <nav>
            <ul className='menu-list'>
                <li>
                    <NavLink to='/'>
                        home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/cities'>
                        cities
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header