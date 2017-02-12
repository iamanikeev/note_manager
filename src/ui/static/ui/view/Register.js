Ext.define('MyApp.view.Register', {
    extend: 'Ext.window.Window',
    renderTo: Ext.getBody(),
    id: "registrationBox",

    title: 'Register',
    width: 400,
    layout: 'form',
    bodyPadding: 5,

    closable: false,
    resizable: false,
    draggable: false,

    defaultFocus: 'user',

    defaultType: 'textfield',
    items: [
        {
            itemId: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            inputType: 'password',
            fieldLabel: 'Password',
            itemId: 'password',
            allowBlank: false
        },
        {
            inputType: 'email',
            fieldLabel: 'email',
            itemId: 'email',
            allowBlank: false
        },
    ],
    buttons: [{
        text: 'Register',
        itemId: 'regSubmitButton',
    }],

});