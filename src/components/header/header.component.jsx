import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/krm_commerce.svg';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <header className='header'>
        <Link to='/' className='logo-container'>
            <Logo/>
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/contact' className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div 
                className="option" 
                onClick={()=> signOut(auth)}
                >
                    SIGN OUT
                </div>
                :
                <Link to='/sign-in-and-sign-up' className='option'>
                    SIGN IN
                </Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ?
                null 
                : 
                <CartDropdown/>
        }
    </header>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);