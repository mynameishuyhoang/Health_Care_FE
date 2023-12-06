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
        <div className="productContainer">
            {props.products?.map((item: any, idx: number) => (
                <div key={idx} className="productCard"
                    onClick={() => navigation(`/product-detail/${item?._id}`, {
                        state: {
                            product: item
                        }
                    })}>
                    <img className="productImg" src={item.image} alt="" />
                    <p>Tên sản phẩm: {item.name}</p>
                    <p>Giá: {item.exportPrice} vnđ</p>
                </div>
            ))}
        </div>
    )
}

export default ProductCard