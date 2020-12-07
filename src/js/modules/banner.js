

define(['jquery'],function($){

    //初始化banner
    var $bannerList = $('.banner-list');
    
    function initBanner(data){
        var tmp = `
            <ul>
                ${
                    data.banner_list.map((v,i)=>{
                        return `<li class="${ i == 0 ? 'show' : '' }"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`;
                    }).join('')
                }
            </ul>
            <ol>
                ${
                    data.banner_list.map((v,i)=>{
                        return `<li class="${ i == 0 ? 'active' : '' }"></li>`;
                    }).join('')
                }
            </ol>
        `;
        $bannerList.html(tmp);
        bindBanner();
    }

    function bindBanner(){
        var $olLis = $bannerList.find('ol li');
        var $ulLis = $bannerList.find('ul li');

        $olLis.on('click',function(){
            $ulLis.eq( $(this).index() ).attr('class','show').siblings().attr('class','');
            $(this).attr('class','active').siblings().attr('class','');
        });

    }


    return initBanner;

});