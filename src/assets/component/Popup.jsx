import React, { useEffect, useState } from 'react'
import { getAllSweet, getAllTopping } from '../../fetch/detail';
import "../css/popup.css"

const Popup = (props) => {
    const { product, details, setPopup, setDetails, handleSubmit } = props;

    const [ topping, setTopping ] = useState([]);
    const [ sweet, setSweet ] = useState([]);
    const [ select, setSelect ] = useState(0);

    useEffect(() => {
        setTopping(getAllTopping());
        setSweet(getAllSweet());
    },[]);

    useEffect(() => {
        if (sweet.length > 0) {
            setDetails((prev) => ({ ...prev, sweet: sweet[0].id }));
        }
    },[sweet]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }


  return (
    <div className='popup-container'>
        <div className="popup-header">
            <h1>Deatails</h1>
            <button onClick={() => setPopup(false)}>X</button>
        </div>
        <div className="form-container">
            <div className="form-detail">
                <div className="details">
                    <h3>Topping</h3>
                    <div className="detail-list">
                        {topping.map((item) => (
                            <label className="select-detail" key={item.id} htmlFor={item.name}>
                                <input 
                                    name={item.name} 
                                    type="checkbox" 
                                    checked={details.topping === item.id}
                                    onChange={() => setDetails((prev) => ({ ...prev, topping: item.id }))}    
                                />
                                <p>{item.name} {item.price}฿</p>
                            </label>
                        ))}
                    </div>
                </div>


                <div className="details">
                <h3>Sweet Level</h3>
                    <div className="detail-list">
                        {sweet.map((item, index) => (
                            <label className="select-detail" key={item.id} htmlFor={`sweet-${index}`}>
                            <input
                                id={`sweet-${item.id}`}
                                name="sweet"
                                type="radio"
                                checked={details.sweet === item.id}
                                onChange={() => setDetails((prev) => ({ ...prev, sweet: item.id }))}
                                />
                            <p>{item.name}</p>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="box-table-btn box-btn">
                <button className='cancle-btn table-btn' type="button" onClick={() => setPopup(false)}>cancle</button>
                <button className='buy-btn table-btn' type='submit' onClick={() => handleSubmit(product)}>Buy</button>
            </div>
        </div>
    </div>
  )
}

export default Popup