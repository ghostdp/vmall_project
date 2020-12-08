


define(['jquery'],function($){

    var key = 'cartList';

    //添加购物车本地存储
    function addCartStorage(goodsData , cb){

        var cartList = getCartStorage();
        var flag = true;
        var index = -1;

        for(var i=0;i<cartList.length;i++){
            if( cartList[i].goodsType == goodsData.goodsType && cartList[i].goodsId == goodsData.goodsId ){  
                flag = false;
                index = i;
            }
        }

        if(flag){   // 什么时候添加数据到本地存储
            cartList.push(goodsData);
            setCartStorage(cartList);
        }
        else{   // 什么时候累加数据到本地存储
            cartList[index].goodsNumber += goodsData.goodsNumber;
            setCartStorage(cartList);
        }

        cb();

    }

    //设置购物车本地存储
    function setCartStorage( data ){
        localStorage.setItem(key , JSON.stringify(data) );
    }

    //获取购物车本地存储
    function getCartStorage(){
        return JSON.parse( localStorage.getItem( key ) || '[]' );
    }

    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }


});