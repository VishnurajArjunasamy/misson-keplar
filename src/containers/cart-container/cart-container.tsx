import styles from "./cart-container.module.scss";
import CartSection from "../../components/cart-section/cart-section";
import { CartItemI } from "../../modals/cartModal";

interface CartContainerPropsI {
  cart: CartItemI[] | undefined;
  setCart: React.Dispatch<React.SetStateAction<CartItemI[] | undefined>>;
}

export default function CartContainer({ cart, setCart }: CartContainerPropsI) {
  return (
    <section className={styles["cart-container"]}>
      <CartSection cart={cart} setCart={setCart} />
    </section>
  );
}
