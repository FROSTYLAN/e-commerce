import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoryThunk, filterProductNameThunk, getCategoryThunk, getProductsThunk } from '../redux/actions';
import '../styles/home/styles.css';


const Home = () => {

    const [ isFocusFilter, setIsFocusFilter ] = useState(false);
    const [ dropDownPrice, setDropDownPrice] = useState(false);
    const [dropDownCategory, setDropDownCategory] = useState(false);

    const [ productName, setProductName] = useState("");

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoryThunk());
    }, [dispatch])

    const searchProducts = e => {
        e.preventDefault();
        console.log(productName);
        dispatch(filterProductNameThunk(productName));
    }

    return (
        <div className='home'>

            <aside>
                <div className="fixed-filters">
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
            </aside>

            <section className='main-container'>
                <div className="search-box">
                    <form onSubmit={searchProducts} class="input">
                        <input 
                            type="text" 
                            placeholder='What are you looking for?'
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                        />
                        <button>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <button
                        className={isFocusFilter ? "filter-button focus" : "filter-button"}
                        onClick={() => setIsFocusFilter(!isFocusFilter)}
                    >
                        <i className="fa-solid fa-filter"></i>
                        Filters
                    </button>
                    <div className={isFocusFilter ? "filters-modal open" : "filters-modal"}>
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
                <ul className='products-list'>
                    {
                        products.map(product => (
                            <li key={product.id}>
                                <div className='product-card'>
                                    <Link to={`/products/${product.id}`}>
                                        <figure>
                                            <img src={product.productImgs[0]} alt="" />
                                            <img src={product.productImgs[1]} alt="" className='over'/>
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
                                    </Link>
                                    <button>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    );
};

export default Home;