Ext.define('MyApp.view.NoteManager', {
    extend: 'Ext.grid.Panel',
    itemId: 'noteManagerGrid',
    reference: 'noteManagerGrid',

    // store the grid is bound to
    store: 'NoteManager',
    autoLoad: true,

    // paging bar
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'NoteManager',
        displayInfo: true
    }],

    // top toolbar
    tbar: [
        {text: 'Delete', itemId: 'noteDelete'},
        {text: 'Add note', itemId: 'noteAdd'}
    ],

    selModel: 'rowmodel',

    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    // configure columns
    columns: [
        {
            text: 'Created',
            dataIndex: 'created_datetime',
            xtype: 'datecolumn',
            format: 'l, d. F Y',
            width: 200,
            editor: {
                xtype: 'datefield',
                format: 'd.m.Y',
                allowBlank: true
            }
        }, {
            text: 'Title',
            dataIndex: 'title',
            flex: 1,
            filter: 'string',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            filter: {
                type: 'string'
            },
        }, {
            text: 'Text',
            dataIndex: 'text',
            flex: 1,
            filter: 'string',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            filter: {
                type: 'string'
            },
        }, {
            text: 'Category',
            dataIndex: 'category',
            flex: 1,
            filter: 'string',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            filter: {
                type: 'string'
            },
        }, {
            text: 'Chosen',
            dataIndex: 'chosen',
            flex: 1,
            filter: 'boolean',
            editor: {
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
            },
        }
    ]
});