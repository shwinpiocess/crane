/**
 * 运维系统首页展示实现
 */
Ext.define('Jobs.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'Jobs.view.main.MainController',
        'Jobs.view.main.MainModel',
        'Jobs.view.top.Top',
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'top',
            region: 'north',
        },
        {
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: '退出',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }]
});
