/**
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */

Ext.define('Jobs.view.main.menu.MainAccordionMenu', {
    extend : 'Ext.panel.Panel',
    xtype: 'mainaccordionmenu',
    title : '系统菜单',

    layout : {
        type : 'accordion',
        animate : true
    },

    initComponent : function() {
        this.items = [];
        var vm = this.up('app-main').getViewModel();
        var menus = vm.get('tf_MenuGroups');
        var me = this;
        for (var i in menus) {
            var menugroup = menus[i];
            var accpanel = {
                menuAccordion : true,
                xtype : 'panel',
                title : menugroup.tf_title,
                bodyStyle : {
                    padding : '10px'
                },
                layout : 'fit',
                dockedItems : [{
                    dock : 'left',
                    xtype : 'toolbar',
                    items : []
                }],
                glyph : menugroup.tf_glyph
            };
            for (var j in menugroup.tf_menuModules) {
                var menumodule = menugroup.tf_menuModules[j];
                var module = vm.getModuleDefine(menumodule.tf_ModuleId);
                if (module) {
                    accpanel.dockedItems[0].items.push({
                        xtype : 'buttontransparent',
                        text : this.addSpace(module.tf_title, 12),
                        glyph : module.tf_glyph,
                        handler : 'onMainMenuClick'
                    });
                }
            }
            this.items.push(accpanel);
        }
        this.callParent(arguments);
    },

    addSpace : function(text, len) {
        var result = text;
        for (var i = text.length; i < len; i++) {
            result += '　';
        }
        return result;
    }

});
