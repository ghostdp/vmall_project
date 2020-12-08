




requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});


define(['jquery' , '/api/server.js' , '/js/modules/banner.js' , '/js/modules/cartStorage.js'],function($ , { getBanner2Data , getDetailData } , initBanner , { addCartStorage }){

    var type = location.search.match(/type=([^&]+)/)[1];
    var id = location.search.match(/id=([^&]+)/)[1];
    //console.log( type , id );

    getDetailData(type , id).then((res)=>{
        initDetailGoods(res);
        initGallery();
        initInfos();
        addCart(res);
    });

    getBanner2Data().then((res)=>{       
        initBanner(res);
    });

    //初始化detail数据
    function initDetailGoods(data){
        $('.detail_gallery').html(`
            <div class="detail_gallery_normal">
                <img src="${data.photoNormal}" alt="">
                <span></span>
            </div>
            <div class="detail_gallery_large">
                <img src="${data.photoLarge}" alt="">
            </div>
        `);

        $('.detail_message').html(`
            <h2>${data.goodsName}</h2>
            <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
            <p>选择颜色 
                ${
                    data.chooseColor.map((v,i)=>{
                        return `<span class="detail_message_box">${v}</span>`;
                    }).join('')
                }
            </p>
            <div class="detail_message_btn clearfix">
                <div class="detail_message_num l">
                    <input type="text" value="1">
                    <span>+</span>
                    <span>-</span>
                </div>
                <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                <div class="detail_message_computed l"><a href="/view/cart.html">立即下单</a></div>
            </div>
        `);

        $('#detailGoods').html(`
            <h3>-- 商品详情 --</h3>
            ${
                data.goodsInfo.map((v,i)=>{
                    return `
                        <img src="${v}" alt="">
                    `;
                }).join('')
            }
        `);

    }

    // 放大镜功能实现
    function initGallery(){
        var $detailGalleryNormal = $('.detail_gallery_normal');
        var $normalSpan = $detailGalleryNormal.find('span');
        var $detailGalleryLarge = $('.detail_gallery_large');
        var $largeImg = $detailGalleryLarge.find('img');

        $detailGalleryNormal.hover(function(){
            $normalSpan.show();
            $detailGalleryLarge.show();
        },function(){
            $normalSpan.hide();
            $detailGalleryLarge.hide();
        }).mousemove(function(ev){
            
            var L =  ev.pageX - $detailGalleryNormal.offset().left - $normalSpan.outerWidth()/2;
            var T = ev.pageY - $detailGalleryNormal.offset().top - $normalSpan.outerHeight()/2;

            if(L<0){
                L = 0;
            }
            else if(L > $detailGalleryNormal.outerWidth() - $normalSpan.outerWidth()){
                L = $detailGalleryNormal.outerWidth() - $normalSpan.outerWidth();
            }

            if(T<0){
                T = 0;
            }
            else if(T > $detailGalleryNormal.outerHeight() - $normalSpan.outerHeight()){
                T = $detailGalleryNormal.outerHeight() - $normalSpan.outerHeight();
            }

            $normalSpan.css({
                left : L,
                top : T
            });

            var scaleX = L / ($detailGalleryNormal.outerWidth() - $normalSpan.outerWidth());
            var scaleY = T / ($detailGalleryNormal.outerHeight() - $normalSpan.outerHeight());

            $largeImg.css({
                left : - scaleX * ( $largeImg.outerWidth() - $detailGalleryLarge.outerWidth() ) ,
                top : - scaleY * ( $largeImg.outerHeight() - $detailGalleryLarge.outerHeight() )
            });

        });
    }

    // 控制商品信息的交互
    function initInfos(){

        var $numberInput = $('.detail_message_num input');

        $('.detail_message_box').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    
        $('.detail_message_num').on('click','span:eq(0)',function(){   // +
            //console.log(1);
            var val = $numberInput.val();
            val++;
            $numberInput.val(val);
        });

        $('.detail_message_num').on('click','span:eq(1)',function(){   // -
            //console.log(2);
            var val = $numberInput.val();
            if(val > 1){
                val--;
            }
            $numberInput.val(val);
        });

        $numberInput.on('input',function(){
            var val = $(this).val();
            if( isNaN(Number(val)) ){   // 输入的不是数字
                $(this).val(1);
            }
        });

    }

    // 添加购物车的功能
    function addCart(data){
        var $detailMessageCart = $('.detail_message_cart');
        var goodsData = {};
        $detailMessageCart.on('click',function(){

            goodsData.goodsName = data.goodsName;
            goodsData.goodsPrice = data.goodsPrice;
            goodsData.goodsId = data.goodsId;
            goodsData.goodsNumber = Number($('.detail_message_num input').val());
            goodsData.goodsChecked = true;
            goodsData.goodsType = $('.detail_message_box').filter('.active').html();

            //console.log( goodsData );

            addCartStorage( goodsData , function(){
                alert('添加成功！！！！');
            });

        });

    }
});