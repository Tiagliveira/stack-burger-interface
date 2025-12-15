import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvaider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const updateLocalStorage = (products) => {
        localStorage.setItem('devburg:cartInfo', JSON.stringify(products));
    };

    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);
        let newProductInCart = [];

        if (cartIndex >= 0) {
            newProductInCart = cartProducts;
            newProductInCart[cartIndex].quantity =
                newProductInCart[cartIndex].quantity + 1;
            setCartProducts(newProductInCart);
        } else {
            product.quantity = 1;
            newProductInCart = [...cartProducts, product];
            setCartProducts(newProductInCart);
        }

        updateLocalStorage(newProductInCart);
    };

    const clearCart = () => {
        setCartProducts([]);
        updateLocalStorage([]);
    };

    const deleteProduct = (productId) => {
        const newCart = cartProducts.filter((prd) => prd.id !== productId);
        setCartProducts(newCart);
        updateLocalStorage(newCart);
    };

    const increaseProduct = (productId) => {
        const newCart = cartProducts.map((prd) => {
            return prd.id === productId
                ? { ...prd, quantity: prd.quantity + 1 }
                : prd;
        });
        setCartProducts(newCart);
        updateLocalStorage(newCart);
    };

    const decreaseProduct = (productId) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

        if (cartProducts[cartIndex].quantity > 1) {
            const newCart = cartProducts.map((prd) => {
                return prd.id === productId
                    ? { ...prd, quantity: prd.quantity - 1 }
                    : prd;
            });
            setCartProducts(newCart);
            updateLocalStorage(newCart);
        } else {
            deleteProduct(productId);
        }
    };


    const updateProductObservation = (productId, newObservation) => {
        const newCart = cartProducts.map((product) => {
            return product.id === productId
                ? { ...product, observation: newObservation }
                : product;
        });

        setCartProducts(newCart);
        updateLocalStorage(newCart);
    };


    useEffect(() => {
        const clientCartData = localStorage.getItem('devburg:cartInfo');
        if (clientCartData) {
            setCartProducts(JSON.parse(clientCartData));
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                putProductInCart,
                clearCart,
                deleteProduct,
                increaseProduct,
                decreaseProduct,
                updateProductObservation,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const UseCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used with a context');
    }

    return context;
};
