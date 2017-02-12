Ext.define('MyApp.view.Navigation', {
    layout: 'border',
    extend: 'Ext.container.Container',
    renderTo: Ext.getBody(),
    id: "navigationContainer",

    width: '100%',
    height: '100%',

    items: [{
        region: 'north',
        xtype: 'toolbar',
        itemId: 'tbar',
                title: 'Navigation',

        items: [
            '->',
            { tpl: 'Logged in as {username}', xtype: 'label', itemId: 'loginMessage'},
            { text: 'Logout', itemId: 'logoutButton' }
        ]

    },{
        region: 'center',
        xtype: 'container',
        itemId: 'contentPanel',
        layout: {
            type: 'card',
            deferredRender: true
        },

        items: [
            { title: 'Note manager' }
        ]
    }]
});