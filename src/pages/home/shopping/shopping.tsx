import React, { useEffect, useState } from "react";
import styles from "./shopping.module.scss";
import { useParams } from "react-router-dom";
import { ProductI } from "../../../modals/productModal";
import ProductsContainer from "../../../containers/products-container/products-container";
import { getProducts } from "../../../services/productServices";
import CartContainer from "../../../containers/cart-container/cart-container";
import { CartItemI, WishlistItemI } from "../../../modals/cartModal";

export default function Shopping() {
  const { categoryId } = useParams();
  const [prodcuts, setProducts] = useState<ProductI[] | undefined>(undefined);
  const [cart, setCart] = useState<CartItemI[] | undefined>(undefined);
  const [whishlist, setWishlist] = useState<WishlistItemI[] | undefined>(
    undefined
  );

  console.log(cart);

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts(categoryId);
      setProducts(result);
    }
    fetchData();
  }, [categoryId]);

  return (
    <div className={styles["shopping-page"]}>
      <ProductsContainer
        products={prodcuts}
        setCart={setCart}
        cart={cart}
        wishlist={whishlist}
        setWishlist={setWishlist}
      />
      {cart && cart?.length > 0 && (
        <CartContainer
          cart={cart}
          setCart={setCart}
          wishlist={whishlist}
          setWishlist={setWishlist}
        />
      )}
    </div>
  );
}
