import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import "./Login.css"
import "./Cart.css"
import user from "./images/user.png"
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, getCartThunk, loginThunk } from '../../redux/actions';

const Navbar = () => {

    //const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState("")
    const [ signup, setSignup ] = useState(false)
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ isEmail, setIsEmail ] = useState("");
    const [ isPassword, setIsPassword ] = useState("");
    const [ phone, setPhone] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)

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

    const isSign = e => {
        e.preventDefault()
        const userData = {firstName, lastName, email:{isEmail}, password:{isPassword}, phone, role: "admin"}
        dispatch(loginThunk(userData))
            .then(res => {
                localStorage.setItem("token", res.data.data.token);
                setLoginError("");
                //setIsLoginOpen(false);
            })
            .catch(error => {
                setLoginError(error.response.data.message);
            })
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
                        <Link to="/purchases">
                            <i class="fa-solid fa-box-archive"></i>
                        </Link>
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
                                                    <button onClick={dispatch(deleteCart(product.id))}>
                                                        <i class="fa-solid fa-trash"></i>
                                                    </button>
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
                    {signup ?
                        <>
                            <form onSubmit={isSign} className="login">
                                <div className="input-container">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" name="email" onChange={e => setIsEmail(e.target.value)}/>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" name="firstName" onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" onChange={e => setIsPassword(e.target.value)}/>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="phone">Phone (10 characters)</label>
                                    <input type="tel" id="phone" name="phone" onChange={e => setPhone(e.target.value)}/>
                                </div>
                                <div className="error-message"></div>
                                <button className='submit-button'>Sign up</button>
                            </form>
                            <div className="switch-forms">
                                {signup ? "Have an account?" : "Don't have an account?"}
                                <button type='button' onClick={() => setSignup(!signup)}>{signup ? "Log in" : "Sign up"}</button>
                            </div>
                        </>
                        :
                        localStorage.getItem("token")? 
                        <>
                            <div className="user-info">
                                <b>Charles Castillo</b>
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
                                        frosty@gmail.com
                                    </div>
                                    <div className="field">
                                        <i class="fa-solid fa-lock"></i>
                                        frosty1234
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
                                <button className='submit-button'>Log in</button>
                            </form>
                            <div className="switch-forms">
                                {signup ? "Have an account?" : "Don't have an account?"}
                                <button type='button' onClick={() => setSignup(!signup)}>{signup ? "Log in" : "Sign up"}</button>
                            </div>
                        </>
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;