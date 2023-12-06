import React from "react";
import './payment.scss'
import LocationIcon from '../../assets/icons/location.png'
import Logo from '../../assets/images/logo.jpg'
import VoucherIcon from '../../assets/icons/voucher.png'
import ShipIcon from '../../assets/icons/go-shipp.png'
import Footer from "../../components/footer";
import { red } from "@mui/material/colors";


const Payment = () => {
    return (
        <div className="payment-container">
            <p className="label-payment">THANH TOÁN</p>
            <hr style={{ margin: '0 20%' }} />
            <div className="data-location">
                <div className="label-a-icon">
                    <img className="location-icon" src={LocationIcon} alt="" />
                    <p style={{ color: 'red', fontWeight: '600' }}>Xác Nhận Thông Tin Khách Hàng</p>
                </div>
                <hr />
                <div className="sub-data-location">
                    <p>Họ tên người nhận</p>
                    <input style={{ width: '100%', padding: '6px' }} type="text" />
                    <p>Số điện thoại</p>
                    <input style={{ width: '100%', padding: '6px' }} type="text" />
                    <p>Địa chỉ nhận hàng</p>


                    <textarea style={{ width: '100%', padding: '6px' }} cols={3} rows={5}></textarea>

                    {/* <input style={{ width: '90%', height: '60px' }} type="text" /> */}
                    <div className="btn-save-data">
                        <p className="label-save">Xác nhận</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="data-product-container">
                <div className="item-label">
                    <p style={{ width: '10%', }}>Hình ảnh</p>
                    <p style={{ width: '40%', textAlign: 'left' }}>Tên sản phẩm</p>
                    <p style={{ width: '15%', textAlign: 'left' }}>Đơn giá</p>
                    <p style={{ width: '15%', textAlign: 'left' }}>Số lượng</p>
                    <p style={{ width: '20%', textAlign: 'left' }}>Thành tiền</p>
                </div>
                <div className="data-product">
                    <div style={{ width: '10%' }}>
                        <img className="img-product" src={Logo} alt="" />
                    </div>
                    <p style={{ width: '40%', textAlign: 'left' }}>Tên sản phẩm</p>
                    <p style={{ width: '15%', textAlign: 'left' }}>10000000</p>
                    <p style={{ width: '15%', textAlign: 'left' }}>1</p>
                    <p style={{ width: '20%', textAlign: 'left' }}>100000000</p>

                </div>
                <hr />
                <div className="voucher-container">
                    <img style={{ width: '40px', marginRight: '10px' }} src={VoucherIcon} alt="" />
                    <p>Health Care Voucher</p>
                    <select style={{ marginLeft: '60px', width: '200px' }} name="" id="">
                        <option value="">Khuyến mãi</option>
                    </select>
                </div>
                <hr />
                <div className="shipp-container">
                    <img style={{ width: '40px', marginRight: '10px' }} src={ShipIcon} alt="" />
                    <p style={{ marginRight: '20px' }}>Đơn vị vận chuyển</p>
                    <select style={{ marginLeft: '60px', width: '200px' }} name="" id="">
                        <option value="">Nhanh</option>
                        <option value="">Tiết kiệm</option>
                    </select>
                </div>
                <hr />
                <div className="data-total-payment">
                    <p style={{ fontSize: '24px' }}>Tổng số tiền:</p>
                    <p className="label-payment">0(đ)</p>
                </div>
            </div>
            <hr />
            <div className="payment-container">
                <div className="payment-methods">
                    <p style={{ marginRight: '20px' }}>Phương thức thanh toán</p>
                    <select style={{ marginLeft: '60px', width: '200px' }} name="" id="">
                        <option value="">Thanh toán khi nhận hàng</option>
                        <option value="">Thanh toán qua ngân hàng</option>
                    </select>
                </div>
                <hr />
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0'
                    }}>Tổng tiền hàng</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0'
                    }}>100000đ</p>
                </div>
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0'
                    }}>Phí vận chuyển</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0'
                    }}>35000đ</p>
                </div>
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0'
                    }}>Tổng thanh toán</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0',
                        color: 'red',
                        fontSize: '20px'
                    }}>135000đ</p>
                </div>
                <hr />
                <div className="order">
                    <p>Đặt hàng</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Payment