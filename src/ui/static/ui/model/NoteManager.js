Ext.define('MyApp.model.NoteManager', {
    extend: 'Ext.data.Model',

    idProperty: 'uuid',

    fields: [
        'uuid',
        'title',
        'text',
        'category',
        {name: 'chosen', type: 'boolean'},
        {name: 'created_datetime', type: 'date', dateFormat: 'c'}
    ]
});