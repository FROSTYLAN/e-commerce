import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addCartThunk, getProductsThunk} from '../redux/actions';
import "../styles/products.css"

const Products = () => {

    const { id } = useParams()
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ quantity, setQuantity] = useState(0);
    const [ button, setButton ] = useState(0);

    const changeImgRight = () => {
        if (button < 2) {
            setButton(button + 1);
        }
    }
    const changeImgLeft = () => {
        if (button > 0) {
            setButton(button - 1)
        }
    }

    useEffect(() => {
        dispatch(getProductsThunk())
    },[dispatch ])
    const productsFound = products.find(productsItem => productsItem.id === Number(id))
    
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
            .then(res => setProductsFiltered(res.data.data.products))
            }, [productsFound?.category.id])

    const addCart = () => {
        const productCart = {id, quantity};
        dispatch(addCartThunk(productCart));
    }

    return (
        <div className='content'>
            <section className='product-detail main-container'>
                <div className="product-info-flex">
                    <div className="col">
                        <figure className='images-gallery'>
                            <div className="gallery">
                                <div className='button-gallery left'>
                                    <button onClick={() => changeImgLeft()}>
                                        <i class="fa-solid fa-angle-left"></i>
                                    </button>
                                </div>
                                <div className='button-gallery right'>
                                    <button onClick={() => changeImgRight()}>
                                        <i class="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                                <ul 
                                    className='images-list' 
                                    style={
                                            button === 0 ? { width: "300%", transform: "translateX(0%)" } 
                                            : button === 1 ? { width: "300%", transform: "translateX(-33.3%)" } 
                                            : button === 2 ? { width: "300%", transform: "translateX(-66.6%)" } : ""}
                                >
                                    {
                                        productsFound?.productImgs.map(productImgs => (
                                            <li key={productImgs}>
                                                <img src={productImgs} alt="" />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </figure>
                    </div>
                    <div className="col">
                        <div className="product-info">
                            <div className="brand">
                            </div>
                            <h2>{productsFound?.title}</h2>
                            <div className='product-data'>
                                <div className="product-options">
                                    <div className="flex">
                                        <div className="price">
                                            <span className="label">
                                                Price
                                            </span>
                                            <span className="amount">
                                                $ {productsFound?.price}
                                            </span>
                                        </div>
                                        <div className="quantity">
                                            <div className="label">Quantity</div>
                                            <div className="flex">
                                                <button onClick={() => setQuantity(quantity - 1)}>
                                                    <i class="fa-thin fa-minus"></i>
                                                </button>
                                                <div className="value">
                                                    {quantity}
                                                </div>
                                                <button onClick={() => setQuantity(quantity + 1)}>
                                                    <i class="fa-thin fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="add-cart-button" onClick={addCart}>
                                        Add to cart
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                                <p className="product-description">
                                    {productsFound?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="suggestions">
                    <strong>Discover similar items</strong>
                    <ul>

                        {
                            productsFiltered.map( product => (
                                <li key={product.id}>
                                    <div className='product-card'>
                                        <Link to={`/products/${product.id}`}>
                                            <figure>
                                                <img src={product.productImgs[0]} alt="" />
                                                <img src={product.productImgs[1]} alt="" className='over' />
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
                </div>
            </section>
        </div>
    )};

export default Products;