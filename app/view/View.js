Ext.define('teste15.view.View',{
    extend: 'Ext.List',
    alias:'widget.contactlist',
    fullscreen: true,
    id: 'contactlist',
    
    config:{
        disableSelection:true,
        store:'Contacts',
        itemTpl:'{first_name} {last_name}',
        items:[{
            xtype:'toolbar',
            docked:'top',
            title:'Contact List'
        },{
            xtype:'toolbar',                                       //  bottom toolbar
            docked:'bottom',
            items:[{
                xtype: 'searchfield',                          //  here is the searchfield
                itemId:'contact_search',
                id:'contact_search',                         //   we will be using this id in the controller
                placeHolder: 'Search Contacts'
            }]
        }]
    }
});
   