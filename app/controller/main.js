Ext.define('teste15.controller.Main', {

    extend: 'Ext.app.Controller',
    init: function() {
        
        var db = openDatabase("teste", "1.0", "banco", 200000);
        db.transaction(function (tx) {tx.executeSql('CREATE TABLE IF NOT EXISTS contatos (first_name, last_name)');
               
               
        db.transaction(function (tx) {
            tx.executeSql('SELECT first_name,last_name FROM contatos', [], function (tx, results) {
                var len = results.rows.length, i;
                var storeC = Ext.getStore('Contacts');
                storeC.removeAll();
                storeC.sync();
                for (i = 0; i < len; i++) {
                    Ext.getStore('Contacts').add({
                        first_name  : results.rows.item(i).first_name,
                        last_name  : results.rows.item(i).last_name
                    });
                    console.log(results.rows.item(i).last_name);
                }
                console.log(storeC);
            });
        }); 
               
               
               
//        tx.executeSql('INSERT INTO contatos (first_name, last_name) VALUES ("sergio", "reis")');
//        
//        tx.executeSql('INSERT INTO contatos (first_name, last_name) VALUES ("carlos", "guimaraes")');
//        
//        tx.executeSql('INSERT INTO contatos (first_name, last_name)VALUES ("maria", "silva")');
//        tx.executeSql('INSERT INTO contatos (first_name, last_name) VALUES ("joao", "souza")');
        });

        this.control({

            '#contact_search':{  //  the id or itemId we gave our searchfield
                scope: this,
                clearicontap: this.onSearchClearIconTap,
                keyup: this.onSearchKeyUp
            }

        });
    },
    
    onSearchKeyUp: function(field) {

	  

        var _storeSQL = Ext.getStore('ContactsSQL');
        var _storeContatos = Ext.getStore('Contacts');
        
        console.log(_storeContatos);
        console.log(_storeSQL);

        var value = field.getValue(),
        store = Ext.getCmp('contactlist').getStore();    //  getting the store that drives the contact list
        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
            regexps = [],
            i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
console.log(record);
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],  
                    didMatch = record.get('first_name').match(search) ||
                                        record.get('last_name').match(search);  
                    //if it matched the first or last name, push it into the matches array 
                    matched.push(didMatch);
                }  //if nothing was found, return false (dont so in the store)               

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                             //else true true (show in the store)
                             return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getCmp('contactlist').getStore().clearFilter();
    }

});


