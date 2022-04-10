import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../redux/actions';
import '../styles/home/styles.css';


const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())  ;
    }, [dispatch])

    console.log(products);

    return (
        <div className='home'>

            <div className='main-container'>
                <ul className='products-list'>
                    {
                        products.map(product => (
                            <li key={product.id}>
                                <div className='product-card'>
                                    <a href='https://www.youtube.com/watch?v=4pPMt6ZhCa4'>
                                        <figure>
                                            <img src={product.productImgs} alt="" />
                                        </figure>
                                        <div className='info'>
                                            <span className='brand'>
                                                {product.title}
                                            </span>
                                            <span className='price'>Price</span>
                                            <span className='amount'>
                                                ${product.price}
                                            </span>
                                        </div>
                                    </a>
                                    <button>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;