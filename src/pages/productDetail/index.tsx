import React, { useEffect, useState } from "react";
import PayIcon from '../../assets/icons/pay.png'
import AddToCartIcon from '../../assets/icons/add-to-cart.png'
import OrderProcessingIcon from '../../assets/icons/order-processing.png'
import FreeShippIcon from '../../assets/icons/shipp.png'
import './product-detail.scss'
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface ProductsProps {
    products?: any
}

const ProductDetail = (props: ProductsProps) => {
    const { state } = useLocation();
    console.log('props-detail: ', state);

    const [amountPayment, setAmountPayment] = useState(1)

    const handleAddProductToCart = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/add`, {
                customerId: localStorage.getItem('id'),
                products: [
                    {
                        productId: state?.product?._id,
                        image: state?.product?.image,
                        productName: state?.product?.name,
                        quantity: amountPayment,
                        exportPrice: state?.product?.exportPrice,
                    }
                ]
            })
            console.log('datatoCart: ', data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDecreaseAmount = () => {
        amountPayment === 0 ? setAmountPayment(0) : setAmountPayment(amountPayment - 1)
    }

    const handleIncreaseAmount = () => {
        state?.product?.amount === amountPayment ? alert("Số lượng hàng quá giới hạn") : setAmountPayment(amountPayment + 1)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="pdContainer">
            <div className="name-a-price">
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '8px 4px 8px 0' }}>Tên sản phẩm:</p>
                    <p className="name">{state.product.name}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '8px 4px 8px 0' }}>Đơn vị tính:</p>
                    <p className="unit">100 Gram</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '8px 4px 8px 0' }}>Đơn giá:</p>
                    <p className="price">{state.product.exportPrice} (đ)</p>
                </div>
            </div>
            <hr />
            <div className="navContainer">
                <div className="product-detail">
                    <img className="imgProduct" src={state.product.image} alt="" />
                    <div className="sub-product-detail">
                        <div className="promotion">
                            <p style={{
                                fontWeight: '600 '
                            }}>Các khuyến mãi</p>
                            <select style={{
                                borderRadius: '4px',
                                width: '150px'
                            }} name="" id="">
                                <option value="">Khuyến mãi 1</option>
                                <option value="">Khuyến mãi 2</option>
                                <option value="">Khuyến mãi 3</option>
                                <option value="">Khuyến mãi 4</option>
                            </select>
                        </div>
                        <div className="transport">
                            <p style={{
                                fontWeight: '600 '
                            }}>Vận chuyển</p>
                            <div className="sub-transport">
                                <div className="order-process">
                                    <img className="order-process-icon" src={OrderProcessingIcon} alt="" />
                                    <p>Xử lý đơn hàng bởi Health Care</p>
                                </div>
                                <div className="shipp">
                                    <img className="shipp-icon" src={FreeShippIcon} alt="" />
                                    <p>Miễn phí vận chuyển</p>
                                </div>
                            </div>
                        </div>
                        <div className="amount">
                            <p style={{
                                fontWeight: '600 '
                            }}>Số lượng</p>
                            <div className="sub-amount">
                                <p className="decrease" onClick={handleDecreaseAmount}>-</p>
                                <input className="input-amount" type="number" value={amountPayment} />
                                <p className="increase" onClick={handleIncreaseAmount}>+</p>
                            </div>
                        </div>
                        <div className="buy-a-add">
                            <div className="btn-buy" onClick={(e) => handleAddProductToCart()}>
                                <p>Mua ngay</p>
                                <img className="pay-icon" src={PayIcon} alt="" />
                            </div>
                            <div className="btn-add-cart" onClick={(e) => handleAddProductToCart()}>
                                <p>Thêm vào giỏ hàng</p>
                                <img className="add-cart" src={AddToCartIcon} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p style={{
                            fontSize: '20px',
                            color: 'red',
                            fontWeight: '600'
                        }}>Tư vấn - liên hệ:</p>
                        <ul>
                            <li>Huy Hoàng</li>
                            <li>Đức Minh</li>
                            <li>Thanh Hải</li>
                            <li>Đặng Hoàng</li>
                        </ul>
                        <p style={{
                            fontSize: '20px',
                            color: 'red',
                            fontWeight: '600'
                        }}>Địa chỉ mua hàng:</p>
                        <ul>
                            <li>Đà Nẵng</li>
                            <li>Huế</li>
                            <li>Quảng Nam</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <p className="label-nutrition">Thành phần dinh dưỡng</p>
            <table className="table-nutrition">
                <thead>
                    <tr>
                        <th className="component">Thành phần</th>
                        <th className="nutrition">Dinh dưỡng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="component-item">Calo (kcal)</th>
                        <th className="nutrition-item">{state.product.calo}</th>
                    </tr>
                    <tr>
                        <th className="component-item">Protein (g)</th>
                        <th className="nutrition-item">{state.product.protein}</th>
                    </tr>
                    <tr>
                        <th className="component-item">Chất béo (g)</th>
                        <th className="nutrition-item">{state.product.lipid}</th>
                    </tr>
                    <tr>
                        <th className="component-item">Đường (g)</th>
                        <th className="nutrition-item">{state.product.sugar}</th>
                    </tr>
                    <tr>
                        <th className="component-item">Tinh bột (g)</th>
                        <th className="nutrition-item">{state.product.starch}</th>
                    </tr>
                </tbody>
            </table>
            <hr />
            <p className="label-product-detail">Giới thiệu sản phẩm</p>
            <p>{state.product.description}</p>
            <Footer />
        </div>
    )
}

export default ProductDetail