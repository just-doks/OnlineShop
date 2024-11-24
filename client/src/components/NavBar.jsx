import React, { useContext } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import {Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants';

const NavBar = observer( () => {
    const {user, basket} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        basket.clear()
        localStorage.removeItem('token')
        navigate(SHOP_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>SHOP</NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        { user.isAdmin() && 
                        <Button 
                            variant={'outline-light'}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            className='ms-3'
                            >Админ панель</Button>
                        }
                        <Button 
                            variant={'outline-light'}
                            onClick={() => navigate(BASKET_ROUTE)}
                            className='ms-3'
                            >Корзина</Button>
                        <Button variant={'outline-light'} 
                            className='ms-3'
                            onClick={logOut}
                            //onClick={() => user.setIsAuth(false)}
                        >Выйти</Button>
                    </Nav>
                :
                <Nav className="ms-auto" style={{color: 'white'}}>
                    <Button variant={'outline-light'} 
                        className='ms-3'
                        onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
                }
            </Container>
      </Navbar>
    );
});

export default NavBar;