import React, { useEffect, useState } from "react";
import './history.scss'
import Footer from "../../components/footer";
import axios from "axios";
import moment from "moment";
import CustomModal from "../../components/modal";
import CancelIcon from '../../assets/icons/cancel.png'
import { Button } from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Order {
    customerId: string,
    status: number,
    products: ProductOrder[]
}

interface ProductOrder {
    productId: string,
    productName: string,
    amountPayment: number,
    exportPrice: number
}

const History = () => {

    const [order, setOrder] = useState<Order[]>([])
    const [open, setOpen] = React.useState(false);
    const [orderSelected, setOrderSelected] = React.useState<any>();
    const [status, setStatus] = React.useState<any>();
    const [id, setId] = React.useState<any>();

    const handleOpen = (listProducts?: any) => {
        setOrderSelected(listProducts)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleGetOrder = async () => {
        try {
            const data = await axios.post(`https://healthcare-bkmr.onrender.com/api/order/${localStorage.getItem('id')}`)
            console.log('order-data: ', data?.data);
            setOrder(data?.data?.data)
        } catch (error) {
            console.log(error);

        }
    }

    const handleUpdateStatusOrder = async (id: string) => {
        try {
            const data = await axios.put(`https://healthcare-bkmr.onrender.com/api/order/update/${id}`, {
                status: 4
            })
            console.log('order-data: ', data?.data);
            setOrder(data?.data?.data)
        } catch (error) {
            console.log(error);

        }
    }

    const handleChangeStatusOrder = (statusValues: number) => {
        switch (statusValues) {
            case 1: return "Đang xử lý";
            case 2: return "Đang giao hàng";
            case 3: return "Đã giao hàng";
            case 4: return "Đã huỷ";
        }
    }

    const handleConvertTimeStamp = (timeStamp: string) => {

        const timeFormatted = moment(timeStamp).format('DD/MM/YYYY')

        return timeFormatted;
    }

    console.log('data order: ', order);

    const handleCalculateTotalPrice = (listProducts?: any) => {
        let summary = 0;

        listProducts.forEach((item: any) => {
            const { quantity, exportPrice } = item;
            const productSummary = quantity * exportPrice;
            summary += productSummary;
        });

        return summary;
    }


    useEffect(() => {
        handleGetOrder()
    }, [])

    return (
        <>
            <div className="history-container">
                <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#5C8374', margin: '0', padding: '10px 0' }}>Lịch sử mua hàng</p>
                <hr />
                <div className="order-history">
                    <div className="data-label">
                        <p style={{ width: '25%', fontWeight: '600', marginLeft: '10px', fontSize: '18px', color: '#FF8F8F' }}>Mã đơn hàng</p>
                        <p style={{ width: '25%', textAlign: 'left', fontWeight: '600', fontSize: '18px', color: '#FF8F8F' }}>Ngày mua</p>
                        <p style={{ width: '25%', textAlign: 'left', fontWeight: '600', fontSize: '18px', color: '#FF8F8F' }}>Tổng thanh toán</p>
                        <p style={{ width: '25%', textAlign: 'left', fontWeight: '600', fontSize: '18px', color: '#FF8F8F' }}>Trạng thái</p>
                    </div>
                    <hr />
                    {order?.map((item: any, idx: number) => (
                        <div key={idx} onClick={() => {
                            handleOpen(item?.products)
                            setStatus(item?.status)
                            setId(item?._id)
                        }} className="data-order">
                            <p style={{ width: '25%', textAlign: 'left', marginLeft: '10px', color: '#1B4242' }}>{item?._id.substring(item?._id.length - 8, item?._id.length)}</p>
                            <p style={{ width: '25%', textAlign: 'left', color: '#1B4242' }}>{handleConvertTimeStamp(item?.updatedAt)}</p>
                            <p style={{ width: '25%', textAlign: 'left', color: '#1B4242' }}>{handleCalculateTotalPrice(item?.products)}</p>
                            <p style={{ width: '25%', textAlign: 'left', color: '#1B4242' }}>{handleChangeStatusOrder(item?.status)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            <CustomModal isOpen={open} handleClose={handleClose} style={{
                width: '900px', height: '600px',
                background: '#EEF296', outline: '1px solid gray', borderRadius: '12px'
            }}>
                <>
                    <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Chi tiết đơn hàng</p>
                    <img className="icon-cancel" onClick={handleClose} src={CancelIcon} alt="" />
                    <hr />
                    <div style={{ display: 'flex', margin: '10px 10px' }}>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Hình ảnh</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Tên sản phẩm</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Số lượng</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Đơn giá</p>
                        <p style={{ width: '20%', fontWeight: '600', fontSize: '18px' }}>Thành tiền</p>
                    </div>
                    <hr />
                    {orderSelected?.map((item: any, idx: number) => (
                        <div className="sub-data-order">
                            <div style={{ width: '20%' }}>
                                <img className="product-img" src={item?.image} alt="" />
                            </div>
                            <p>{item?.productName}</p>
                            <p>{item?.quantity}</p>
                            <p>{item?.exportPrice}</p>
                            <p>{parseInt(item?.quantity) * parseInt(item?.exportPrice)}</p>
                        </div>
                    ))}
                    {status === 1 &&
                        <Button style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            margin: '0 10px 10px 0',
                            background: '#FF8F8F',
                            color: 'white'
                        }}
                            onClick={() => handleUpdateStatusOrder(id)}

                        >Huỷ đơn hàng</Button>
                    }
                </>
            </CustomModal>
        </>
    )
}


export default History