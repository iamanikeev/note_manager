Ext.define('MyApp.controller.NoteManager', {
    extend: 'Ext.app.Controller',
    views: ['NoteManager', 'NoteCreation'],
    stores:['NoteManager'],
    alias: 'controller.notemanager',

    refs: [
        { 'ref': 'grid', selector: 'grid' },
    ],

    init: function() {
        const me = this;
        const navigationController = MyApp.getApplication().getController('Navigation');

        this.control({
            '#noteDelete': {
                click: this.onRemoveRow
            },

            '#noteAdd': {
                click: function() {
                    console.log('create');
                    Ext.ComponentQuery.query('#contentPanel')[0]
                        .add(me.getView('NoteCreation').create().show());
                }
            },
        });
        this.on('new_record', function() {
            // todo: this even is not being caught
            console.log('refreshing records');
            this.getGrid().getStore().getNewRecords();
        });
        navigationController.on('ready', () => {
            // Create grid as soon as navigation container is ready
            Ext.ComponentQuery.query('#contentPanel')[0]
                .add(me.getView('NoteManager').create().show());
        }, {single: true});
    },

    onRemoveRow: function() {
        Ext.each(this.getGrid().getSelection(), function(row) {
            row.drop();
        });
    },
});