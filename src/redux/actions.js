// 1. Declarar la propiedad en el objeto actions.
// 2. Crear el case con la propiedad creada en 1.
// 3. Hacer la función que retorne la accion.
// 4. Despachar la función en un componente o thunk.

import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART"
}

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})  
export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})
export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})
export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const getCategoryThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => dispatch(setCategories(res.data.data.categories)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}
export const filterProductNameThunk = productName => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${productName}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const addCartThunk = productCart => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productCart, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
            .then(res => dispatch(setCart(res.data.data.cart.products)))
            .catch(error => {
                if(error.response.status === 404) {
                    dispatch(setCart([]))
                }
            })
            .finally(() => dispatch(setIsLoading(false)))
    }
}