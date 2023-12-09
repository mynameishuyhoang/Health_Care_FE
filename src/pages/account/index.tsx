import React, { useState } from "react";
import './account.scss'
import Footer from "../../components/footer";
import Author from '../../assets/icons/authorization.png'
import { NavLink } from "react-router-dom";
import AuthData from "../profile";
import ChangePassword from "../change-password";

const menuAccount = [
    {
        id: 1,
        menu: "Hồ sơ",
        component: <AuthData />
    },
    {
        id: 2,
        menu: "Đổi mật khẩu",
        component: <ChangePassword />
    }
]


const Account = () => {
    const [tabSelected, setTabSelected] = useState<any>(menuAccount[0])

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
                        <p className={`${tabSelected.id === 1 && 'isActive'} link-to-page`} onClick={() => setTabSelected(menuAccount[0])}>Hồ sơ</p>
                        <p className={`${tabSelected.id === 2 && 'isActive'} link-to-page`} onClick={() => setTabSelected(menuAccount[1])}>Đổi mật khẩu</p>
                    </div>
                </div>
                {tabSelected.component}
                {/* <AuthData /> */}
            </div>
            <Footer />
        </div>
    )
}

export default Account