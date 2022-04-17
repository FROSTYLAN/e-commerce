import React from 'react';
import { useSelector } from 'react-redux';
import "../styles/purchases.css";

const Purchases = () => {

    const purchase = useSelector(state => state.purchase)
    console.log(purchase);

    return (
        <div className='content'>
            <section className='main-container purchases'>
                <h1>My purchases</h1>
                {
                    purchase.map(purchase => (
                        <div className="purchase-item">
                            <div className="header">
                                <b>April 5, 2022</b>
                            </div>
                            <ul className="purchase-products-list">
                                <li className="product-item">
                                    <div className="image"></div>
                                    <div className="name">Samsung Galaxy S22</div>
                                    <div className="quantity">
                                        <div className="box">1</div>
                                    </div>
                                    <div className="price">
                                        $ 850
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ))
                }
            </section>
        </div>
    );
};

export default Purchases;