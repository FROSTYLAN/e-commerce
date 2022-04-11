import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, getCategoryThunk, getProductsThunk } from '../redux/actions';
import '../styles/home/styles.css';


const Home = () => {

    const [ isFocusFilter, setIsFocusFilter ] = useState(false);
    const [ dropDownPrice, setDropDownPrice] = useState(false);
    const [dropDownCategory, setDropDownCategory] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoryThunk());
    }, [dispatch])

    return (
        <div className='home'>

            <div className="search-box">
                <button 
                    className={isFocusFilter ? "filter-button focus" : "filter-button"}
                    onClick={() => setIsFocusFilter(!isFocusFilter)}
                >
                    <i className="fa-solid fa-filter"></i>
                     Filters
                </button>
                <div className={isFocusFilter ? "filters-modal open" : "filters-modal" }>
                <button 
                    className={isFocusFilter ? "close" : "close focus"}
                    onClick={() => setIsFocusFilter(!isFocusFilter)}>
                    x
                </button>
                    <h5>Filters</h5>
                    <div className="filters">
                        <div
                            className={dropDownPrice ? "filter-drop-down closedContent" : "filter-drop-down"}
                        >
                            <div
                                onClick={() => setDropDownPrice(!dropDownPrice)} 
                                className={dropDownPrice ? "header closed" : "header"}
                            >
                                <span>Price</span>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className="content">
                                <form action="" className="price-filter">
                                    <label htmlFor="from">
                                        <span>From</span>
                                        <input type="number" />
                                    </label>
                                    <label htmlFor="to">
                                        <span>To</span>
                                        <input type="number" />
                                    </label>
                                    <button>Filter price</button>
                                </form>
                            </div>
                        </div>
                        <div 
                            className={dropDownCategory ? "filter-drop-down closedContent" : "filter-drop-down"}
                        >
                            <div
                                onClick={() => setDropDownCategory(!dropDownCategory)}
                                className={dropDownCategory ? "header closed" : "header"}
                            >
                                <span>Category</span>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className="content">
                                <ul className="category-filter">
                                    {
                                        categories.map(category => (
                                            <li key={category.id}
                                                onClick={() => {
                                                    dispatch(filterCategoryThunk(category.id));
                                                    setIsFocusFilter(!isFocusFilter)
                                                }}
                                                className={isFocusFilter ? "close" : null}
                                            >
                                                <span>
                                                    {category.name}
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>

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