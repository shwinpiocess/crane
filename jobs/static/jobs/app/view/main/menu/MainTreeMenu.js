/**
 * 树状菜单，显示在主界面的左边
 */

Ext.define('Jobs.view.main.menu.MainTreeMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'maintreemenu',

    title: '系统菜单',
    rootVisible: false,
    lines: false,

    initComponent: function() {
        this.store = Ext.create('Ext.data.TreeStore', {
            root : {
                text : '系统菜单',
                leaf : false,
                expanded : true
            }
        });

        var vm = this.up('app-main').getViewModel()
        var menus = vm.get('tf_MenuGroups');
        var root = this.store.getRootNode();
        for (var i in menus) {
            var menugroup = menus[i];
            var menuitem = root.appendChild({
                text : menugroup.tf_title,
                // 节点默认是否展开
                expanded : menugroup.tf_expand,
                icon : menugroup.tf_iconURL,
                glyph : menugroup.tf_glyph
            });

            for (var j in menugroup.tf_menuModules) {
                var menumodule = menugroup.tf_menuModules[j];

                var module = vm.getModuleDefine(menumodule.tf_ModuleId);
                if (module) {
                    var childnode = {
                        moduleId : module.tf_moduleId,
                        moduleName : module.tf_moduleName,
                        text : module.tf_title,
                        leaf : true
                    };
                    menuitem.appendChild(childnode);
                }
            }
        }
        this.callParent(arguments);
    }
});
