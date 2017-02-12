Ext.define('MyApp.controller.Login', {
    extend: 'Ext.app.Controller',
    mixins: ['Ext.mixin.Observable'],
    views: ['Login'],

    refs: [
        {'ref': 'userField', selector: '#user'},
        {'ref': 'passField', selector: '#pass'},
        {'ref': 'submitButton', selector: '#submit'},
        {'ref': 'registerButton', selector: '#register'},
    ],

    init: function () {
        const loginController = this;
        const win = loginController.loginWindow = this.getView('Login').create();

        this.control({
            // register for the login-click
            '#submit': {
                click: () => {
                    const username = this.getUserField().getValue();
                    const password = this.getPassField().getValue();
                    win.mask('Verifying…');
                    loginController.performLogin(username, password);
                }
            },
            '#register': {
                click: () => {
                    loginController.unmaskAndHide();
                    this.getController('Register').showRegistrationWindow();
                }
            }
        });

        // register keyboard handler
        this.nav = new Ext.KeyNav(win.getEl(), {
            // enter key -> login-button click
            enter: () => {
                loginController.getSubmitButton().fireEvent('click')
            }
        });
    },

    /**
     * Return either current user info, or null, no user is logged in currently
     */
    getUserInfo: function (callback) {
        Ext.Ajax.request({
            scope: this,
            url: '/api/auth/user/',
            success: (res) => {
                const data = Ext.util.JSON.decode(res.responseText);
                callback(data);
            },
            failure: () => {
                callback(false);
            },
        });
    },

    performLogin: function (username, password) {
        const loginController = this;
        const navigationController = this.getController('Navigation');

        Ext.Ajax.request({
            url: '/api/auth/login/',
            method: 'POST',
            params: {
                'username': username,
                'password': password
            },
            scope: this,
            success: () => {
                loginController.getUserInfo((userInfo) => {
                    if (userInfo !== false) {
                        navigationController.updateUserinfo(userInfo);
                        loginController.unmaskAndHide();
                        navigationController.view.show();
                        loginController.fireEvent('ready');
                    } else {
                        loginController.clearPasswordAndFocus().setPasswordError('Failed to fetch user info upon login');
                    }
                });
            },
            failure: () => {
                loginController.loginWindow.unmask();
                loginController.clearPasswordAndFocus().setPasswordError('Invalid Username or Password!');
            }
        });
    },

    // ask the backend to throw away our session which makes us logged out
    performLogout: function (callback) {
        console.info('trying to log out from backend');

        // ensure userinfo is unset
        this.userinfo = null;

        Ext.Ajax.request({
            url: '/api/auth/logout/',
            method: 'POST',
            params: {
                'sessionid': Ext.util.Cookies.get('sessionid')
            },
            success: () => {
                Ext.callback(callback);
            },
            failure: () => {
                Ext.callback(callback);
            }
        });
    },

    showLoginWindow: function () {
        this.loginWindow.show();
        return this;
    },

    unmaskAndHide: function () {
        this.loginWindow.unmask();
        this.loginWindow.hide();
    },

    setUsername: function (username) {
        this.getUserField().setValue(username).unsetActiveError();
        return this;
    },

    clearForm: function () {
        this.loginWindow.unmask();
        this.getPassField().setValue('').unsetActiveError();
        this.getUserField().setValue('').unsetActiveError();
        this.getUserField().focus();
        return this;
    },

    clearPasswordAndFocus: function () {
        this.getPassField().setValue('').focus();
        return this;
    },

    setPasswordError: function (msg) {
        this.getPassField().setActiveErrors([msg]);
        return this;
    }
});