Ext.define('MyApp.view.NoteCreation', {
    extend: 'Ext.form.Panel',
    controller: 'notecreation',
    store: 'MyApp.store.NoteManager',

    requires: [
        'Ext.data.ArrayStore',
        'MyApp.controller.NoteCreation',
        'MyApp.store.NoteManager',
    ],

    defaults: {
        xtype: 'textfield',
        anchor: '100%'
    },
    bodyPadding: 10,
    modelValidation: true,
    items: [
        {
            fieldLabel: 'Title',
            maxLength: 100,
            name: 'title',
            allowBlank: false,
            reference: 'title',
            dataIndex: 'title',
        },
        {
            fieldLabel: 'Category',
            xtype: 'combo',
            name: 'category',
            allowBlank: false,
            store: new Ext.data.SimpleStore({
                data: [
                    ['N', 'Note'],
                    ['TD', 'TO DO'],
                    ['R', 'Reminder'],
                    ['L', 'Link']
                ],
                fields: ['value', 'text']
            }),
            emptyText: 'Select category...',
            displayField: 'text',
            valueField: 'value',
            hiddenName: 'category',
            triggerAction: 'all',
            editable: false,
            mode: 'local',
            reference: 'category',
            dataIndex: 'category',

        },
        {
            fieldLabel: 'Chosen',
            xtype: 'checkbox',
            name: 'chosen',
            reference: 'chosen',
            dataIndex: 'chosen',
        },
        {
            fieldLabel: 'Text',
            xtype: 'htmleditor',
            maxLength: 300,
            enforceMaxLength: true,
            name: 'text',
            width: 550,
            height: 200,
            reference: 'text',
            dataIndex: 'text',
        },
    ],
    buttons: [
        {
            text: 'Submit',
            itemId: 'createSubmit',
            handler: 'onSubmit'
        },
        {
            text: 'Cancel',
            itemId: 'createCancel',
            handler: 'onCancel'
        }
    ]
});