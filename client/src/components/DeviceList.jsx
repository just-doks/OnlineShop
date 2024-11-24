import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';

const DeviceList = observer(
    () => {
        const {device} = useContext(Context)
        
        return (
            <Row className='mt-2 d-flex justify-content-start align-items-center'>
                {device.devices.map(d =>
                    <DeviceItem 
                    key={d.id} 
                    device={d} 
                    type={device.types.find((el) => el.id === d.typeId)}
                    brand={device.brands.find((el) => el.id === d.brandId)}/>
                )}
            </Row>
        );
    }
);

export default DeviceList;