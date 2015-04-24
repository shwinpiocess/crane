/*
 * 系统主页的顶部区域，主要放置系统名称，菜单，和一些快捷按钮 
 */

Ext.define('Jobs.view.main.region.MainTop', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'maintop',

    requires: [
        'Jobs.view.ux.TransparentButton',
        'Jobs.view.main.menu.MainButtonMenu'
    ],

    defaults: {
        xtype: 'transparentbutton'
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
        '->',
        {
            xtype: 'mainbuttonmenu',
            hidden: true,
            bind: {
                hidden: '{!isTreeMenu}'
            }
        },
        ' ',
        ' ',
        {
            text: '主页',
            glyph : 0xf015
        },
        {
            text: '帮助',
            glyph : 0xf059
        },
        {
            text: '关于',
            glyph : 0xf06a
        },
        {
            text: '注销',
            glyph : 0xf011
        },
        '->',
        '->',
        {
            text: '设置',
            glyph : 0xf013
        },
        {
            glyph: 0xf102,
            handler: 'hiddenTopBottom',
            tooltip: '隐藏顶部和底部区域'
        }
    ]
});
