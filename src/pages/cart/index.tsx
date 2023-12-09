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

interface Products {
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

    const handleGetCart = async () => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/${localStorage.getItem('id')}`)
            console.log('data: ', data?.data);
            setCart(data?.data?.products)

        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteProductInCart = async (data?: any) => {
        try {
            const res = await axios.post(`https://healthcare-bkmr.onrender.com/api/cart/delete/${localStorage.getItem('id')}`, {
                ...data
            })
            console.log('res: ', res);
            alert("xoá sản phẩm ra giỏi hàng thành công")
            handleGetCart()

        } catch (err) {
            console.log(err)
        }
    }

    console.log('cart: ', cart);




    React.useEffect(() => {
        handleGetCart()
        window.scrollTo(0, 0)
    }, [])


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
            <div className="item-label">
                <p style={{ width: '10%' }}>Hình ảnh</p>
                <p style={{ width: '30%', textAlign: 'left' }}>Tên sản phẩm</p>
                <p style={{ width: '15%', textAlign: 'left' }}>Đơn giá</p>
                <p style={{ width: '15%', textAlign: 'left' }}>Số lượng</p>
                <p style={{ width: '20%', textAlign: 'left' }}>Thành tiền</p>
                <p style={{ width: '10%', textAlign: 'left' }}>Thao tác</p>
            </div>
            <div className="data-product-container">
                {cart?.map((item: any, idx: number) => (
                    <div key={idx} className="data-product">
                        <div style={{ width: '10%' }}>
                            <img className="img-product" src={item?.image} alt="" />
                        </div>
                        <p style={{ width: '30%', textAlign: 'left' }}>{item?.productName}</p>
                        <p style={{ width: '15%', textAlign: 'left' }}>{item?.exportPrice}</p>
                        <div className="amount-container">
                            <p className="decrease">-</p>
                            <input className="input-amount" type="number" value={item?.quantity} />
                            <p className="increase">+</p>
                        </div>
                        <p style={{ width: '20%', textAlign: 'left' }}>{parseInt(item?.quantity) * parseInt(item?.exportPrice)}</p>
                        <div style={{ width: '10%', margin: 'auto' }}>
                            <img className="trash-icon" src={TrashIcon} alt="" onClick={() => {
                                handleDeleteProductInCart(item?.productId);
                            }} />
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
                <div className="btn-pay" onClick={() => navigation('/payment')}>
                    <p style={{ cursor: 'pointer' }}>Mua hàng</p>
                </div>
            </div>
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
        </div>
    )
}

export default Cart