/*
 * 系统首页的定义
 */

Ext.define('Jobs.view.main.region.HomePage', {
    extend: 'Ext.panel.Panel',
    xtype: 'homepage',
    layout: 'border',

    title: '首页',

    items: [
        {
            title: '相关事项',
            region: 'west',
            collapsible: true,
            split: true,
            width: 300,
            layout: 'accordion',
            header: {
                style: 'backgroud-color: #f6f5ec'
            },
            items: [
                {
                    title: '待办事项'
                },
                {
                    title: '最近访问过的模块'
                },
                {
                    title: '最近修改过的数据'
                }
            ]
        },
        {
            title: '主显示区',
            header: {
                style: 'backgroud-color: #f6f5ec'
            },
            region: 'center'
        }
    ]
});
