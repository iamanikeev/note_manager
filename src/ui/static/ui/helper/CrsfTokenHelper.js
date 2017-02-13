Ext.define('MyApp.helper.CrsfTokenHelper', {
    /**
     * Adds X-CSRFToken header to all requests
     */
    singleton: true,

    constructor: function() {
        Ext.Ajax.on('beforerequest', function (conn, options) {
            options.url = options.url.replace(/\/?$/, '/'); // append trailing slash to every request
            if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
                if (typeof (options.headers) === "undefined") {
                    options.headers = {
                        'Accept': 'application/json',
                        'X-CSRFToken': Ext.util.Cookies.get('csrftoken')
                    };
                } else {
                    options.headers['Application'] = 'application/json';
                    options.headers['X-CSRFToken'] = Ext.util.Cookies.get('csrftoken');
                }
            }
        }, this);
    }
});