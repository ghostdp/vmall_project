




requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});


define(['jquery','/js/modules/cartStorage.js'],function($ , { getCartStorage , setCartStorage }){

    
    initCart();
    bindCart();
    
    // 初始化购物车数据
    function initCart(){
        var cartList = getCartStorage();

        $('.cart_list').html(
            cartList.map((v,i)=>{
                return `
                    <li>
                        <div>
                            ${ v.goodsChecked ? '<input class="cart_list_cb" type="checkbox" checked>' : '<input class="cart_list_cb" type="checkbox">' }
                        </div>
                        <div>${v.goodsName} ( ${v.goodsType} )</div>
                        <div>¥ ${v.goodsPrice}.00</div>
                        <div>
                            <span class="cart_list_reduce">-</span>
                            <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                            <span class="cart_list_add">+</span>
                        </div>
                        <div class="cart_list_price">¥ ${ v.goodsPrice * v.goodsNumber }.00</div>
                        <div class="cart_list_remove">删除</div>
                    </li>
                `;
            }).join('')
        );

        var $cartListCb = $('.cart_list_cb');
        var $cartTitleSelectAll = $('.cart_title_selectAll');
        var flag = true;
        $cartListCb.each(function(i,elem){
            if( elem.checked == false ){
                flag = false;
            }
        });        

        if(flag){
            // 设置checked属性的时候，最好用prop方法，不要用attr方法
            $cartTitleSelectAll.prop('checked',true);
        }
        else{
            $cartTitleSelectAll.prop('checked',false);
        }

        var numberAll = 0;
        var priceAll = 0;

        $cartListCb.each(function(i,elem){
            if( elem.checked == true ){
                numberAll += cartList[i].goodsNumber;
                priceAll += cartList[i].goodsNumber * cartList[i].goodsPrice;
            }
        });

        $('.cart_computed_price p').eq(0).html(`总计：¥ ${priceAll}.00`);        
        $('.cart_computed_price p').eq(1).html(`已选择 ${numberAll}件商品`);        
    }

    // 操作购物车功能
    function bindCart(){

        var cartList = getCartStorage();

        $('#cart').on('click','.cart_list_add',function(){
            var index = $(this).closest('li').index();
            cartList[index].goodsNumber++;
            setCartStorage(cartList);
            initCart();
        });

        $('#cart').on('click','.cart_list_reduce',function(){
            var index = $(this).closest('li').index();
            if(cartList[index].goodsNumber > 1){
                cartList[index].goodsNumber--;
            }
            setCartStorage(cartList);
            initCart();
        });

        $('#cart').on('click','.cart_list_cb' ,function(){
            var index = $(this).closest('li').index();
            cartList[index].goodsChecked = !cartList[index].goodsChecked;
            setCartStorage(cartList);
            initCart();
        });

        $('#cart').on('click','.cart_list_remove',function(){
            var index = $(this).closest('li').index();
            cartList.splice(index , 1);
            setCartStorage(cartList);
            initCart();
        });

    }

});