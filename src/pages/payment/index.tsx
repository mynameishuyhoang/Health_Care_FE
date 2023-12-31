import React, { useEffect, useState } from "react";
import './payment.scss'
import LocationIcon from '../../assets/icons/location.png'
import VoucherIcon from '../../assets/icons/voucher.png'
import ShipIcon from '../../assets/icons/go-shipp.png'
import Footer from "../../components/footer";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toastMessage } from "../../components/message";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Customer {
    name: string
    phone: string
    email: string
    address: string
}

interface Products {
    productId: string,
    productName: string,
    quantity: number,
    image: string,
    exportPrice: number
}

interface Order {
    products: Products[],
    status: number,
    customerId: string
}

interface Ship {
    shippName: string
    shippPrice: number
}

const Payment = () => {
    const [dataCustomer, setDataCustomer] = useState<Customer>()
    const [order, setOrder] = useState<Order[]>([])
    const [ship, setShip] = useState<Ship[]>([])
    const [orderRes, setOrderRes] = useState<any>()
    const [shipPrice, setShipPrice] = useState<number>(0)
    const navigation = useNavigate()

    const handleGetCustomer = async () => {
        try {
            const data = await axios.post(`https://healthcare-bkmr.onrender.com/api/customer/${localStorage.getItem('id')}`)
            console.log('data: ', data?.data?.data);
            setDataCustomer(data?.data?.data)
            reset({
                name: localStorage.getItem('name'),
                phone: data?.data?.data?.phone,
                email: data?.data?.data?.email,
                address: data?.data?.data?.address
            })

        } catch (error) {
            console.log('err: ', error);
        }
    }

    const handleGetOrder = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/${localStorage.getItem('id')}`)
            console.log('data 111111111:  ', data);
            setOrder(data?.data?.products)
            setOrderRes(data?.data)
            console.log('orderRes: ', orderRes);
            console.log('orderReszz: ', order);


        } catch (err) {
            console.log(err)
        }
    }

    const handleAddToOrder = async () => {
        try {
            const dataPayload = {
                customerId: orderRes?.customerId,
                products: orderRes?.products,
                status: 1,
            }
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/order/add`, {
                ...dataPayload
            })
            console.log('dataOrder: ', data)
            toastMessage('success', 'Đặt hàng thành công')


        } catch (error) {
            console.log(error);
            toastMessage('error', 'Đặt hàng không thành công')

        }
    }

    useEffect(() => {
        handleGetCustomer()
        handleGetOrder()
        handleGetShip()
    }, [])

    const calculateSummary = () => {
        let summary = 0;

        order.forEach((item: any) => {
            const { quantity, exportPrice } = item;
            const productSummary = quantity * exportPrice;
            summary += productSummary;
        });

        return summary as number;
    }

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: localStorage.getItem('name'),
            phone: dataCustomer?.phone,
            email: dataCustomer?.email,
            address: dataCustomer?.address
        }
    });

    const handleUpdateDataCustomer = async (data?: any) => {
        try {
            const res = await axios.patch(`https://healthcare-bkmr.onrender.com/api/customer/update/${localStorage.getItem('id')}`, {
                ...data
            })
            console.log('res: ', res);
            toastMessage('success', 'Cập thật thông tin khách hàng thành công')
        }
        catch (err) {
            console.log(err);
            toastMessage('error', 'Cập thật thông tin khách hàng không thành công')
        }
    }

    const handleClearCart = async (cartId?: string) => {
        try {
            const res = await axios.delete(`https://healthcare-bkmr.onrender.com/api/cart/delete/${cartId}`)
            console.log('res: ', res);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSetAmountProduct = async (data?: any) => {
    }

    const handleGetShip = async () => {
        try {
            const data = await axios.post('https://healthcare-bkmr.onrender.com/api/shipp')
            console.log('dataShip', data);
            setShip(data?.data?.data)

        } catch (error) {
            console.log(error);

        }
    }

    const handleChangeShipPrice = (val: any) => {
        val === 'Giao hàng hoả tốc' ? setShipPrice(35000) : setShipPrice(20000)

        console.log(shipPrice);

    }

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
                <form className="data-customer-container"
                    onSubmit={handleSubmit((data) => {
                        handleUpdateDataCustomer(data)
                    })}
                >
                    <label className="label-name-item">Họ tên <span>*</span></label>
                    <input className="textfield-data-item"  {...register("name", { required: true, maxLength: 50 })} />
                    {errors.name && <p className="toast-message">This field is required</p>}
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
                    <label className="label-name-item">Address</label>
                    <input className="textfield-data-item"
                        {...register("address", { required: true, })}
                    />
                    {errors.address && <p className="toast-message">This field is required</p>}
                    <input style={{
                        padding: '8px',
                        background: 'rgb(1, 167, 1)',
                        color: 'white'
                    }} className="save-data" value="Lưu" type="submit" />
                </form>
            </div>
            <hr />
            <div className="data-product-container">
                <div className="item-label">
                    <p style={{ width: '10%', fontWeight: '600' }}>Hình ảnh</p>
                    <p style={{ width: '40%', textAlign: 'left', fontWeight: '600' }}>Tên sản phẩm</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Đơn giá</p>
                    <p style={{ width: '15%', textAlign: 'left', fontWeight: '600' }}>Số lượng</p>
                    <p style={{ width: '20%', textAlign: 'left', fontWeight: '600' }}>Thành tiền</p>
                </div>
                {order?.map((item: any, idx: number) => (
                    <div key={idx} className="data-product">
                        <div style={{ width: '10%' }}>
                            <img className="img-product" src={item?.image} alt="" />
                        </div>
                        <p style={{ width: '40%', textAlign: 'left' }}>{item?.productName}</p>
                        <p style={{ width: '15%', textAlign: 'left' }}>{item?.exportPrice}</p>
                        <p style={{ width: '15%', textAlign: 'left' }}>{item?.quantity}</p>
                        <p style={{ width: '20%', textAlign: 'left' }}>{parseInt(item?.quantity) * parseInt(item?.exportPrice)}</p>
                    </div>
                ))}
                <hr />
                <div className="voucher-container">
                    <img style={{ width: '40px', marginRight: '10px', }} src={VoucherIcon} alt="" />
                    <p style={{ fontWeight: '600' }}>Health Care Voucher</p>
                    {/* <select style={{ marginLeft: '60px', width: '200px' }} name="" id="">
                        <option value="">Khuyến mãi</option>
                    </select> */}
                    <FormControl style={{ width: '300px', marginLeft: '10px' }}>
                        <InputLabel id="demo-simple-select-label">Voucher</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={item?.shippName}
                            label="Voucher"
                            onChange={(e) => handleChangeShipPrice(e.target.value)}
                        >
                            {ship?.map((item: any, idx: number) => (
                                <MenuItem key={idx} value={item?.shippName}>{item?.shippName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <hr />
                <div className="shipp-container">
                    <img style={{ width: '40px', marginRight: '10px' }} src={ShipIcon} alt="" />
                    <p style={{ marginRight: '20px', fontWeight: '600' }}>Đơn vị vận chuyển</p>
                    {/* <select style={{ marginLeft: '60px', width: '200px' }} onChange={(e) => handleChangeShipPrice(e.target.value)}>
                        {ship?.map((item: any, idx: number) => (
                            <option style={{ padding: '8px' }} value={item?.shippName}>{item?.shippName}</option>
                        ))}
                    </select> */}
                    <FormControl style={{ width: '300px' }}>
                        <InputLabel id="demo-simple-select-label">Đơn vị vận chuyển</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={item?.shippName}
                            label="Đơn vị vận chuyển"
                            onChange={(e) => handleChangeShipPrice(e.target.value)}
                        >
                            {ship?.map((item: any, idx: number) => (
                                <MenuItem key={idx} value={item?.shippName}>{item?.shippName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <hr />
                <div className="data-total-payment">
                    <p style={{ fontSize: '24px', fontWeight: '600' }}>Tổng số tiền:</p>
                    <p className="label-payment">{calculateSummary()}(đ)</p>
                </div>
            </div>
            <hr />
            <div className="payment-container">
                <div className="payment-methods">
                    <p style={{ marginRight: '20px', fontWeight: '600' }}>Phương thức thanh toán</p>
                    <select style={{ marginLeft: '60px', width: '200px' }} name="" id="">
                        <option value="">Thanh toán khi nhận hàng</option>
                        <option value="">Thanh toán qua ngân hàng</option>
                    </select>
                </div>
                <hr />
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0',
                        fontWeight: '600'
                    }}>Tổng tiền hàng</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0',
                        fontWeight: '600'
                    }}>{calculateSummary()}(đ)</p>
                </div>
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0',
                        fontWeight: '600'
                    }}>Phí vận chuyển</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0',
                        fontWeight: '600'
                    }}>{shipPrice} (đ)</p>
                </div>
                <div className="data-payment">
                    <p style={{
                        width: '250px',
                        margin: '10px 40px 10px 0',
                        fontWeight: '600'
                    }}>Tổng thanh toán</p>
                    <p style={{
                        width: '150px',
                        margin: '10px 0',
                        color: 'red',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>{calculateSummary() + shipPrice}(đ)</p>
                </div>
                <hr />
                <div className="order" onClick={() => {
                    handleAddToOrder()
                    handleClearCart(orderRes?._id)
                    navigation(`/history/${localStorage.getItem('id')}`)
                }}>
                    <p>Đặt hàng</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Payment