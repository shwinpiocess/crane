/*
 * 显示在顶部的按钮菜单，可以切换至标准菜单，树形菜单
 */

Ext.define('Jobs.view.main.menu.MainButtonMenu', {
    extend: 'Jobs.view.ux.TransparentButton',
    xtype: 'mainbuttonmenu',

    viewModel: 'main',
    text: '菜单',
    glyph: 0xf0c9,

    initComponent: function() {
        this.menu = this.getViewModel().getMenus();
        this.callParent();
    }
});
