/**
 * 左侧属性菜单导航实现
 */

Ext.define('Jobs.view.treemenu.TreeMenu', {
    //renderTo: Ext.getBody(),
    extend: 'Ext.tree.Panel',
    xtype: 'tree-menu',
    title: '系统菜单',
    width: 250,
    split: true,

    root: {
        text: '主菜单',
        expanded: true,
        children: [
            {
                text: '用户管理',
                leaf: true,
                href: 'http://www.baidu.com'
            },
            {
                text: '资产管理',
                expanded: true,
                children: [
                    {
                        text: '添加资产',
                        leaf: true
                    },
                    {
                        text: '查看资产',
                        leaf: true
                    },
                    {
                        text: '添加IDC',
                        leaf: true
                    },
                    {
                        text: '查看IDC',
                        leaf: true
                    },
                    {
                        text: '添加主机组',
                        leaf: true
                    },
                    {
                        text: '查看主机组',
                        leaf: true
                    }
                ]
            },
            {
                text: '',
                expanded: true,
                children: [
                    {
                        text: 'Grandchild',
                        leaf: true
                    }
                ]
            }
        ]
    }
    //requires: ['Jobs.view.treemenu.TreeMenuModel'],

    //xtype: 'tree-menu',
    //title: '系统菜单',
    //rootVisible: false,

    //viewModel: {
    //    type: 'treemenu'
    //},

    //initComponent: function() {
    //    this.store = Ext.create('Ext.data.TreeStore', {
    //        root: {
    //            text: '系统菜单',
    //            leaf: false,
    //            expanded: true
    //        }
    //    });

    //    var menus = this.getViewModel().get('systemMenu');
    //    var root = this.store.getRootNode();
    //    for (var i in menus) {
    //        var menugroup = menus[i];
    //        var menuitem = root.appendChild({  
    //            text : menugroup.text,  
    //            expanded : menugroup.expanded,  
    //            icon : menugroup.icon,  
    //            glyph : menugroup.glhpy  
    //        });  
    //        for (var j in menugroup.items) {  
    //            var menumodule = menugroup.items[j];  
    //            var childnode = {  
    //                moduleId : menumodule.text,  
    //                moduleName : menumodule.module,  
    //                text : menumodule.text,  
    //                leaf : true  
    //            };  
    //            menuitem.appendChild(childnode);  
    //        }
    //    }
    //    this.callParent(arguments);
    //}
});
