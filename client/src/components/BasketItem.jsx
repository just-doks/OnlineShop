import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../index';

const BasketItem = observer(({device, amount}) => {
    const {basket} = useContext(Context)
    const imageSrc = process.env.REACT_APP_API_URL + device.img
    return (
        <><Row className='d-flex align-items-center'>
            <Col md={7}><div className='mx-1'>{device.name}</div></Col>
            <Col md={3}>
                <div className='d-flex justify-content-center align-items-center'>
                    <Button
                        variant='outline-secondary'
                        className='py-1'
                        style={{ borderRadius: 50 }}
                        onClick={() => basket.decreaseNumber(device)}
                    >
                        -
                    </Button>
                    <div className='px-3'>{amount}</div>
                    <Button
                        variant='outline-secondary'
                        className='py-1'
                        style={{ borderRadius: 50 }}
                        onClick={() => basket.increaseNumber(device)}
                    >
                        +
                    </Button>
                </div>
            </Col>
            <Col md={2}>
                <Button 
                    variant='danger'
                    onClick={() => basket.remove(device)}
                >
                    Убрать
                </Button>
            </Col>
        </Row>
        <hr /></>
    );
});

export default BasketItem;