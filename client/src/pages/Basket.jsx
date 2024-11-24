import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState} from 'react';
import { Container, Stack, Button } from 'react-bootstrap';
import { Context } from '../index';
import BasketItem from '../components/BasketItem';
import { createOrder } from '../http/deviceAPI';

const Basket = observer(() => {
    const {user, basket} = useContext(Context)

    //console.log(user.user.id)

    const countOrderPrice = () => {
        let count = 0
        for (let i = 0; i < basket.items.length; i++)
        {
            count = count + basket.items[i].device.price
        }
        return count
    }

    const getItems = () => {
        return basket.items.map((item) => {
            return {amount: item.amount, deviceId: item.device.id}
        })
    }

    const addOrder = () => {
        const formData = new FormData()
        formData.append('price', basket.orderPrice)
        formData.append('userId', user.user.id)
        formData.append('items', JSON.stringify(getItems()))
        //console.log(formData)
        createOrder(formData).then(() => basket.clear())
    }

    return (
        <Container>
        <Stack 
        direction='vertical' 
        className='mx-auto mt-3'
        style={{width: 600}}
        >
            { basket.items.map(item => 
                <BasketItem 
                key={item.device.id} 
                device={item.device} 
                amount={item.amount}
                />
            )}
            { basket.items.length > 0 ?
            //<h3 className='d-flex justify-content-center'>Корзина пуста</h3>
            //:
            <div className='d-flex flex-column'>
                <div className='mb-3 justify-content-start'>Общая стоимость: {basket.orderPrice}</div>
                <div className='d-flex justify-content-between'>
                    <Button
                        variant='primary'
                        onClick={addOrder}
                    >
                        Оформить заказ
                    </Button>
                    <Button 
                        variant='danger'
                        onClick={() => basket.clear()}
                    >
                        Очистить корзину
                    </Button>
                </div>
            </div>
            : <h3 className='d-flex justify-content-center'>Корзина пуста</h3>
            }
        </Stack>
        </Container>
    )
});

export default Basket;