
/* This object inherits from Ext.form.ComboBox
 * 
 * Additional arguments:
 * repositoryUrl -- the url to request the repository list xml document
 * 
 * Public properties:
 * json (JSON) -- The repository list object
 * store (Ext.data.Store) -- The repository list object
 * */

Ext.define('Sesame.RepositoryList.Combobox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.comborepoitory',
	initComponent: function(){
		if(this.hasOwnProperty("repositoryUrl")){
			this._setDataStore(this.repositoryUrl);
		}
		
		this.callParent();
	},
	
	_setDataStore: function(url){ 
		var that = this;
		
		Ext.Ajax.request({ /// Request repository list
		    url: url,
		    method: "GET",
		    headers: {"Accept": "application/sparql-results+xml, */*;q=0.5"},
		    success: function(response){
		    	var parser = new Sesame.XMLParser(response.responseXML);
		        that.json = parser.json;
		        that.store = parser.getDataStore(); ///Set data store for this combo box
		    }
		});		
	}

});


