/**
 * 运维系统首页展示实现
 */
Ext.define('Jobs.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',

    requires: [
        'Jobs.view.main.MainController',
        'Jobs.view.main.MainModel',
        //'Jobs.view.main.region.Center',
        'Jobs.view.main.region.Top',
        'Jobs.view.main.region.Bottom',
        //'Jobs.view.main.region.Left',
        //'Jobs.view.main.menu.MainToolbarMenu',
    //    'Jobs.view.treemenu.TreeMenu',
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    initComponent: function() {
         // 设置图标字体文件，只有设置了以后才能用glyph属性
        Ext.setGlyphFontFamily('FontAwesome');
        this.callParent();
    },

    listeners: {
        resize: function(container) {
            container.getController().onMainResize();
        }
    },

    items: [
        //顶部面板定义
        {
            xtype: 'maintop',
            region: 'north'
        },
        //{
        //    xtype: 'maintoolbarmenu',
        //    region: 'north',
        //    hidden: true,
        //    bind: {
        //        hidden: '{!isToolbarMenu}'
        //    }
        //},
        {
            xtype: 'mainbottom',
            region: 'south',
        },
        //{
        //    xtype: 'mainleft',
        //    region: 'west',
        //    title: '导航菜单',
        //    width: 220,
        //    collapsible: true,
        //    split: true,
        //    hidden: true,
        //    bind: {
        //        hidden: '{!isTreeMenu}'
        //    }
        //},
        //// 中间面板定义
        //{
        //    region: 'center',
        //    xtype: 'maincenter'
        //}
    ]
});
