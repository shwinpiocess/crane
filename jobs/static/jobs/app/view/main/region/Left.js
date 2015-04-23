/**
 * 左边的菜单区域，可以放树形菜单或折叠菜单
 */

Ext.define('Jobs.view.main.region.Left', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainleft',

    requires: [
        'Jobs.view.main.menu.MainTreeMenu',
        'Jobs.view.main.menu.MainAccordionMenu'
    ],

    lyout: {
        type: 'accordion',
        animate: true
    },
    glyph: 0xf0c9,
    tools: [
        {
            type: 'pin',
            tooltip: '层叠方式显示菜单',
            listeners: {
                click: function(tool) {
                    var panel = tool.up('mainleft');
                    panel.insert(0, {xtype: 'mainleftaccordion'});
                    panel.items.items[0].expand();
                    panel.remove(panel.down('maintreemenu'), true);
                    tool.hide();
                    tool.nextSibling().show();
                }
            }
        },
        {
            type: 'unpin',
            tooltip: '树状方式显示菜单',
            hidden: true,
            listeners: {
                click: function(tool) {
                    var panel = tool.up('mainleft');
                    panel.insert(0, {xtype: 'maintreemenu'});
                    panel.items.items[0].expand();
                    Ext.each(panel.query('mainaccordionmenu'), function(accordion) {
                        panel.remove(accordion, true);
                    })
                    tool.hide();
                    tool.previousSibling().show();
                }
            }
        },
        {
            itemId: 'up',
            type: 'up',
            tooltip: '水平方式显示菜单',
            handler: 'showMainToolbarMenu'
        }
    ],

    initComponent: function() {
        this.items = [
            {
                xtype: 'maintreemenu'
            }
        ];
        this.callParent();
    }
});
