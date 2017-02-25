var H5_loading = function (images,firstPage) {
    var id = this.id;
    if (this._images === undefined){  //第一次进入
        this._images = (images || []).length;
        this._loaded = 0;   //最开始加载了0个资源
        //this 指 new 出来的 H5对象
        window[id] = this; //把当前对象存储在全局对象window中，用来进行某个图片加载完成之后的回调

        for (s in images) {
            var item = images[s];
            var img = new Image; //创建一个图片对象
            img.onload = function () {  //载入完成之后
                window[id].loader();
            }
            img.src = item;  //为图片指定地址
        }
        $('#rate').text('0%');
        return this;
    } else {
        this._loaded ++;
        $('#rate').text((this._loaded / this._images * 100 >> 0) + '%'); // >> 右移运算符
        if(this._loaded < this._images){
            return this;
        }
    }
    window[id] = null;
    this.el.fullpage({
        onLeave: function (index,nextIndex,direction) {
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad: function (anchorLink,index) {
            $(this).find('.h5_component').trigger('onLoad');
        }
    });
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
    if (firstPage){
        $.fn.fullpage.moveTo(firstPage);
    }
}