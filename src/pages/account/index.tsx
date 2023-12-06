import React from "react";
import './account.scss'
import Footer from "../../components/footer";
import Author from '../../assets/icons/authorization.png'
import { NavLink } from "react-router-dom";
import AuthData from "../profile-auth-data";


const Account = () => {
    return (
        <div>
            <div className="profile-container">
                <div className="main-profile">
                    <div className="header-main">
                        <img className="auth-icon" src={Author} alt="" />
                        <div className="label-header">
                            <p className="item-header">Hồ sơ của tôi</p>
                            <p className="item-header">{localStorage.getItem('name')}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="change-profile">
                        <NavLink className="link-to-page" to='/profile'>Hồ sơ</NavLink>
                        <NavLink className="link-to-page" to='/add-payment'>Ngân hàng</NavLink>
                        <NavLink className="link-to-page" to='/add-address'>Địa chỉ</NavLink>
                        <NavLink className="link-to-page" to='/change-password'>Đổi mật khẩu</NavLink>
                    </div>
                </div>
                <AuthData />
            </div>
            <Footer />
        </div>
    )
}

export default Account