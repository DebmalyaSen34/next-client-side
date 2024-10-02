import react from "react";

export function useCart() {
    const [cart, setCart] = react.useState({});

    react.useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const addCart = (item) => {
        const newCart = { ...cart };
        if (newCart[item.dishName]) {
            newCart[item.dishName].quantity += 1;
        } else {
            newCart[item.dishName] = { ...item, quantity: 1 };
        }
        updateCart(newCart);
    };

    const removeCart = (itemName) => {
        const newCart = { ...cart };
        if (newCart[itemName].quantity > 1) {
            newCart[itemName].quantity -= 1;
        } else {
            delete newCart[itemName];
        }
        updateCart(newCart);
    };

    const clearCart = () => {
        updateCart({});
    };

    const getTotalItems = () => {
        return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return {
        cart,
        addCart,
        removeCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
    };
}