import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import './navbar.scss'
import logo from "../../assets/images/logo.jpg"
import login from "../../assets/images/login.jpg"
import cart from "../../assets/images/cart.png"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from "../../pages/login";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Navbar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleCloseLogin = () => setOpen(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openauth = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    return (
        <div>
            <div className="navbar">
                <div className="logoContainer">
                    <NavLink to='/'>
                        <img className="imgLogo" src={logo} alt="Logo Health Care" />
                    </NavLink>
                </div>
                <div>
                </div>
                <div className="CartAndLogin">
                    {
                        localStorage.getItem('name') &&
                        <>
                            <NavLink to={`/cart/${localStorage.getItem('id')}`}>
                                <img className="imgCart" src={cart} alt="Giỏ Hàng" />
                            </NavLink>
                            <NavLink to={`/cart/${localStorage.getItem('id')}`} className='label-cart'>Giỏ hàng</NavLink>
                            <hr />
                        </>
                    }
                    {
                        localStorage.getItem('name')
                            ?
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={openauth ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openauth ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ color: 'red' }}
                                >
                                    <img className="imgLogin" src={login} alt="Người dùng" />
                                    <p style={{
                                        fontWeight: 600,
                                        color: "#527853"
                                    }}>{localStorage.getItem('name')}</p>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openauth}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={(e) => {
                                        handleClose()
                                        navigate(`/account/${localStorage.getItem('id')}`)
                                    }}>Tài khoản</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        handleClose()
                                        navigate('/history')
                                    }}>Lịch sử mua hàng</MenuItem>
                                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                </Menu>
                            </>
                            :
                            <>
                                <div onClick={handleOpen}>
                                    <img className="imgLogin" src={login} alt="Người dùng" />
                                </div>
                                {/* <div>
                        <Button onClick={handleOpen}>Đăng nhập</Button>
                    </div> */}
                                <div style={{ cursor: 'pointer' }} className="label-auth" onClick={handleOpen}>Đăng nhập</div>
                            </>
                    }
                </div>
            </div>
            <div className="header">
                <hr />
                <div className="link" onClick={() => navigate('/')} >
                    <p>Trang chủ</p>
                </div>
                <hr />
                <div className="link" onClick={() => navigate(`/cart/${localStorage.getItem('id')}`)} >
                    <p>Giới thiệu</p>
                </div>
                <hr />
                <div className="link" onClick={() => navigate(`/cart/${localStorage.getItem('id')}`)} >
                    <p>Tin tức</p>
                </div>
                <hr />
                <div className="link" onClick={() => navigate(`/cart/${localStorage.getItem('id')}`)} >
                    <p>Liên hệ</p>
                </div>
                <hr />
                <div className="link" onClick={() => navigate(`/cart/${localStorage.getItem('id')}`)} >
                    <p>Dinh dưỡng</p>
                </div>
                <hr />
            </div>
            <Outlet />
            <Modal
                open={open}
                onClose={handleCloseLogin}
                disableEscapeKeyDown={false}
            >
                <Box>
                    <Login handleCloseDlg={() => setOpen(false)} />
                </Box>
            </Modal>
        </div>
    )
}

export default Navbar