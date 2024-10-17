import React, { useEffect, useState } from "react";
import styles from "./shopping.module.scss";
import { useParams } from "react-router-dom";
import { ProductI } from "../../modals/productModal";
import ProductsContainer from "../../containers/products-container/products-container";
import { getProducts } from "../../services/productServices";
import CartContainer from "../../containers/cart-container/cart-container";
import { CartItemI, WishlistItemI } from "../../modals/cartModal";
import Loader from "../../components/loader/loader";

export default function Shopping() {
  const { categoryId } = useParams();
  const [prodcuts, setProducts] = useState<ProductI[] | undefined>(undefined);
  const [cart, setCart] = useState<CartItemI[] | undefined>(undefined);
  const [whishlist, setWishlist] = useState<WishlistItemI[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("cart ->", cart);
  console.log("wishlist ->", whishlist);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      const result = await getProducts(categoryId, abortController);
      setProducts(result);
      setIsLoading(false);
    }
    fetchData();

    return () => {
      setIsLoading(true);
      abortController.abort();
    };
  }, [categoryId]);

  const showCartContainer =
    (cart && cart.length > 0) || (whishlist && whishlist.length > 0);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles["shopping-page"]}>
      <ProductsContainer
        products={prodcuts}
        setCart={setCart}
        cart={cart}
        wishlist={whishlist}
        setWishlist={setWishlist}
      />
      {showCartContainer && (
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
