import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../redux/actions';

const Products = () => {

    const { id } = useParams()
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)

    const [ productsFiltered, setProductsFiltered ] = useState([]);

    useEffect(() => {
        dispatch(getProductsThunk())
    },[dispatch ])
    const productsFound = products.find(productsItem => productsItem.id === Number(id))
    console.log(productsFound)
    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
            .then(res => setProductsFiltered(res.data.data.products))
    }, [productsFound?.category.id])
    console.log(productsFiltered);

    return (
        <div>
            
        </div>
    );
};

export default Products;