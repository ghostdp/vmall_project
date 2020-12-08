

requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});

// require.js的时候，如果引入绝对路径，需要带有后缀名

define(['jquery' , '/api/server.js' , '/js/modules/banner.js'],function($ , { getBannerData , getPhoneData , getBookData , getPadData , actionLogin } , initBanner){

    //console.log($);
    //console.log(getBannerData);
    //console.log(initBanner);

    actionLogin().then((res)=>{
        console.log(res);
    });

    getBannerData().then((res)=>{
        //console.log(res);
        initBanner(res);
    });

    getPhoneData().then((res)=>{
        initGoods('#phone' , res);
    });

    getBookData().then((res)=>{
        initGoods('#book' , res);
    });
    getPadData().then((res)=>{
        initGoods('#pad' , res);
    });

    // 初始化商品
    function initGoods( parentId , data ){

        var $parent = $(parentId);
        var tmp = `
            <h2 class="goods_title">${data.title}</h2>
            <ul class="goods_list clearfix">
                ${
                    data.goods_list.map((v,i)=>{
                        return `
                            <li>
                                <a target="_blank" href="/view/detail.html?type=${data.type}&id=${v.goodsId}">
                                    <div><img src="${v.goodsImg}" alt=""></div>
                                    <h3>${v.goodsName}</h3>
                                    <p>${v.goodsPrice}</p>
                                </a>
                            </li> 
                        `;
                    }).join('').repeat(3)
                }
            </ul>
        `;

        $parent.html(tmp);


    }

});