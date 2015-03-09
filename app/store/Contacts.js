Ext.define('teste15.store.Contacts', {
    extend: 'Ext.data.Store',
    config: {
        model: 'teste15.model.Contacts',
        autoLoad: true,
        sorters: 'last_name',
        grouper: function (record) {
            return record.get('last_name')[0];
        },
        proxy: {
            type: 'ajax',
            url: 'app/contacts.json', //  the json file that holds all our contact info.
            reader: {
                type: 'json',
                rootProperty: 'contacts'
            }
        }
    }
});