/**
 * 登录页面展示实现
 */

Ext.define('Jobs.view.login.Login', {
    extend: 'Ext.window.Window',
    requires: [
        'Jobs.view.login.LoginController',
        'Ext.form.Panel'
    ],

    xtype: 'login',
    
    controller: 'login',
    bodyPadding: 10,
    title: '运维系统登录',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: '用户名',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: '密码',
            allowBlank: false
        }],
        buttons: [{
            text: '登录',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});
