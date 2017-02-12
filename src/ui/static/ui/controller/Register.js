Ext.define('MyApp.controller.Register', {
    extend: 'Ext.app.Controller',
    mixins: ['Ext.mixin.Observable'],
    views: ['Register'],

    // pointers into the view
    refs: [
        { 'ref': 'username', selector: '#username' },
        { 'ref': 'password', selector: '#password' },
        { 'ref': 'email', selector: '#email' },
        { 'ref': 'regSubmitButton', selector: '#regSubmitButton' },
    ],

    init: function() {
        console.log('init reg controller');
        const registerController = this;
        const win = registerController.registrationWindow = this.getView('Register').create();
        console.log(registerController);

        this.control({
            '#regSubmitButton': {
                click: () => {
                    const username = this.getUsername().getValue();
                    const password = this.getPassword().getValue();
                    const email = this.getEmail().getValue();
                    win.mask('Verifying');
                    Ext.Ajax.request({
                        scope: this,
                        url: '/api/register/',
                        params: {
                            username: username,
                            password: password,
                            email: email
                        },
                        success: (res) => {
                            const data = res.responseText;
                            registerController.unmaskAndHide();
                            this.getController('Login')
                                .showLoginWindow()
                                .setUsername(data.username)
                                .clearPasswordAndFocus()
                        },
                        failure: (res) => {
                            const data = res.responseText;
                            const popUp = new Ext.form.Panel({
                                width: 500,
                                height: 400,
                                title: 'Failed to register a user',
                                html: data,
                                floating: true,
                                closable : true
                            });
                            registerController.registrationWindow.unmask();
                            popUp.show();
                        },
                    });
                }
            }
        });

        // register keyboard handler
        this.nav = new Ext.KeyNav(win.getEl(), {
            // enter key -> login-button click
            enter: () => {
                this.getRegSubmitButton().fireEvent('click')
            }
        });
    },

    showRegistrationWindow: function () {
        this.registrationWindow.show();
        return this;
    },

    unmaskAndHide: function() {
        this.registrationWindow.unmask();
        this.registrationWindow.hide();
    },
});

