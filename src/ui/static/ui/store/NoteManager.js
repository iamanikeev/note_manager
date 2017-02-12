Ext.define('MyApp.store.NoteManager', {
    requires: ['Ext.data.proxy.Rest', 'MyApp.model.NoteManager'],
    extend: 'Ext.data.Store',
    model: 'MyApp.model.NoteManager',

    remoteSort: true,
    remoteFilter: true,
    autoSync: true,
    pageSize: 50,

    proxy: {
        type: 'rest',
        url: '/api/notes/'
    }
});