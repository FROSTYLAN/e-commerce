import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import "./Login.css"
import "./Cart.css"
import user from "./images/user.png"
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, loginThunk } from '../../redux/actions';

const Navbar = () => {

    //const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    console.log(cart);

    const openCart = () => {
        setIsCart(!isCart);
        dispatch(getCartThunk())
    }

    const login = e => {
        e.preventDefault() 
        const credentials = {email, password}
        dispatch(loginThunk(credentials))
            .then(res => {
                localStorage.setItem("token", res.data.data.token);
                setLoginError("");
                //setIsLoginOpen(false);
            })
            .catch(error => {
                setLoginError(error.response.data.message);
            })
        /* En el local storage solo se guardan string*/
    }

    return (
        <div className='navbar'>
            <div className="fixed">
                <nav>
                    <Link to={"/"} className="title">
                        <strong>e-commerce</strong>
                    </Link>
                    <button className="icon" onClick={()=> setIsLogin(!isLogin)}>
                        <i class="fa-solid fa-user" style={isLogin ? { color: "#f85555" } : {color:""}}></i>
                    </button>
                    <button className="icon">
                        <i class="fa-solid fa-box-archive"></i>
                    </button>
                    <button className="icon" onClick={()=> openCart()}>
                        <i class="fa-solid fa-cart-arrow-down" style={isCart ? { color: "#f85555" } : { color: "" }}></i>
                    </button>
                </nav>
                <div className={isCart ? "cart-modal open" : "cart-modal"}>
                    <div className="cart">
                        <div className='minimalist-scrollbar'>
                            <h4>Carrito de compras</h4>
                            <ul className='cart-products-list'>
                                {
                                    cart.map(product => (
                                        <li key={product.id} onClick={() => navigate()}>
                                            <div className='product-info'>
                                                <div className='detail'>
                                                    <span className="brand">{product.brand}</span>
                                                    <Link className='name' to={`#/product/${product.id}`}>
                                                        {product.title}
                                                    </Link>
                                                    <div className="quantity">
                                                        {product.productsInCart.quantity}
                                                    </div>
                                                </div>
                                                <div className="button-delete">
                                                    <button><i class="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="label">Price: </span>
                                                <b>{product.price}</b>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="checkout-section">
                            <div className="total">
                                <span className='label'>Total:</span>
                                <b> $ 0 </b>
                            </div>
                            <button className='buy-button'>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
                <div className={isLogin ? "login-modal minimalist-scrollbar open" : "login-modal minimalist-scrollbar"}>
                    <img src={user} className="user-avatar" alt=''/>
                    {localStorage.getItem("token")? 
                        <>
                            <div className="user-info">
                                <b>John Doe</b>
                                <button onClick={() => localStorage.setItem("token", "")} type="button">Log out</button>
                            </div>
                        </>
                        :
                        <>
                            <form onSubmit={login} className="login">
                                <div className="test-data">
                                    <strong>Test data</strong>
                                    <div className="field">
                                        <i class="fa-solid fa-envelope"></i>
                                        john@gmail.com
                                    </div>
                                    <div className="field">
                                        <i class="fa-solid fa-lock"></i>
                                        john1234
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <p className="login-message">
                                    {loginError}
                                </p>
                                <button className='submit-button'>Login</button>
                            </form>
                            <div className="switch-forms">
                                Don't have an account?
                                <button type='button'>Sign up</button>
                            </div>
                        </>
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;