import React, { useEffect } from "react";
import PayIcon from '../../assets/icons/pay.png'
import AddToCartIcon from '../../assets/icons/add-to-cart.png'
import OrderProcessingIcon from '../../assets/icons/order-processing.png'
import FreeShippIcon from '../../assets/icons/shipp.png'
import './product-detail.scss'
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface ProductsProps {
    products?: any
}

const ProductDetail = (props: ProductsProps) => {
    const { state } = useLocation();
    console.log('props-detail: ', state);
    const baseURL = 'https://e9b0-2402-800-6205-5b70-3d24-3253-d0f7-d1f1.ngrok-free.app'; // Replace with your base URL

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'https://9797-156-220-22-73.ngrok-free.app',
        },
    });

    const handleAddProductToCart = async () => {
        try {
            const { data } = await axiosInstance.post(`/api/order/add`, {
                customerId: localStorage.getItem('id'),
                status: 1,
                products: [
                    {
                        productId: state?.product?._id,
                        image: state?.product?.image,
                        productName: state?.product?.name,
                        amount: 1,
                        inputPrice: state?.product?.inputPrice,
                        exportPrice: state?.product?.exportPrice,
                    }
                ]
            })
            console.log('datatoCart: ', data);

            toast.success(`Add ${state?.product.name} to cart successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        catch (err) {
            console.log(err)
            toast.error('Wrong. Please try again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
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
                    <p style={{ margin: '8px 4px 8px 0' }}>Đơn giá:</p>
                    <p className="price">{state.product.exportPrice}</p>
                </div>
            </div>
            <hr />
            <div className="navContainer">
                <div className="product-detail">
                    <img className="imgProduct" src={state.product.image} alt="" />
                    <div className="sub-product-detail">
                        <div className="promotion">
                            <p>Các khuyến mãi</p>
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
                            <p>Vận chuyển</p>
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
                            <p>Số lượng</p>
                            <div className="sub-amount">
                                <p className="decrease">-</p>
                                <input className="input-amount" type="number" defaultValue={1} />
                                <p className="increase">+</p>
                            </div>
                        </div>
                        <div className="buy-a-add">
                            <div className="btn-buy">
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
                            color: 'red'
                        }}>Tư vấn - liên hệ:</p>
                        <ul>
                            <li>Huy Hoàng</li>
                            <li>Đức Minh</li>
                            <li>Thanh Hải</li>
                        </ul>
                        <p style={{
                            fontSize: '20px',
                            color: 'red'
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
            <p className="prop">Giới thiệu sản phẩm</p>
            <p>{state.product.description}</p>
            <Footer />
        </div>
    )
}

export default ProductDetail