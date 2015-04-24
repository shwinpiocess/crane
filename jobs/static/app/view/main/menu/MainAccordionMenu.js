/*
 * 折叠式菜单
 */

Ext.define('Jobs.view.main.menu.MainAccordionMenu', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainaccordionmenu',
    title: '系统菜单',
    glyph: 0xf0c9,

    layout: {
        type: 'accordion',
        animate: true
    },

    viewModel: 'main',

    initComponent: function() {
        this.items = [];
        var menus = this.getViewModel().get('systemMenu');
        for (var i in menus) {
            var menugroup = menus[i];
            var accpanel = {
                menuAccordion: true,
                xtype: 'panel',
                title: menugroup.text,
                bodyStyle: {
                    padding: '10px'
                },
                layout: 'fit',
                dockedItems: [{
                    dock: 'left',
                    xtype: 'toolbar',
                    items: []
                }],
                glyph: menugroup.glyph
            };

            for (var j in menugroup.items) {
                var menumodule = menugroup.items[j];
                accpanel.dockedItems[0].items.push({
                    xtype: 'transparentbutton',
                    text: this.addSpace(menumodule.text, 12),
                    glyph: menumodule.glyph,
                    handler: 'onMainMenuClick'
                });
            }
            this.items.push(accpanel);
        }
        this.callParent(accpanel);
    },

    addSpace: function(text, len) {
        var result = text;
        for (var i=text.length; i<len; i++) {
            result += '  ';
        }
        return result;
    }
});
