import React, { useState } from "react";
import './home.scss'
import Footer from "../../components/footer";
import ProductCard from "../../components/productCard";
import Slider from "../../components/slider";
import AllIcon from '../../assets/icons/all.png'
import MeatIcon from '../../assets/icons/meat.png'
import SeaFoodIcon from '../../assets/icons/seafood.png'
import VegetableIcon from '../../assets/icons/vegetables.png'
import FruitIcon from '../../assets/icons/fruits.png'
import EggIcon from '../../assets/icons/eggs.png'
import StarchIcon from '../../assets/icons/starch.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState()
    const baseURL = 'https://c1bb-113-176-107-225.ngrok-free.app'; // Replace with your base URL

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://9797-156-220-22-73.ngrok-free.app',
        },
    });

    const handleGetProducts = async () => {
        try {
            const { data } = await axiosInstance.post(`/api/product`)
            console.log('data: ', data);
            setProducts(data?.data)

        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        handleGetProducts()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="home">
            <Slider />
            <hr />
            <div>

            </div>
            <div className="productMenu">
                <div className="productCategory">
                    <img className="menu-icon" src={AllIcon} alt="" />
                    <p>Tất cả</p>
                </div>
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
            <ProductCard products={products} />
            <Stack spacing={2}>
                <Pagination className="pagination-container" count={10} variant="outlined" shape="rounded" />
            </Stack>
            <Footer />
        </div>
    )
}

export default Home