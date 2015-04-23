/**
 * 系统界面的主区域, 是一个tabpanel, 可以有多个tab页面, 用来放置各个模块.
 */

Ext.define('Jobs.view.main.region.Center', {
    extend: 'Ext.tab.Panel',
    xtype: 'maincenter',

    requires: ['Jobs.view.main.region.HomePage'],

    closeAction: 'hide',
    autoDestroy: false,
    tabPosition: 'top',

    plugins: [
        {
            ptype: 'tabclosemenu',
            closeAllTabsText: '关闭所有标签页',
            closeOthersTabsText: '关闭其他标签页',
            closeTabText: '关闭标签页',

            //extraItemsTail: [
            //    '-',
            //    {
            //        text: '可关闭',
            //        itemId: 'canclose',
            //        checked: true,
            //        hideOnClick: false,
            //        handler: function(item) {
            //            item.ownerCt.tabPanel.tab.setClosable(item.checked);
            //        }
            //    },
            //    '-',
            //    {
            //        text: '登录时自动打开',
            //        itemId: 'autoopen',
            //        checked: false,
            //        hideOnClick: false,
            //        handler: function(item) {
            //            // TODO
            //            //if (item.checked) {
            //            //    
            //            //}
            //        }
            //    },
            //    '-',
            //    {
            //        xtype: 'fieldcontainer',
            //        items: {
            //            xtype: 'numberfield',
            //            fieldLabel: '最多打开标签数',
            //            itemId: 'maxtab',
            //            width: 156,
            //            value: 8,
            //            maxValue: 3
            //        }
            //    }
            //],
        },
        //Ext.create('Ext.ux.TabReordered')
    ],

    initComponent: function() {
        this.items = [
            {
                glyph: 0xf015,
                xtype: 'homepage',
                border: true,
                frame: false,
                reorderable: false
            }
        ]
        this.callParent();
    }
});
