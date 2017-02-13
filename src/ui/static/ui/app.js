Ext.application({
    /**
     * Application entry point
     */
    name: 'MyApp',
    appFolder : '/static/ui',
    controllers: ['Login', 'Navigation', 'Register', 'NoteManager'],
    requires: [
        'MyApp.helper.CrsfTokenHelper'
    ],

    launch: function () {
        const app = this;
        const loginController = app.getController('Login');
        const navigationController = app.getController('Navigation');
        const noteManagerController = app.getController('Register');
        loginController.getUserInfo((userInfo) => {
            if (userInfo !== false) {
                navigationController.updateUserinfo(userInfo).view.show();
                navigationController.fireEvent('ready');
            } else {
                app.getController('Login').showLoginWindow().clearForm();
                navigationController.fireEvent('ready');
            }
        });
    }
});