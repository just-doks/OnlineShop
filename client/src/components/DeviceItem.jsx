import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Image, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE, LOGIN_ROUTE } from '../utils/constants';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const DeviceItem = observer( ({device,  type, brand}) => {
    const navigate = useNavigate()

    const {user, basket} = useContext(Context)

    //let [isPushed, setIsPushed] = useState(false)

    //useEffect(() => {setIsPushed(basket.isPushed(device))}, [context.device.page])

    const onNavigate = () => navigate(LOGIN_ROUTE)

    const imageSrc = process.env.REACT_APP_API_URL + device.img
   
    return (
        <Col 
            md={4} 
            className='mb-5'
        >
            <Card style={{width: 220}} border="light">
                <Image 
                    width={220} 
                    height={220} 
                    src={imageSrc}
                    //onClick={onNavigate}
                    style={{objectFit: "contain"}}
                />
                <div className='text-black-50' style={{fontSize: 14}}>
                    {type.name + ' - ' + brand.name} 
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <Stack 
                        direction='vertical'
                        //onClick={onNavigate}
                        //style={{cursor: "pointer"}}
                    >
                        <div>{device.name}</div>
                        <div style={{fontSize: 14}}>Цена: {device.price}₽</div>
                    </Stack>
                    { !basket.isPushed(device) ?
                        <Button 
                            variant={'warning'}
                            onClick={user.isAuth ? () => basket.push(device) : onNavigate}
                            className="py-1 px-2"
                        >
                            Купить
                        </Button>
                        :
                        <Button 
                            variant={'warning'}
                            style={{fontSize: 14}}
                            className="py-1 px-1"
                            disabled
                        >
                            В корзине
                        </Button>
                    }
                </div>
            </Card>
        </Col>
    );
})

export default DeviceItem;