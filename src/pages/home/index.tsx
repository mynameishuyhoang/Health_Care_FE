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
import { Button } from "@mui/material";

const Home = () => {
    const [products, setProducts] = useState()
    const [productName, setProductName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    // const [totalPage, setTotalPage] = useState(1)


    const handleGetAndFilterProduct = async (productName?: string, categoryId?: string, pageSize?: number, pageNumber?: number) => {
        try {
            const { data } = await axios.post(`https://healthcare-bkmr.onrender.com/api/product/get`, null, {
                params: {
                    name: productName,
                    categoryId: categoryId,
                    pageNumber: pageNumber,
                    pageSize: pageSize
                }
            })

            console.log('dataFilter: ', data?.data);

            setProducts(data?.data)
            setTotalPage(data?.totalPage)

        } catch (err) {
            console.log(err)
        }
    }

    const handleSearchingProductName = (val: string) => {
        if (!val) {
            handleGetAndFilterProduct('', categoryId)
        } else {
            setProductName(val)
        }
    }

    const handleFilterCategory = (category: string) => {
        setCategoryId(category)
        handleGetAndFilterProduct(productName, category)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        handleGetAndFilterProduct(productName, categoryId, 12, value)
    };

    React.useEffect(() => {
        handleGetAndFilterProduct('', '', 12, 1)
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="home">
            <Slider />
            <hr />
            <div>

            </div>
            <div className="productMenu">
                <div className={`productCategory ${categoryId === '' && 'isActive'}`} onClick={() => handleFilterCategory('')} >
                    <img className="menu-icon" src={AllIcon} alt="" />
                    <p>Tất cả</p>
                </div>
                <div className={`productCategory ${categoryId === 'meat' && 'isActive'}`} onClick={() => handleFilterCategory('meat')}>
                    <img className="menu-icon" src={MeatIcon} alt="" />
                    <p>Thịt sạch</p>
                </div>
                <div className={`productCategory ${categoryId === 'seafood' && 'isActive'}`} onClick={() => handleFilterCategory('seafood')}>
                    <img className="menu-icon" src={SeaFoodIcon} alt="" />
                    <p>Thuỷ hải sản</p>
                </div>
                <div className={`productCategory ${categoryId === 'vegetable' && 'isActive'}`} onClick={() => handleFilterCategory('vegetable')}>
                    <img className="menu-icon" src={VegetableIcon} alt="" />
                    <p>Rau củ sạch</p>
                </div>
                <div className={`productCategory ${categoryId === 'fruit' && 'isActive'}`} onClick={() => handleFilterCategory('fruit')}>
                    <img className="menu-icon" src={FruitIcon} alt="" />
                    <p>Trái Cây</p>
                </div>
                <div className={`productCategory ${categoryId === 'egg' && 'isActive'}`} onClick={() => handleFilterCategory('egg')}>
                    <img className="menu-icon" src={EggIcon} alt="" />
                    <p>Trứng</p>
                </div>
                <div className={`productCategory ${categoryId === 'starch' && 'isActive'}`} onClick={() => handleFilterCategory('starch')}>
                    <img className="menu-icon" src={StarchIcon} alt="" />
                    <p>Tinh bột</p>
                </div>
            </div>
            <div className="search-product">
                <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm...." onChange={(e) => { handleSearchingProductName(e.target.value) }} />
                <Button onClick={() => handleGetAndFilterProduct(productName, categoryId)}>Tìm kiếm</Button>
            </div>
            <ProductCard products={products} />
            <Stack spacing={2} style={{ marginBottom: '20px' }}>
                <Pagination className="pagination-container" color="primary" count={totalPage} page={pageNumber} onChange={handleChange} />
            </Stack>
            <Footer />
        </div>
    )
}

export default Home