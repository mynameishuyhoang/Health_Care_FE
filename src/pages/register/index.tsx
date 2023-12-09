import React from "react";
import './register.scss'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "../../components/footer";
import LogoIcon from '../../assets/images/logo.jpg'


const Register = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            name: "",
            adult: "",
            child: "",
            phone: "",
            email: "",
            address: ""

        }
    });

    const handleSubmitRegister = async (data?: any) => {
        try {
            const res = await axios.post(`https://healthcare-bkmr.onrender.com/api/register`, {
                ...data
            })
            console.log('res: ', res);
            alert("Đăng ký thành công")
            navigate('/')
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="register-container">
            <div className="header-container">
                <NavLink to='/'>
                    <img className="icon-logo" src={LogoIcon} alt="Logo Health Care" />
                </NavLink>
                <p className="label-header">Đăng ký</p>
            </div>
            <div className="data-container">
                <form className="form-data-register"
                    onSubmit={handleSubmit((data) => {
                        handleSubmitRegister(data)
                    })}
                >
                    <p className="label-data">Đăng ký</p>
                    <label className="label-name-item">Tên đăng nhập<span>*</span></label>
                    <input className="textfield-data-item"  {...register("username", { required: true, minLength: 8 })} />
                    {errors.username && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 8 kí tự</p>}
                    <label className="label-name-item">Mật khẩu</label>
                    <input className="textfield-data-item"
                        {...register("password", { required: true, minLength: 6, })}
                    />
                    {errors.password && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 6 kí tự</p>}
                    <label className="label-name-item">Tên người dùng</label>
                    <input className="textfield-data-item"
                        {...register("name", { required: true, pattern: /^[A-Za-z]+$/i, minLength: 8 })}
                    />
                    {errors.name && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 10 kí tự</p>}
                    <label className="label-name-item">Số lượng người lớn trong gia đình</label>
                    <input className="textfield-data-item"
                        {...register("adult", { required: true, min: 1, max: 9, valueAsNumber: true })}
                    />
                    {errors.adult && <p className="toast-message">Trường này là bắt buộc giá trị nằm trong khoảng 1 - 9</p>}
                    <label className="label-name-item">Số lượng trẻ em trong gia đình</label>
                    <input className="textfield-data-item"
                        {...register("child", { required: true, min: 0, max: 9, valueAsNumber: true })}
                    />
                    {errors.child && <p className="toast-message">Trường này là bắt buộc giá trị nằm trong khoảng 0 - 9</p>}
                    <label className="label-name-item">Số điện thoại</label>
                    <input className="textfield-data-item"
                        {...register("phone", { required: true, minLength: 10 })}
                    />
                    {errors.phone && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 10 kí tự</p>}
                    <label className="label-name-item">Email</label>
                    <input className="textfield-data-item"
                        {...register("email", { required: true, minLength: 20 })}
                    />
                    {errors.email && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 20 kí tự</p>}
                    <label className="label-name-item">Địa chỉ</label>
                    <input className="textfield-data-item"
                        {...register("address", { required: true, minLength: 8 })}
                    />
                    {errors.address && <p className="toast-message">Trường này là bắt buộc và phải lớn hơn 8 kí tự</p>}
                    <input className="save-data" value="Đăng ký" type="submit" />
                    <div className="go-login">
                        <p>Bạn đã có tài khoản?
                            <NavLink to='/'>Đăng nhập ngay.</NavLink>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}



export default Register