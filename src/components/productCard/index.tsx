import React from "react";
import "./productCard.scss"
import { useNavigate } from "react-router-dom";

interface ProductsProps {
    products: any
}

const ProductCard = (props: ProductsProps) => {

    console.log('props 1111: ', props.products);
    const navigation = useNavigate()

    return (
        <div className="product-container">
            {props.products?.map((item: any, idx: number) => (
                <div key={idx} className="product-card"
                    onClick={() => navigation(`/product-detail/${item?._id}`, {
                        state: {
                            product: item
                        }
                    })}>
                    <img className="product-img" src={item.image} alt="" />
                    <p>Tên sản phẩm: {item.name}</p>
                    <p>Đơn vị tính: 100 gram</p>
                    <p>Giá: {item.exportPrice} vnđ</p>
                    {item.amount !== 0 ?
                        <p>Số lượng: {item.amount}</p>
                        :
                        <p>Hết hàng</p>
                    }
                </div>
            ))}
        </div>
    )
}

export default ProductCard