/**
 * 页面顶部数据模型
 */

Ext.define('Jobs.view.top.TopModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.top',

    data: {
        system: {
            name: '运维系统',
            version: '1.0.0',
            iconUrl: '/static/jobs/resources/images/logo.gif'
        }
    }
});
