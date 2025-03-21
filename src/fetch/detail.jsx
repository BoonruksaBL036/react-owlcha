import detail from "../assets/product-json/owlcha.json"
export const getAllTopping = () => {
    return detail.topping.filter(item => item);
}
export const getAllToppingById = (id) => {
    return detail.topping.find(item => item.id == id);
}

export const getAllSweet = () => {
    return detail.sweet.filter(item => item);
}