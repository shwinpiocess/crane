/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Jobs.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',

    requires: [
        'Jobs.view.main.MainController',
        'Jobs.view.main.MainModel',

        'Jobs.view.main.region.MainTop',
        'Jobs.view.main.region.MainLeft',
        'Jobs.view.main.region.MainBottom',
        'Jobs.view.main.menu.MainToolbarMenu',
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'maintop',
            region: 'north'
        },
        {
            xtype: 'maintoolbarmenu',
            region: 'north',
            hidden: true,
            bind: {
                hidden: '{!isToolbarMenu}'
            }
        },
        {
            xtype: 'mainbottom',
            region: 'south'
        },
        {
            xtype: 'mainleft',
            region: 'west',
            title: '导航菜单',
            width: 220,
            collapsible: true,
            split: true,
            hidden: true,
            bind: {
                hidden: '{!isTreeMenu}'
            }
        },
        {
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }],

    initComponent: function() {
        Ext.setGlyphFontFamily('FontAwesome');
        this.callParent();
    },

    // 监听窗口大小改变
    listeners: {
        resize: function(container) {
            container.getController().onMainResize();
        }
    }
});
