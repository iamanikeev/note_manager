Ext.define('MyApp.store.NoteManager', {
    requires: ['MyApp.helper.DjangoProxy', 'MyApp.model.NoteManager'],
    extend: 'Ext.data.Store',
    model: 'MyApp.model.NoteManager',
    alias: 'notemanager',

    remoteSort: true,
    remoteFilter: true,
    autoSync: true,
    pageSize: 50,

    proxy: {
        type: 'django',
        url: '/api/notes/'
    }
});