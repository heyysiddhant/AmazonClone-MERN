import './styles/Header.css'
import {Search, ShoppingBasket} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {Link} from 'react-router-dom';
import useStateValue from '../StateProvider'
import {auth} from '../firebase-auth';
import {useNavigate} from 'react-router-dom';

function Header() {
    const nav = useNavigate()

    const [
        {
            basket,
            user
        }, dispatch
    ] = useStateValue();

    function handleAuth() {
        if (user) {
            auth.signOut();
            dispatch({type: 'UNSET_USER'})
            nav('/')
        }
    }


    return (
        <div className='header'>

            <Link to="/">
                <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='' className='header__logo'/>
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' placeholder='search...'/>
                <Search className="header__searchIcon"/>
            </div>

            <div className='header__nav'>

                <div className='header__option'>
                    <span>Hello {user?.email || "Guest" } </span>
                    <Link to={ !user && "/login"}>
                        <span className='header__option_link'onClick={handleAuth}>
                            { user ? "Sign Out" : "Sign In"}
                             </span>
                    </Link>
                </div>

                <div className='header__option'>
                    <span>Returs</span>

                    <Link to={ user ? "/orders" : "/login"}>
                        <span className='header__option_link'>&amp; Orders</span>
                    </Link>

                </div>

                {/* <div className='header__option'>
                    <span>Your</span>
                    <span className='header__option_link'>
                        Prime</span>
                </div> */}

                <div className='header__option_basket'>

                    <IconButton component={Link}
                        to={
                            user ? "/checkout" : '/login'
                    }>
                        <ShoppingBasket color='primary'/>
                    </IconButton>

                    <span className='header__option_basketCount'>
                        {
                        basket.length
                    }</span>

                </div>

            </div>

        </div>
    )
}

export default Header
