Ext.define('MyApp.controller.NoteCreation', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.notecreation',
    views: ['NoteCreation', 'NoteManager'],

    init: function() {
        const me = this;
    },

    onSubmit: function() {
        console.log('submit');
        const title = this.lookupReference('title').value;
        const category = this.lookupReference('category').value;
        const text = this.lookupReference('text').value;
        const chosen = this.lookupReference('chosen').value;
        // I know, this should've been added via store, but I couldn't find a way to access it from here :(
        // Ext docs are kinda messed up, it takes some time to put it all together
        Ext.Ajax.request({
            scope: this,
            url: '/api/notes/',
            method: 'POST',
            jsonData: Ext.util.JSON.encode({
                title: title,
                category: category,
                text: text,
                chosen: chosen
            }),
            success: (res) => {
                const data = res.responseText;
                this.fireEvent('new_record');
                this.unmaskAndHide();
            },
            failure: (res) => {
                const data = res.responseText;
                console.log(data);
            },
        });
    },

    onCancel: function() {
        this.unmaskAndHide();
    },

    unmaskAndHide: function () {
        this.getView().unmask();
        this.getView().hide();
    },
});