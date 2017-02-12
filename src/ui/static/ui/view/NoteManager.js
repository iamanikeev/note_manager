Ext.define('MyApp.view.NoteManager', {
    extend: 'Ext.grid.Panel',
    itemId: 'noteManagerGrid',
    title: 'Note manager',

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
        {text: 'delete', itemId: 'tbDelete'},
        {text: 'add', itemId: 'tbAdd'}
    ],

    // select complete rows
    selType: 'rowmodel',

    plugins: [
        // enable row editor
        Ext.create('Ext.grid.plugin.RowEditing', {
            itemId: 'rowEditor',

            // on double-click
            clicksToEdit: 2
        }),
        'gridfilters'
    ],

    // configure columns
    columns: [
        {
            text: 'ID',
            dataIndex: 'uuid',
            flex: 1,
            filter: 'string',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            filter: {
                type: 'string'
            }
        }, {
            text: 'Created',
            dataIndex: 'created_datetime',
            xtype: 'datecolumn',
            format:'l, d. F Y',
            width: 200,
            editor: {
                xtype: 'datefield',
                format: 'd.m.Y',
                allowBlank: false
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
        }, {
            text: 'Owner',
            dataIndex: 'owner',
            flex: 1,
            filter: 'string',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            filter: {
                type: 'string'
            },
        }
    ]
});