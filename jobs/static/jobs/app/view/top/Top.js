/**
 * 页面顶部定义
 */

Ext.define('Jobs.view.top.Top', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'top',

    requires: [
        'Jobs.view.top.TopModel',
    ],

    viewModel: {
        type: 'top'
    },

    items: [
        {
            xtype: 'image',
            bind: {
                hidden: '{!system.iconUrl}',
                src: '{system.iconUrl}'
            }
        },
        {
            xtype: 'label',
            bind: {
                text: '{system.name}'
            },
            style: 'font-size: 20px; color: blue;'
        },
        {
            xtype: 'label',
            bind: {
                text: '{system.version}'
            }
        },
        '->', '->',
        {
            text: '注销'
        }
    ]
});
