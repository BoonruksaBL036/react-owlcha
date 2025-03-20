import product from "../assets/product-json/owlcha.json"

export const getAllProductBymenuId = (menuId) => {
    return product.products.filter((item) => item.menuId == menuId)
}