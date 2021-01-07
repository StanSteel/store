import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../hooks/useContextWithReducer';
import Container from '../components/Container';

import './Navbar.css';

import cart from '../assets/shopping-cart.svg';
import logo from '../assets/logo.svg';
import photo from '../assets/profile.svg';




const Navbar = props => {
    const { state: { wideSearch }, } = useContext(Context);

    let searchBar = (
        <div className={`search ${wideSearch ? 'search--products' : ''}`}>
            <input type="text" className={`mainpage-search ${wideSearch ? 'mainpage-search--products' : ''}`} placeholder={wideSearch ? 'BlackBird 72, Levi’s 1965, Nike 707 etc...' : 'search'} />
            <img src="../assets/search-icon.svg" alt="" className={wideSearch ? 'search-icon--products' : ''} />
        </div>
    );

    return (
        <>
            <nav className={wideSearch ? 'nav--products' : ''}>
                <Container >
                    <div className="left">
                        <NavLink to="/" activeClassName="active"><img src={logo} alt="Main Logo on the site" /></NavLink>
                    </div>
                    <div className="middle">
                        <ul>
                            <li><NavLink to="/signup">SignUp</NavLink></li>{/* Collection */}
                            <li><NavLink to="/signin">Sign in</NavLink></li>{/* New Releases */}
                            <li><NavLink to="/products">Products</NavLink></li> {/* Kids */}
                            <li>Promotions</li>
                        </ul>
                        {wideSearch && searchBar}
                    </div>
                    <div className="right">
                        {wideSearch || searchBar}
                        <div className='profile'><img src={photo} alt="Profile svg icon" /></div>
                        <div className="cart"><img src={cart} alt="Cart svg icon" /></div>
                    </div>
                </Container>
            </nav>
        </>
    )
}

export default Navbar;
