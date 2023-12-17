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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{
                            fontWeight: 600,
                            margin: '10px 0'
                        }}>{item.name}</p>
                        <p style={{
                            fontWeight: 600,
                            margin: '10px 0'
                        }}>{item.exportPrice} (đ)</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <p style={{
                            fontWeight: 600,
                            margin: '5px 0'
                        }}>Số lượng</p>
                        <p style={{
                            fontWeight: 600,
                            margin: '5px 0'
                        }}>{item.amount}</p>
                    </div>
                    <div>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: '8px 0 0 10px',
                            background: '#00B8A9',
                            border: '1px solid gray',
                            borderRadius: '4px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                padding: '0px 4px 2px'
                            }}>{item?.calo}</p>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: '40px 0 0 10px',
                            background: '#F6416C',
                            border: '1px solid gray',
                            borderRadius: '4px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                padding: '0px 4px 2px'
                            }}>{item?.protein}</p>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: '72px 0 0 10px',
                            background: '#3282B8',
                            border: '1px solid gray',
                            borderRadius: '4px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                padding: '0px 4px 2px'
                            }}>{item?.lipid}</p>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: '104px 0 0 10px',
                            background: '#6A2C70',
                            border: '1px solid gray',
                            borderRadius: '4px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                padding: '0px 4px 2px'
                            }}>{item?.sugar}</p>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: '136px 0 0 10px',
                            background: '#7D5A50',
                            border: '1px solid gray',
                            borderRadius: '4px'
                        }}>
                            <p style={{
                                color: 'white',
                                margin: 0,
                                padding: '0px 4px 2px'
                            }}>{item?.starch}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard