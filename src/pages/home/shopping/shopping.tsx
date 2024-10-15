import React, { useEffect, useState } from "react";
import styles from "./shopping.module.scss";
import { useParams } from "react-router-dom";
import { ProductI } from "../../../modals/productModal";
import ProductsContainer from "../../../containers/products-container/products-container";
import { getProducts } from "../../../services/productServices";
import SplitContainer from "../../../containers/split-container/split-container";
import CartContainer from "../../../containers/cart-container/cart-container";
import { CartItemI } from "../../../modals/cartModal";

export default function Shopping() {
  const { categoryId } = useParams();
  const [prodcuts, setProducts] = useState<ProductI[] | undefined>(undefined);
  const [cart, setCart] = useState<CartItemI[] | undefined>(undefined);

  console.log(cart);

  const isEmptyCart = cart?.length == 0;

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts(categoryId);
      setProducts(result);
    }
    fetchData();
  }, [categoryId]);

  return (
    <div className={styles["shopping-page"]}>
      {/* <SplitContainer
        leftContainer={<ProductsContainer products={prodcuts} />}
        rightContainer={<></>}
        isEmptyCart={isEmptyCart}
      /> */}
      <ProductsContainer
        products={prodcuts}
        isEmptyCart={isEmptyCart}
        setCart={setCart}
        cart={cart}
      />
      <CartContainer cart={cart}/>
    </div>
  );
}
