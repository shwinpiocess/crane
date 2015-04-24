/*
 * 透明的Button类，继承于Button
 */

Ext.define('Jobs.view.ux.TransparentButton', {
    extend: 'Ext.button.Button',
    xtype: 'transparentbutton',

    initComponent: function() {
        this.listeners = {
            // 鼠标移开，背景设置透明
            mouseout: function() {
                this.setTransparent(document.getElementById(this.id));
            },

            // 鼠标经过，背景取消透明
            mouseover: function() {
                var button = document.getElementById(this.id);
                button.style.backgroundImage = '';
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            },

            // 背景设置透明
            afterrender: function() {
                this.setTransparent(document.getElementById(this.id));
            }
        };

        this.callParent(arguments);
    },

    setTransparent: function(button) {
        button.style.backgroundImage = 'inherit';
        button.style.backgroundColor = 'inherit';
        button.style.borderColor = 'transparent';
    }
});
