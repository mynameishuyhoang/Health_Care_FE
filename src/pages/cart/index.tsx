import React, { useState } from "react";
import './cart.scss'
import TrashIcon from '../../assets/icons/trash.png'
import FreeShippIcon from '../../assets/icons/shipp.png'
import MeatIcon from '../../assets/icons/meat.png'
import SeaFoodIcon from '../../assets/icons/seafood.png'
import VegetableIcon from '../../assets/icons/vegetables.png'
import FruitIcon from '../../assets/icons/fruits.png'
import EggIcon from '../../assets/icons/eggs.png'
import StarchIcon from '../../assets/icons/starch.png'
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import axios from "axios";
import EmptyCartIcon from '../../assets/icons/empty-cart.png'
import { Button, TextField } from "@mui/material";
import { toastMessage } from "../../components/message";
import EditIcon from '../../assets/icons/edit.png'
import CancelIcon from '../../assets/icons/cancel.png'
import CustomModal from "../../components/modal";


interface Products {
    image: string,
    productId: string,
    productName: string,
    quantity: string,
    exportPrice: string
}

interface Cart {
    products: Products[],
    customerId: string
}


const Cart = () => {

    const navigation = useNavigate()

    const [cart, setCart] = useState<Cart[]>([])
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editSelected, setEditSelected] = React.useState<any>();
    const [quantityUpdate, setQuantityUpdate] = React.useState<number>();


    const handleOpenEdit = (listProducts?: any) => {
        setEditSelected(listProducts)
        setOpenEdit(true)
    };

    console.log("editSelected: ", editSelected);


    const handleCloseEdit = () => setOpenEdit(false)


    const handleGetCart = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/${localStorage.getItem('id')}`)
            console.log('data: ', data?.data);
            setCart(data?.data?.products)

        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateQuantityCart = async () => {
        try {
            const { data } = await axios.patch(`http://localhost:8000/api/cart/update`, {
                quantity: quantityUpdate,
                customerId: localStorage.getItem('id'),
                productId: editSelected?.productId
            })
            toastMessage('success', 'Cập nhật số lượng sản phẩm thành công')
            handleCloseEdit()
            handleGetCart()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteProductInCart = async (data?: string) => {
        try {
            const res = await axios.delete(`https://healthcare-bkmr.onrender.com/api/cart/deleteproduct/${localStorage.getItem('id')}`, {
                data: {
                    productId: data
                }
            })
            console.log(data);

            console.log('res: ', res);
            toastMessage('success', `Xoá sản phẩm ra khỏi giỏ hàng thành công`)
            handleGetCart()

        } catch (err) {
            console.log(err)
            toastMessage('err', `Xoá không thành công`)
        }
    }

    React.useEffect(() => {
        setQuantityUpdate(editSelected?.quantity)
        handleGetCart()
        window.scrollTo(0, 0)
    }, [openEdit])


    const calculateSummary = () => {
        let summary = 0;

        cart.forEach((item: any) => {
            const { quantity, exportPrice } = item;
            const productSummary = quantity * exportPrice;
            summary += productSummary;
        });

        return summary;
    }


    return (
        <div className="cart-container">
            <p className="label-cart">Giỏ hàng</p>
            <hr style={{ margin: '4px 20%' }} />
            {
                cart.length === 0 ?
                    <div className="empty-cart">
                        <img className="empty-icon" src={EmptyCartIcon} alt="" />
                        <p className="empty-label">Giỏ hàng của bạn còn trống</p>
                        <Button className="empty-button" onClick={() => navigation('/')}>Mua Ngay</Button>
                    </div>
                    :
                    <>
                        <div className="data-product-container">
                            <div className="item-label">
                                <p style={{ width: '10%' }}>Hình ảnh</p>
                                <p style={{ width: '30%', textAlign: 'left' }}>Tên sản phẩm</p>
                                <p style={{ width: '15%', textAlign: 'left' }}>Đơn giá</p>
                                <p style={{ width: '15%', textAlign: 'left' }}>Số lượng</p>
                                <p style={{ width: '20%', textAlign: 'left' }}>Thành tiền</p>
                                <p style={{ width: '10%', textAlign: 'left' }}>Thao tác</p>
                            </div>
                            {cart?.map((item: any, idx: number) => (
                                <div key={idx} className="data-product">
                                    <div style={{ width: '10%' }}>
                                        <img className="img-product" src={item?.image} alt="" />
                                    </div>
                                    <p style={{ width: '30%', textAlign: 'left' }}>{item?.productName}</p>
                                    <p style={{ width: '15%', textAlign: 'left' }}>{item?.exportPrice}</p>
                                    <p style={{ width: '15%', textAlign: 'left' }}>{item?.quantity}</p>
                                    <p style={{ width: '20%', textAlign: 'left' }}>{parseInt(item?.quantity) * parseInt(item?.exportPrice)}</p>
                                    <div style={{ width: '10%', margin: 'auto' }}>
                                        <img className="icon" src={TrashIcon} alt="" onClick={(e) => {
                                            handleDeleteProductInCart(item?.productId);
                                        }} />
                                        <img className="icon" src={EditIcon} alt="" onClick={() =>
                                            handleOpenEdit(item)
                                        } />
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <div className="shipp">
                                <img className="shipp-icon" src={FreeShippIcon} alt="" />
                                <p>Miễn phí vận chuyển cho những đơn hàng trong vòng bán kính 5km</p>
                            </div>
                        </div>
                        <div className="payment">
                            <p style={{ margin: '32px 5px 0 0', fontSize: '24px' }}>Tổng thanh toán:</p>
                            <p className="label-payment">{calculateSummary()}(đ)</p>
                            <div className="btn-pay" onClick={() => {
                                navigation('/payment')
                            }}>
                                <p>Mua hàng</p>
                            </div>
                        </div>
                    </>
            }
            <p className="label-other">CÓ THỂ BẠN SẼ QUAN TÂM</p>
            <div className="productMenu">
                <div className="productCategory">
                    <img className="menu-icon" src={MeatIcon} alt="" />
                    <p>Thịt sạch</p>
                </div>
                <div className="productCategory">
                    <img className="menu-icon" src={SeaFoodIcon} alt="" />
                    <p>Thuỷ hải sản</p>
                </div>
                <div className="productCategory">
                    <img className="menu-icon" src={VegetableIcon} alt="" />
                    <p>Rau củ sạch</p>
                </div>
                <div className="productCategory">
                    <img className="menu-icon" src={FruitIcon} alt="" />
                    <p>Trái Cây</p>
                </div>
                <div className="productCategory">
                    <img className="menu-icon" src={EggIcon} alt="" />
                    <p>Trứng</p>
                </div>
                <div className="productCategory">
                    <img className="menu-icon" src={StarchIcon} alt="" />
                    <p>Tinh bột</p>
                </div>
            </div>
            <Footer />
            <CustomModal isOpen={openEdit} handleClose={handleCloseEdit} style={{
                width: '900px', height: '400px',
                background: 'white', outline: '1px solid gray', borderRadius: '12px'
            }}>
                <>
                    <p style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', color: '#FF8F8F' }}>Cập nhật giỏ hàng</p>
                    <img className="icon-cancel" onClick={handleCloseEdit} src={CancelIcon} alt="" />
                    <hr />
                    <div style={{
                        display: 'grid',
                        margin: '0 20%'
                    }}>
                        <TextField style={{ margin: '10px 0', color: 'red' }}
                            disabled
                            id="outlined-disabled"
                            label="Tên sản phẩm"
                            value={editSelected?.productName}
                        />
                        <TextField style={{ margin: '10px 0' }}
                            disabled
                            id="outlined-disabled"
                            label="Đơn giá"
                            value={editSelected?.exportPrice}
                        />
                        <TextField style={{ margin: '10px 0' }} id="outlined-basic" label="Số lượng" variant="outlined" type="number"
                            value={quantityUpdate} onChange={(e) => {
                                setQuantityUpdate(parseInt(e.target.value))
                                console.log(quantityUpdate);
                            }}
                        />
                        <Button style={{ color: 'white', background: '#88AB8E' }} onClick={handleUpdateQuantityCart}>Cập nhật</Button>
                    </div>
                </>
            </CustomModal>
        </div>
    )
}

export default Cart