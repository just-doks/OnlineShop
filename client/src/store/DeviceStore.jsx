import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._types = []
        // [
        //     {id: 1, name: "Смартфоны"},
        //     {id: 2, name: "Планшеты"},
        //     {id: 3, name: "Ноутбуки"},
        //     {id: 4, name: "Смартчасы"}
        // ]
        this._brands = []
        // [
        //     {id: 1, name: "Samsung"},
        //     {id: 2, name: "Apple"},
        //     {id: 3, name: "Xiaomi"},
        //     {id: 4, name: "Huawei"}
        // ]
        this._devices = []
        // [
        //     {id: 1, name: "iPhone 15 Pro", price: 100000, img: `img`},
        //     {id: 2, name: "iPhone 15 Pro", price: 100000, img: `img`},
        //     {id: 3, name: "iPhone 15 Pro", price: 100000, img: `img`},
        //     {id: 4, name: "iPhone 15 Pro", price: 100000, img: `img`}
        // ]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(selectedType) {
        this.setPage(1)
        if (selectedType === this._selectedType)
            this._selectedType = {}
        else
            this._selectedType = selectedType
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        if (brand === this._selectedBrand)
            this._selectedBrand = {}
        else
            this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(amount) {
        this._totalCount = amount
    }
    setLimit(limit) {
        this._limit = limit
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }

}