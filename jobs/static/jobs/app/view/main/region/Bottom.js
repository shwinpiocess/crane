/**
 * 系统主页的底部区域，主要放置用户单位信息，服务单位和服务人员信息
 */
Ext.define('Jobs.view.main.region.Bottom', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'mainbottom',

    style : 'background-color: #f6f5ec;',

    items : [
        {
            bind: {
                text : '{userInfo.tf_userdwmc}'
            },
            glyph : 0xf0f7
        },
        {
            bind: {
                text : '{userInfo.tf_departmentName}'
            }
        },
        {
            bind : {
                text : '用户:{userInfo.tf_userName}'
            },
            glyph : 0xf007
        },
        '->',
        {
            bind: {
                text : '{serviceInfo.tf_serviceDepartment}'
            },
            glyph : 0xf059
        },
        {
            bind: {
                text : '{serviceInfo.tf_serviceMen}'
            }
        },
        {
            bind: {
                text : '{serviceInfo.tf_serviceTelnumber}'
            },
            glyph : 0xf095
        },
        {
            bind : {
                hidden : '{!serviceInfo.tf_serviceEmail}', // 绑定值前面加！表示取反，如果有email则不隐藏，如果email未设置，则隐藏
                text : '{serviceInfo.tf_serviceEmail}'
            },
            glyph : 0xf003,
            handler : function(button) {
                // 发送邮件
                var vm = button.up('app-main').getViewModel();
                var link = "mailto:" + vm.get('serviceInfo.tf_serviceEmail')
                + "?subject=" + vm.get('userInfo.tf_userdwmc')
                + vm.get('userInfo.tf_userName') + " 关于 "
                + vm.get('systemInfo.tf_systemName') + " 的咨询";
                window.location.href = link;
            }
        },
        {
            bind : {
                text : '©{serviceInfo.tf_copyrightOwner}'
            }
        }
    ]
});
