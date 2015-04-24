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
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    // 隐藏顶部和底部的按钮事件
    hiddenTopBottom: function() {
        this.getView().down('maintop').hide();
        this.getView().down('mainbottom').hide();

        // 显示顶部和底部的一个控件，在顶部和底部隐藏了以后，显示在页面的最右上角
        if (!this.showButton) {
            this.showButton = Ext.widget('component', {
                glyph: 0xf013,
                view: this.getView(),
                floating: true,
                x: document.body.clientWidth - 32,
                y: 0,
                height: 4,
                width: 26,
                style: 'background-color: #cde6c7;',
                listeners: {
                    el: {
                        click: function(el) {
                            var c = Ext.getCmp(el.target.id);
                            c.view.down('maintop').show();
                            c.view.down('mainbottom').show();
                            c.hide();
                        }
                    }
                }
            })
        };

        this.showButton.show();
    },

    // 如果顶部和底部都隐藏了，这时窗口的大小改变就要调整显示顶部和底部的那个控件的位置
    onMainResize: function() {
        if (this.showButton && !this.showButton.hidden) {
            this.showButton.setX(document.body.clientWidth -32);
        }
    },

    // 在左边显示树状菜单按钮点击事件
    showTreeMenu: function(button) {
        this.getView().getViewModel().set('menuType.value', 'tree');
    },

    // 在上面显示菜单条按钮点击事件
    showMainToolbarMenu: function(button) {
        this.getView().getViewModel().set('menuType.value', 'toolbar');
    },

    // 在顶部显示菜单按钮点击事件
    showButtonMenu: function(button) {
        this.getView().getViewModel().set('menuType.value', 'button');
    },
});
