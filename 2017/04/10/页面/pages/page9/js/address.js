new Vue({
    el: '.container',
    data: {
        limitNumber: 8,
        addressList: [],
        loadFlag: true,
        currentIndex: 0,
        shippingMethod: 1,
        delFlag: false,
        modFlag: false,
        addFlag:false,
        modalFlag:false,
        userName: "",
        streetName: "",
        postCode: "",
        tel: ""
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed: {
        filteredAddress: function () {
            return this.addressList.slice(0, this.limitNumber);
        }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            axios.get("data/address.json").then(response => {
                var res = response.data;
                if (res.status == "1") {
                    _this.addressList = res.result;
                }
            });
        },
        loadAll: function (loadFlag) {
            this.loadFlag = !this.loadFlag;
            if (this.loadFlag) {
                this.limitNumber = 3;
            } else {
                this.limitNumber = this.addressList.length;
            }
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            });
        },
        delConfirm: function (index) {
            this.delFlag = true;
            this.currentIndex = index;
        },
        delAddress: function () {
            this.addressList.splice(this.currentIndex, 1);
            this.delFlag = false;
            //axios.get() 通过后台删除
        },
        modAddress: function (index) {
            this.modalFlag = true;
            this.modFlag = true;
            this.currentIndex = index;
            this.userName = this.addressList[index].userName;
            this.streetName = this.addressList[index].streetName;
            this.postCode = this.addressList[index].postCode;
            this.tel = this.addressList[index].tel;
        },
        modConfirm: function () {
            this.$set(this.addressList[this.currentIndex], "userName", this.userName);
            this.$set(this.addressList[this.currentIndex], "streetName", this.streetName);
            this.$set(this.addressList[this.currentIndex], "postCode", this.postCode);
            this.$set(this.addressList[this.currentIndex], "tel", this.tel);
            this.modFlag = false;
            this.modalFlag=false;
        },
        addAddress: function () {
            this.modalFlag = true;
            this.addFlag = true;
            this.userName = "";
            this.streetName = "";
            this.postCode = "";
            this.tel = "";
        },
        addConfirm: function () {
            var newAddress = {
                "addressId": "100005",
                "userName": this.userName,
                "streetName": this.streetName,
                "postCode": this.postCode,
                "tel": this.tel,
                "isDefault": false
            }
            this.addressList.push(newAddress);
            this.addFlag = false;
            this.modalFlag=false;
        }
    }
})