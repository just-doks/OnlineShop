import React, { useState } from 'react';
import { Button, Container, Tabs, Tab } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import { observer } from 'mobx-react-lite';
import Statistics from '../components/Statistics';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [key, setKey] = useState('add_new_things');

    return (
        <Container>
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                //defaultActiveKey="add_new_things"
                className='mt-3'
            >
                <Tab
                    eventKey="add_new_things"
                    title="Добавление"
                    className='d-flex justify-context-center'
                >
                    { key === "add_new_things" ?
                    <Container className="d-flex flex-column">
                        <Button 
                            className='mt-3' 
                            variant="outline-primary"
                            onClick={() => setTypeVisible(true)}
                        >Добавить тип</Button>
                        <Button 
                            className='mt-3' 
                            variant="outline-primary"
                            onClick={() => setBrandVisible(true)}
                        >Добавить бренд</Button>
                        <Button 
                            className='mt-3' 
                            variant="outline-primary"
                            onClick={() => setDeviceVisible(true)}
                        >Добавить устройство</Button>
                        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                        <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                    </Container>
                    : <></>
                    }
                </Tab>
                <Tab
                    eventKey="statistics"
                    title="Статистика"
                >
                    <Statistics/>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Admin;