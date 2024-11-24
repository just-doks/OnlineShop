import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI';

const CreateDevice = observer ( ({show, onHide}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)
    const {device} = useContext(Context)

    useEffect( () => {
        fetchTypes()
            .then(data => device.setTypes(data))
            .catch(error => console.log(error))

        fetchBrands()
            .then(data => device.setBrands(data))
            .catch(error => console.log(error))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const isDataComplete = () => {
        if (name && price && file && brand && type) 
            return true
        else 
            return false
    }

    const closeModal = () => {
        onHide()
        setName('')
        setPrice('')
        setBrand(null)
        setType(null)
    }

    const addDevice = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('img', file)
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle>
                            {type 
                            ? type.name 
                            : "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(t => 
                                <Dropdown.Item 
                                key={t.id}
                                onClick={() => setType(t)} 
                                >
                                    {t.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle>
                            {brand
                            ? brand.name 
                            : "Выберите бренд"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(b => 
                                <Dropdown.Item 
                                key={b.id}
                                onClick={() => setBrand(b)}
                                >
                                    {b.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mb-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className='mb-3'
                        placeholder='Введите цену устройства'
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}/>
                    <Form.Control
                        className='mb-0'
                        type="file"
                        onChange={selectFile}/>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="secondary" onClick={closeModal}>
                    Отмена
                </Button>
                { isDataComplete() 
                ?   <Button 
                    variant="primary" 
                    onClick={addDevice}>
                        Сохранить
                    </Button>
                :   <Button 
                    variant="primary" 
                    onClick={addDevice}
                    disabled>
                        Сохранить
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;