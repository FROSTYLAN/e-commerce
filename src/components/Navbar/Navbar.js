import React, { useState } from 'react';
import "./Navbar.css"
import "./Login.css"
import "./Cart.css"
import user from "./images/user.png"

const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isCart, setIsCart] = useState(false);

    return (
        <div className='navbar'>
            <div className="fixed">
                <nav>
                    <div class="title">
                        <strong>e-commerce</strong>
                    </div>
                    <button className="icon" onClick={()=> setIsLogin(!isLogin)}>
                        <i class="fa-solid fa-user"></i>
                    </button>
                    <button className="icon">
                        <i class="fa-solid fa-box-archive"></i>
                    </button>
                    <button className="icon" onClick={()=> setIsCart(!isCart)}>
                        <i class="fa-solid fa-cart-arrow-down"></i>
                    </button>
                </nav>
                <div className={isCart ? "cart-modal open" : "cart-modal"}>
                    <div className="cart">
                        <div className='minimalist-scrollbar'>
                            <h4>Carrito de compras</h4>
                            <ul className='cart-products-list'>

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
                    <img src={user} alt="" className='user-avatar'/>
                    <div className="user-info">
                        <b>John Doe</b>
                        <button>Log out</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;