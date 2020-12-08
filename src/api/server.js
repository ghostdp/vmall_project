

// 所有的数据的接口提供给外面
define(['jquery'] , function($){


    //jquery中的ajax也提供了promise用法

    function getBannerData(){
        return $.ajax('/api/mock/banner.json');
    }
    function getBanner2Data(){
        return $.ajax('/api/mock/banner2.json'); 
    }
    function getPhoneData(){
        return $.ajax('/api/mock/phone.json');
    }
    function getBookData(){
        return $.ajax('/api/mock/book.json');
    }
    function getPadData(){
        return $.ajax('/api/mock/pad.json');
    }
    function getDetailData(type , id){
        var promise = new Promise(function(resolve,reject){
            $.ajax(`/api/mock/${type}.json`).then((res)=>{
                //res -> 对应type下的 数据集合
                for(var i=0;i<res.goods_list.length;i++){
                    if(res.goods_list[i].goodsId == id){
                        resolve(res.goods_list[i]);
                    }
                }
            });
        });
        return promise;
    }

    function actionLogin(){
        return $.ajax('/api2/login.php');
    }

    return {
        getBannerData,
        getBanner2Data,
        getPhoneData,
        getBookData,
        getPadData,
        getDetailData,
        actionLogin
    }


});