import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => setValue(''))
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button 
                    variant="secondary"
                    onClick={onHide}>
                    Отмена
                </Button>
                <Button 
                    variant="primary"
                    onClick={addBrand}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;