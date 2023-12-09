import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import './profile.scss'
import axios from "axios";

interface Customer {
    username: string
    password: string
    adult: number
    child: number
    name: string
    phone: string
    email: string
}


const Profile = () => {


    const [dataCustomer, setDataCustomer] = useState<Customer>()

    const handleGetCustomer = async () => {
        try {
            const data = await axios.post(`https://healthcare-bkmr.onrender.com/api/customer/${localStorage.getItem('id')}`)
            console.log('data: ', data?.data?.data);
            setDataCustomer(data?.data?.data)
            reset({
                name: localStorage.getItem('name'),
                adult: parseInt(data?.data?.data?.adult),
                child: parseInt(data?.data?.data?.child),
                phone: data?.data?.data?.phone,
                email: data?.data?.data?.email
            })

        } catch (error) {
            console.log('err: ', error);
        }
    }

    useEffect(() => {
        handleGetCustomer()
    }, [])

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: localStorage.getItem('name'),
            adult: dataCustomer?.adult,
            child: dataCustomer?.child,
            phone: dataCustomer?.phone,
            email: dataCustomer?.email
        }
    });

    // useEffect(() => {
    //     reset({
    //         name: localStorage.getItem('name'),
    //         adult: dataCustomer?.adult,
    //         child: dataCustomer?.child,
    //         phone: `(+84) ${dataCustomer?.phone}`,
    //         email: `${dataCustomer?.email}`
    //     })
    //     console.log("GET: ", getValues("child"));
    // }, [dataCustomer])

    // console.log(watch("name"));

    const handleUpdateProfile = async (data?: any) => {
        try {
            const res = await axios.patch(`https://healthcare-bkmr.onrender.com/api/customer/update/${localStorage.getItem('id')}`, {
                ...data
            })
            console.log('res: ', res);
            alert("Cập nhật thành công")
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="sub-profile-data ">
            <p className="title-name">Hồ sơ của tôi</p>
            <p className="sub-title-name">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
            <form className="profile-item-container"
                onSubmit={handleSubmit((data) => {
                    handleUpdateProfile(data)
                })}
            >
                <label className="label-name-item">Họ tên <span>*</span></label>
                <input className="textfield-data-item"  {...register("name", { required: true, maxLength: 50 })} />
                {errors.name && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Người lớn</label>
                <input className="textfield-data-item"
                    {...register("adult", { required: true, maxLength: 2, valueAsNumber: true })}
                />
                {errors.adult && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Trẻ em</label>
                <input className="textfield-data-item"
                    {...register("child", { required: true, maxLength: 2, valueAsNumber: true })}
                />
                {errors.child && <p className="toast-message">This field is required</p>}
                <label className="label-name-item">Số điện thoại</label>
                <input className="textfield-data-item"
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



export default Profile