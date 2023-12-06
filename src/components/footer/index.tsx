import React from "react";
import './footer.scss'
import FacebookIcon from '../../assets/icons/facebook.png'
import InstagramIcon from '../../assets/icons/instagram.png'
import YoutubeIcon from '../../assets/icons/youtube.png'
import CrecardIcon from '../../assets/icons/credit-card.png'
import MoneyIcon from '../../assets/icons/money.png'
const Footer = () => {
    return (
        <div className="footer-container">
            <div>
                <p style={{ fontWeight: '700' }}>CHĂM SÓC KHÁCH HÀNG</p>
                <p className="label-footer">Trung Tâm Trợ Giúp</p>
                <p className="label-footer">Chăm Sóc Khách Hàng</p>
                <p className="label-footer">Chính Sách Bảo Hành</p>
                <p className="label-footer">Vận Chuyển</p>
                <p className="label-footer">Thanh Toán</p>
                <p className="label-footer">Trả Hàng & Hoàn Tiền</p>
            </div>
            <div>
                <p style={{ fontWeight: '700' }}>VỀ HEALTH CARE</p>
                <p className="label-footer">Chính Sách Bảo Mật</p>
                <p className="label-footer">Giới Thiệu Về Health Care</p>
                <p className="label-footer">Tuyển Dụng</p>
            </div>
            <div>
                <p style={{ fontWeight: '700' }}>THEO DÕI CHÚNG TÔI</p>
                <div className="social-container">
                    <img className="fb-icon" src={FacebookIcon} alt="" />
                    <p className="label-footer">Facebook</p>
                </div>
                <div className="social-container">
                    <img className="instagram-icon" src={InstagramIcon} alt="" />
                    <p className="label-footer">Instagram</p>
                </div>
                <div className="social-container">
                    <img className="ytb-icon" src={YoutubeIcon} alt="" />
                    <p className="label-footer">Youtube</p>
                </div>
            </div>
            <div>
                <p style={{ fontWeight: '700' }}>THANH TOÁN</p>
                <div>

                    <img className="cre-icon" src={CrecardIcon} alt="" />
                </div>
                <div>

                    <img className="money-icon" src={MoneyIcon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer