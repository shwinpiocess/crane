/**
 * 登录逻辑控制
 */

Ext.define('Jobs.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function() {
        //localStorage.setItem('LoggedIn', true);

        //this.getView().destroy();
        //Ext.widget('app-main');
        var form = this.lookupReference('form');
        if (form.isValid()) {
            this.retrieveToken({
                data: form.getValues(),
                scope: this
            })
        }
    },

    retrieveToken: function(options) {
        return Ext.Ajax.request({
            url: '/jobs/api/v1/authtoken/',
            params: options.data,
            scope: this,
            success: function(response, opts) {
                console.log(response)
                localStorage.setItem('LoggedIn', true);
                this.getView().destroy();
                Ext.widget('app-main');
                
            },
            failure: function(response, opts) {
                Ext.Msg.alert('登录提示', '登录失败');
            }
        });
    }

    //login: function(options) {
    //    Ext.Ajax.request({
    //        url: '/jobs/api/v1/authtoken/',
    //        method: 'POST',
    //        params: options.data
    //        scope: this,
    //        callback: this.onLoginCallback,
    //        original: options
    //    });
    //},

    //onLoginCallback: function(options, success, response) {
    //    options = options.original;

    //    if (success) {
    //        console.log('login success');
    //        console.log(response);
    //        Ext.callback(options.success, options.scope, [options.data.username, options.data.password]);
    //        return;
    //    }
    //},

    ////登录成功
    //onLoginSuccess: function() {
    //    localStorage.setItem('LoggedIn', true);
    //    this.getView().destroy();
    //    Ext.widget('app-main');
    //}
});
