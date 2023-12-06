import React from "react";
import { useForm } from "react-hook-form"
import './profile-auth-data.scss'

const AuthData = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            adult: 1,
            child: 1,
            phone: "(+84)",
            email: ""
        }
    });

    console.log(watch("name"));

    return (
        <div className="sub-profile-data ">
            <p className="title-name">Hồ sơ của tôi</p>
            <p className="sub-title-name">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
            <form className="profile-item-container"
                onSubmit={handleSubmit((data) => {
                    alert(JSON.stringify(data));
                })}
            >
                <label className="label-name-item">Họ tên</label>
                <input className="textfield-data-item" {...register("name", { required: true, maxLength: 50 })} />
                {errors.name && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Người lớn</label>
                <input className="textfield-data-item"
                    {...register("adult", { required: true, maxLength: 2 })}
                />
                {errors.adult && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Trẻ em</label>
                <input className="textfield-data-item"
                    {...register("child", { required: true, maxLength: 2 })}
                />
                {errors.child && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Số điện thoại</label>
                <input className="textfield-data-item" defaultValue="(+84)"
                    {...register("phone", { required: true, })}
                />
                {errors.phone && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Email</label>
                <input className="textfield-data-item"
                    {...register("email", { required: true, })}
                />
                {errors.email && <p className="toast-message">This field is required</p>}
                <input className="save-data" value="Lưu" type="submit" />
            </form>
        </div>
    )
}



export default AuthData