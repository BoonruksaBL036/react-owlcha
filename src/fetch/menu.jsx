import owlcha from "../assets/product-json/owlcha.json"

export const getAllMenu =  () => {
    return owlcha.menu.filter((menu) => menu)
}