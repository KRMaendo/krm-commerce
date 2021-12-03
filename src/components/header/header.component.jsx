import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { ReactComponent as Logo } from '../../assets/krm_commerce.svg';
import { signOut } from 'firebase/auth';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink 
                as='div' 
                onClick={()=> signOut(auth)}
                >
                    SIGN OUT
                </OptionLink>
                :
                <OptionLink to='/sign-in-and-sign-up' className='option'>
                    SIGN IN
                </OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ?
                null 
                : 
                <CartDropdown/>
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);