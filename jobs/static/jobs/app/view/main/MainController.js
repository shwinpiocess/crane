/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Jobs.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    onClickButton: function () {
        Ext.Msg.confirm('退出', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            localStorage.removeItem('LoggedIn');
            this.getView().destroy();
            Ext.widget('login');
        }
    },

    // 隐藏顶部和底部的按钮事件
    hiddenTopBottom: function() {
        // 如果要操纵控件，最好的办法是根据相对路径来找到该控件，用down或up最好，尽量少用getCmp()函数。
        this.getView().down('maintop').hide();
        this.getView().down('mainbottom').hide();
        if (!this.showButton) {
            // 显示顶部和底部的一个控件，在顶部和底部隐藏了以后，显示在页面的最右上角
            this.showButton = Ext.widget('component', {
                glyph : 0xf013,
                view : this.getView(),
                floating : true,
                x : document.body.clientWidth - 32,
                y : 0,
                height : 4,
                width : 26,
                style : 'background-color:#cde6c7',
                listeners: {
                    el: {
                        click : function(el) {
                            var c = Ext.getCmp(el.target.id); // 取得component的id值
                            c.view.down('maintop').show();
                            c.view.down('mainbottom').show();
                            c.hide();
                        }
                    }
                }
            })
        }

        this.showButton.show();
    },

    // 如果窗口的大小改变了，并且顶部和底部都隐藏了，就要调整显示顶和底的那个控件的位置
    onMainResize : function() {
        if (this.showButton && !this.showButton.hidden) {
            this.showButton.setX(document.body.clientWidth - 32);
        }
    },
});
