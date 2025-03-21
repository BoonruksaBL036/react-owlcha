import React, { useEffect, useRef } from "react";
import Navbar from "../assets/component/navbar";
import { useState } from "react";
import { getAllProductBymenuId } from "../fetch/Product";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeForCart } from "../redux/store";
import "../assets/css/shop.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Popup from "../assets/component/Popup";
import { MdDelete } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(false);
  const [details, setDetails] = useState({ topping: [], sweet: 0 });

  const handleSubmit = (product) => {
    const newProduct = {
      ...product,
      topping: details.topping, // ดึง topping จาก Popup
      sweet: details.sweet, // ดึง sweet level จาก Popup
    };
    dispatch(addToCart(newProduct));
    setPopup(false);
  };
  const handleexportpdf = () => {
    const doc = new jsPDF();
    doc.setFont("Kanit-Regular", "normal");
    const tableColum = ["product", "quantity", "price", "total"];
    const tableRow = cart.map((product) => [
      product.name,
      product.quantity,
      `${product.price}Baht`,
      `${product.total} Baht`,
    ]);
    tableRow.push(["Total Price", "", "", `${cartList.total}Baht`]);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" + currentDate.getDate()
    ).slice(-2)}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}`;

    doc.setFontSize(10);
    doc.text(`Date: ${formattedDate}`, 10, 10);
    doc.text(`Thank you!`, 180, 10);
    autoTable(doc, {
      head: [tableColum],
      body: tableRow,
      startY: 20,
    });
    doc.save(`bill-${formattedDate}.pdf`);
  };

  useEffect(() => {
    if (popup) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [popup]);

  useEffect(() => {
    setProduct(getAllProductBymenuId(id));
    setCart(cartList.products);
  }, [cartList]);
  return (
    <div className="container">
      <Navbar name={keyword} />
      <div className="shop-screen">
        <div className="card-container">
          {product.map((item) => (
            <div key={item.id} className="card">
              <div className="box-image">
                <img
                  className="product-image"
                  src={`/src/assets/image/${keyword}/${item.image}`}
                  alt=""
                />
              </div>
              <div className="product-detail">
                <h2 className="namechatitle">{item.name}</h2>
                <div className="detail">
                  <p>${item.price}</p>
                  <div className="btn-center">
                    <button className="add-btn" onClick={() => setPopup(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-container">
          <div className="cart-title">
            <h1>
              Cart <FaShoppingBasket />
            </h1>
          </div>
          {cart.length > 0 ? (
            <div className="cover-table">
              <div className="cart-bill">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Sweet</th>
                      <th>Topping</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.sweet}</td>
                        <td>{item.topping}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => dispatch(removeForCart(item.id))}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>ราคารวม</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{cartList.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="box-table-btn">
                <button
                  onClick={handleexportpdf}
                  className="export-pdf-btn table-btn"
                >
                  export pdf
                </button>
                <button className="addline-btn table-btn">add line</button>
              </div>
            </div>
          ) : (
            <div className="box-no-item">
              <p className="noitem">No item in cart</p>
            </div>
          )}
        </div>
      </div>
      {popup && (
        <div className="popup">
          <Popup
            product={popup}
            details={details}
            setPopup={setPopup}
            setDetails={setDetails}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default Shop;
