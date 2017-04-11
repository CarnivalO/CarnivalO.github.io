Vue.filter("money", function (value, type) {
    return "$ " + value.toFixed(2) + type;
});
new Vue({
    el: "#app",
    data: {
        delFlag: false,
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        curProduct: ''
    },
    filters: {

    },
    mounted: function () {
        this.cartView();
        this.calcTotalPrice;
    },
    methods: {
        cartView: function () {
            // var _this = this;
            // axios.get("data/cart.json").then(function (res) {
            //     _this.productList = res.data.result.productList;
            //     _this.totalMoney = res.data.result.totalMoney;
            // }).catch(function (error) {
            //     console.log(error);
            // });
            axios.get("data/cart.json").then(res => {
                this.productList = res.data.result.productList;
                // this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuentity++;
            } else {
                product.productQuentity--;
                if (product.productQuentity < 1) {
                    product.productQuentity = 1
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                //Vue.set(item,"checked",true);
                this.$set(item, "checked", true); //通过vue监听不存在的变量
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        ckeckAll: function () {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", _this.checkAllFlag); //通过vue监听不存在的变量
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuentity;
                }
            });
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalPrice()
            axios.get() //通过后台删除
        }
    }
});