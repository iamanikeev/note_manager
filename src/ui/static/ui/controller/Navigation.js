Ext.define('MyApp.controller.Navigation', {
    extend: 'Ext.app.Controller',
    views: ['Navigation'],
    refs: [
        { 'ref': 'loginMessage', selector: '#loginMessage' },
        { 'ref': 'contentPanel', selector: '#contentPanel' }
    ],

    init: function() {
        const navigationController = this;
        this.view = this.getView('Navigation').create().hide();

        this.control({
            '#logoutButton': {
                click: function() {
                    navigationController.view.mask('Logout…');
                    MyApp.getApplication().getController('Login').performLogout(() => {
                        navigationController.view.unmask();
                        navigationController.view.hide();
                        // relaunch application
                        MyApp.getApplication().launch();
                    });
                }
            }
        })
    },

    updateUserinfo: function(userinfo) {
        this.getLoginMessage().setData(userinfo);
        return this;
    }
});