Ext.application({
     name: 'teste15',

     controllers: ['Main'],
     stores: ['Contacts'],
     models: ['Contacts'],
     views: ['View'],

      launch: function() {

         Ext.Viewport.add({
             xtype: 'contactlist'
         });
     }
});
