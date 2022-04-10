// 1. Declarar la propiedad en el objeto actions.
// 2. Crear el case con la propiedad creada en 1.
// 3. Hacer la función que retorne la accion.
// 4. Despachar la función en un componente o thunk.

import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING"
}

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})  
export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}