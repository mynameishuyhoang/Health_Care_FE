import React, { useEffect, useState } from "react";
import PayIcon from '../../assets/icons/pay.png'
import AddToCartIcon from '../../assets/icons/add-to-cart.png'
import OrderProcessingIcon from '../../assets/icons/order-processing.png'
import FreeShippIcon from '../../assets/icons/shipp.png'
import './product-detail.scss'
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toastMessage } from "../../components/message";
import TextField from "@mui/material/TextField";

interface ProductsProps {
    products?: any
}

const ProductDetail = (props: ProductsProps) => {
    const { state } = useLocation();
    console.log('props-detail: ', state);

    const [quantity, setQuantity] = useState(1)

    const handleAddProductToCart = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/add`, {
                customerId: localStorage.getItem('id'),
                products: [
                    {
                        productId: state?.product?._id,
                        image: state?.product?.image,
                        productName: state?.product?.name,
                        quantity: quantity,
                        exportPrice: state?.product?.exportPrice,
                    }
                ]
            })
            console.log('data 111231: ', data);

            toastMessage('success', `Thêm sản phẩm vào giỏ hàng thành công`)

        }
        catch (err) {
            console.log(err)
            toastMessage('error', `Thêm sản phẩm vào giỏ hàng không thành công`)
        }
    }

    const handleDecreaseAmount = () => {
        quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1)
    }

    const handleIncreaseAmount = () => {
        state?.product?.quantity === quantity ? alert("Số lượng hàng quá giới hạn") : setQuantity(quantity + 1)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="pdContainer">
                <div className="navContainer">
                    <div className="product-detail">
                        <img className="imgProduct" src={state.product.image} alt="" />
                        <div className="sub-product-detail">
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ margin: '8px 4px 8px 0', fontWeight: '600' }}>Tên sản phẩm</p>
                                    <p style={{
                                        margin: '8px 0',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: "#B31312"
                                    }}>{state.product.name}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ margin: '8px 4px 8px 0', fontWeight: '600' }}>Khối lượng</p>
                                    <p style={{
                                        fontWeight: 600,
                                        margin: '8px 0'
                                    }}>100 gram</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ margin: '8px 4px 8px 0', fontWeight: '600' }}>Đơn giá</p>
                                    <p style={{
                                        fontWeight: 600,
                                        margin: '8px 0'
                                    }}>{state.product.exportPrice} (đ)</p>
                                </div>
                                <div className="transport">
                                    <p style={{
                                        fontWeight: '600 '
                                    }}>Thông tin</p>
                                    <div className="sub-transport">
                                        <div className="order-process">
                                            <img className="order-process-icon" src={OrderProcessingIcon} alt="" />
                                            <p style={{ color: "#B31312" }}>Xử lý đơn hàng bởi Health Care</p>
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
                                        <div className="change-quantity" onClick={handleDecreaseAmount}>
                                            <p>-</p>
                                        </div>
                                        <TextField
                                            id="outlined-number"
                                            // label="Số lượng"
                                            type="number"
                                            value={quantity}
                                            style={{ width: '85px' }}
                                        />
                                        <div className="change-quantity" onClick={handleIncreaseAmount}>
                                            <p className="plus">+</p>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '600' }}>{state?.product?.amount} sản phẩm có sẵn</p>
                            </div>
                            <hr style={{ marginTop: '16px' }} />
                            {localStorage.getItem('name') &&
                                <>
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
                                </>
                            }

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
            </div>
            <Footer />
        </>
    )
}

export default ProductDetail