import React, { useContext, useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import { Container } from "react-bootstrap";
import { fetchSoldItems, fetchDevices, fetchBrands, fetchTypes } from "../http/deviceAPI";
import { Context } from '../index';

const Statistics = () => {
    const {device} = useContext(Context)

    //device.types.id
    //sdevice.brands.id

    //moneyOnTypes = []
    //moneyOnBrands = []


    const [soldItems, setSoldItems] = useState([])
    const [typesRevenue, setTypesRevenue] = useState([])
    const [brandsRevenue, setBrandsRevenue] = useState([])

    useEffect( () => {
        fetchSoldItems()
            .then(data => setSoldItems(data))
            .catch(error => console.log(error.message))

        fetchTypes()
            .then(data => device.setTypes(data))
            .catch(error => console.log(error))

        fetchBrands()
            .then(data => device.setBrands(data))
            .catch(error => console.log(error))

        fetchDevices()
            .then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
            .catch(error => console.log(error))

    }, [])

    //console.log(soldItems)

    const typeAmount = device.types.length
    const brandAmount = device.brands.length 

    //console.log(brandAmount)

    //console.log(soldItems.length)
    //console.log(soldItems[1].deviceId)
    //console.log(device.types[0].name)

    const getDevice = (deviceId) => {
        return device.devices.find((el) => el.id === deviceId)  
    }

    //const devices = device.devices.find((el) => el.id === deviceId)
    //console.log(devices)
    //console.log(devices.find({where: {id: 2}}) ) 

    let typesMoney = Array.apply(null, Array(5)).map((el) => {return (0)})
    let brandsMoney = Array.apply(null, Array(5)).map((el) => {return (0)})

    for (let i = 0; i < soldItems.length; i++)
    {
        let dev = getDevice(soldItems[i].deviceId)
        for (let g = 0; g < device.types.length; g++)
        {
            if (dev.typeId === device.types[g].id)
            {
                typesMoney[g] = (soldItems[i].amount * dev.price)
                //console.log("type")
                //setTypesRevenue([...typesRevenue, Number(dev.price) * Number(soldItems[i].amount) ])
            } 
        }
        for (let g = 0; g < device.brands.length; g++) {
            if (dev.brandId === device.brands[g].id)
            {
                brandsMoney[g] = (soldItems[i].amount * dev.price)
                //console.log("brand")
                //setBrandsRevenue([...brandsRevenue, dev.price  * soldItems[i].amount ])
            }
        }
        //fetchDevice(soldItems[i].deviceId).then(dev => {})
    }

    console.log(typesMoney)

    const brandNames = device.brands.map(el => {
        return el.name
    })

    const typeNames = device.types.map(el => {
        return el.name
    })

    //console.log(typeNames)

    // soldItems.map((item) => {
    //     fetchDevice(item.deviceId).then(dev => {
    //         dev.typeId 
    //     }) 
    // })

    return (
        //<Container>
            <div className="d-inline-flex justify-content-between">
                <Plot
                    className="d-flex ms-auto"
                    data={[
                        {
                            type: 'bar',
                            x: typeNames,
                            y: typesMoney
                        }
                    ]}
                    layout={{width: 450, height: 400, title: "График продаж по типам"}}
                />
                <Plot
                    className="d-flex me-auto"
                    data={[
                        {
                            type: 'bar',
                            x: brandNames,
                            y: brandsMoney
                        }
                    ]}
                    layout={{width: 450, height: 400, title: "График продаж по брендам"}}
                />
            </div>
        //</Container>
    );
}

export default Statistics;