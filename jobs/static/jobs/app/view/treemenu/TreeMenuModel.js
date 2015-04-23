/*
 * 树形菜单数据模型
 */

Ext.define('Jobs.view.treemenu.TreeMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.treemenu',

    data: {
        systemMenu:  [
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
                        glyph : 0xf0f7  
                        // 菜单条的图标字体  
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
                items : [
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
    }
});

