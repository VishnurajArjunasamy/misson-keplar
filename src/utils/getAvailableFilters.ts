import { BlogWithIdIF } from "../modals/blog-list-modal";
import { FiltersApplied } from "../modals/blog-list-modal";

/**
 * Get Available Blog Types and returns an object with blog type and boolean
 * @param data
 * @returns blog type and a true  as key value pair for all blog types
 * {
 * 'national':true
 * 'international':true
 * }
 */
export function getAvailableFilters(data: BlogWithIdIF[]) {
  const filters: FiltersApplied = {};
  data?.forEach((blog) => {
    filters[blog.type] = true;
  });
  return filters;
}
