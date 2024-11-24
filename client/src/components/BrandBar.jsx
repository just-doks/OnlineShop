import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite';
import { Context } from '../index';
import { Button, Col, Row } from 'react-bootstrap';


const BrandBar = observer(
    () => {
        const {device} = useContext(Context)
        return (
            <Row>
                {device.brands.map(brand =>
                    <Col key={brand.id} md='auto'>
                        <Button 
                            className='py-1 px-3 mb-2'
                            variant={
                                device.selectedBrand.id === brand.id
                                ? 'secondary'
                                : 'outline-secondary'
                            }
                            onClick={() => device.setSelectedBrand(brand)}
                        >
                            {brand.name}
                        </Button> 
                    </Col>   
                )}
            </Row>
        );
    }
);

export default BrandBar;