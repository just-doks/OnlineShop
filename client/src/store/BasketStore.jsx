import {makeAutoObservable} from 'mobx'


export default class BasketStore {
    constructor() {
        this._items = []
        this._orderPrice = 0
        makeAutoObservable(this)
    }

    push(device) {
        if (!this.isPushed(device))
        {
            this._items.push({device: device, amount: 1})
            this._orderPrice += device.price
        }
    }
    remove(device) {
        const item = this._items.find((el) => el.device.id === device.id)
        this._orderPrice -= (item.device.price * item.amount) 
        this._items = this._items.filter(function(el) {
            return el.device.id !== device.id 
        })
        //this._items.splice(this._items.indexOf(item), 1)

    }
    isPushed(device) {
        const item = this._items.find(el => el.device.id === device.id)
        //const index = this._items.indexOf({device})
        //if (index > -1) 
        if (item)
            return true
        else 
            return false
    }
    increaseNumber(device) {
        let item = this._items.find(el => el.device.id === device.id)
        item.amount = item.amount + 1
        this._orderPrice += item.device.price
    }
    decreaseNumber(device) {
        let item = this._items.find(el => el.device.id === device.id)
        if (item.amount > 1)
        {
            item.amount = item.amount - 1
            this._orderPrice -= item.device.price
        }
    }

    getDeviceAmount(device) {
        return this._items.find({device}).amount
    }
    clear() {
        this._items.length = 0
        this._orderPrice = 0
    }

    get items() {
        return this._items
    }
    get orderPrice() {
        return this._orderPrice
    }

    

}