/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Jobs.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Jobs',

        // 系统信息
        system : {
            name : '工程项目合同及资金管理系统',
            version : '5.2014.06.60',
            iconUrl : ''
        },

        // 用户单位信息和用户信息
        user : {
            company : '武当太极公司',
            department : '工程部',
            name : '张三丰'
        },

        // 菜单显示方式(button, toolbar, tree)
        menuType : {
            value : 'toolbar'
        },

        // 服务单位和服务人员信息
        service : {
            company : '无锡熙旺公司',
            name : '蒋锋',
            phonenumber : '1320528----',
            qq : '78580822',
            email : 'jfok1972@qq.com',
            copyright : '熙旺公司'
        },

        // 系统菜单的定义，这个菜单可以是从后台通过ajax传过来的
        systemMenu : [
            {
                text : '工程管理', // 菜单项的名称
                icon : '', // 菜单顶的图标地址
                glyph : 0,// 菜单项的图标字体的数值
                expanded : true, // 在树形菜单中是否展开
                description : '', // 菜单项的描述
                items : [
                    {
                        text : '工程项目', // 菜单条的名称
                        module : 'Global', // 对应模块的名称
                        icon : '', // 菜单条的图标地址
                        glyph : 0xf0f7 // 菜单条的图标字体
                        },
                    {
                        text : '工程标段',
                        module : 'Project',
                        icon : '',
                        glyph : 0xf02e
                    }
                ]
            },
            {
                text : '合同管理',
                expanded : true,
                items : [
                    {
                        text : '项目合同',
                        module : 'Agreement',
                        glyph : 0xf02d
                    },
                    {
                        text : '合同付款计划',
                        module : 'AgreementPlan',
                        glyph : 0xf03a
                    },
                    {
                        text : '合同请款单',
                        module : 'Payment',
                        glyph : 0xf022
                    },
                    {
                        text : '合同付款单',
                        module : 'Payout',
                        glyph : 0xf0d6
                    },
                    {
                        text : '合同发票',
                        module : 'Invoice',
                        glyph : 0xf0a0
                    }
                ]
            },
            {
                text : '综合查询',
                glyph : 0xf0ce,
                expanded : true,
                items: [
                    {
                        text : '项目合同台帐',
                        module : 'Agreement',
                        glyph : 0xf02d
                    },
                    {
                        text : '合同付款计划台帐',
                        module : 'AgreementPlan',
                        glyph : 0xf03a
                    },
                    {
                        text : '合同请款单台帐',
                        module : 'Payment',
                        glyph : 0xf022
                    },
                    {
                        text : '合同付款单台帐',
                        module : 'Payout',
                        glyph : 0xf0d6
                    },
                    {
                        text : '合同发票台帐',
                        module : 'Invoice',
                        glyph : 0xf0a0
                    }
                ]
            }
        ]
    },

    formulas: {
        isButtonMenu: function(get) {
            return get('menuType.value') == 'button';
        },
        isToolbarMenu: function(get) {
            return get('menuType.value') == 'toolbar';
        },
        isTreeMenu: function(get) {
            return get('menuType.value') == 'tree';
        }
    },

    // 根据data.systemMenu生成菜单条和菜单按钮
    getMenus: function() {
        var items = [];
        var menuData = this.get('systemMenu');
        Ext.Array.each(menuData, function(group) {
            var submenu = [];
            // 对每一个菜单项，获取其子菜单
            Ext.Array.each(group.items, function(menuitem) {
                submenu.push({
                    mainmenu: 'true',
                    moduleName: menuitem.module,
                    text: menuitem.text,
                    icon: menuitem.icon,
                    glyph: menuitem.glyph,
                    handler: 'onMainMenuClick' //按钮点击的处理程序
                })
            })

            var item = {
                text: group.text,
                menu: submenu,
                icon: group.icon,
                glyph: group.glyph
            };
            items.push(item);
        })

        return items;
    }
});
