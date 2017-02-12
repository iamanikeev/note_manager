Ext.define('MyApp.controller.NoteManager', {
    extend: 'Ext.app.Controller',
    views: ['NoteManager'],
    stores:['NoteManager'],

    refs: [
        { 'ref': 'noteManagerGrid', selector: '#noteManagerGrid' },
    ],

    init: function() {
        const noteManagerController = this;
        const loginController = MyApp.getApplication().getController('Login');

        this.control({
            '#tbDelete': {
                click: this.onRemoveRow
            },

            '#tbAdd': {
                click: this.onAddRow
            },

            'grid': {
                canceledit: this.onCancelEdit
            }
        });

        loginController.on('ready', function() {
            noteManagerController.view = noteManagerController.getView('NoteManager').create();
            noteManagerController.getNoteManagerGrid().show();
        }, {single: true});

    },

    onAddRow: function() {
        var rowEditor = this.getGrid().findPlugin('rowediting');
        rowEditor.cancelEdit();
        rowEditor.startEdit(0, 0);
    },

    onRemoveRow: function() {
        Ext.each(this.getGrid().getSelection(), function(row) {
            row.drop();
        });
    },

    onCancelEdit: function(editor, context) {
        if (context.record.phantom)
            context.record.drop();
    }
});