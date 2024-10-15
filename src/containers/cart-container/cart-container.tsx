import styles from "./cart-container.module.scss";
import CartSection from "../../components/cart-section/cart-section";
import { CartItemI, WishlistItemI } from "../../modals/cartModal";

interface CartContainerPropsI {
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
  wishlist: WishlistItemI[] | undefined;
  setWishlist: React.Dispatch<
    React.SetStateAction<WishlistItemI[] | undefined>
  >;
}

export default function CartContainer({
  cart,
  setCart,
  wishlist,
  setWishlist,
}: CartContainerPropsI) {
  return (
    <section className={styles["cart-container"]}>
      <CartSection
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />
    </section>
  );
}
