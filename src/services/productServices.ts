import axios from "axios";
import { HttpResponse } from "../modals/httpResponseModal";
import { ProductI, ProductCategoryI } from "../modals/productModal";

/**
 *
 * @returns The `getProductCategories` function is returning the prodcut categories available
 *
 */
export async function getProductCategories() {
  try {
    const data = await axios.get<ProductCategoryI[]>(
      "https://jsonmockserver.vercel.app/api/shopping/furniture/categories"
    );

    return data.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {string} catId - The `catId` parameter is denoting the category type of the products to be fetched
 *
 * @returns The function `getProducts` is returning the set of prodcuts based on the catId.
 *
 */

export async function getProducts(catId: string) {
  try {
    const data = await axios.get<HttpResponse<ProductI>>(
      `https://jsonmockserver.vercel.app/api/shopping/furniture/products?category=${catId}`
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
}
