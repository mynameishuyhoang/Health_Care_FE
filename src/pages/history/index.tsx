import React, { useEffect, useState } from "react";
import './history.scss'
import Footer from "../../components/footer";
import axios from "axios";
import moment from "moment";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    const handleOpen = () => setOpen(true);
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

    const handleChangeStatusOrder = (statusValues: number) => {
        switch (statusValues) {
            case 1: return "Chờ xử lý";
            case 2: return "Đang giao hàng";
            case 3: return "Đã giao hàng";
            case 4: return "Đã huỷ";
        }
    }

    const handleConvertTimeStamp = (timeStamp: string) => {

        const timeFormatted = moment(timeStamp).format('DD/MM/YYYY')

        return timeFormatted;
    }

    console.log('data: ', order);


    useEffect(() => {
        handleGetOrder()
    }, [])

    return (
        <>
            <div className="history-container">
                <p>Lịch sử mua hàng</p>
                <hr />
                <div className="order-history">
                    <div className="data-label">
                        <p style={{ width: '25%' }}>Mã đơn hàng</p>
                        <p style={{ width: '25%', textAlign: 'left' }}>Ngày mua</p>
                        <p style={{ width: '25%', textAlign: 'left' }}>Tổng thanh toán</p>
                        <p style={{ width: '25%', textAlign: 'left' }}>Trạng thái</p>

                    </div>
                    <hr />
                    {order?.map((item: any) => (
                        item?.products?.map((pro: any, idx: number) => (
                            <div key={idx} onClick={handleOpen} className="data-order">
                                <p style={{ width: '25%', textAlign: 'left' }}>{item?._id.substring(item?._id.length - 8, item?._id.length)}</p>
                                <p style={{ width: '25%', textAlign: 'left' }}>{handleConvertTimeStamp(item?.updatedAt)}</p>
                                <p style={{ width: '25%', textAlign: 'left' }}>{parseInt(pro?.amountPayment) * parseInt(pro?.exportPrice)}</p>
                                <p style={{ width: '25%', textAlign: 'left' }}>{handleChangeStatusOrder(item?.status)}</p>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}
                                >
                                    <Fade in={open}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Danh sách các sản phẩm có trong hoá đơn
                                            </Typography>
                                            <hr />
                                            <div style={{
                                                display: "flex"
                                            }}>
                                                <img style={{
                                                    width: '60px'
                                                }} src={pro?.image} alt="" />
                                                <p>{pro?.productName}</p>
                                                <p>{pro?.amountPayment}</p>
                                                <p>{pro?.exportPrice}</p>
                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </div>
                        ))))}
                </div>
            </div>
            <Footer />
        </>
    )
}


export default History