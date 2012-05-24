/* This object is to get the namespaces information
 * 
 * Arguments:
 * repositoryUrl -- the url to request the namespaces xml document
 * 
 * Public properties:
 * json (JSON) -- The repository list object
 * store (Ext.data.Store) -- The repository list object
 * 
 * Public methods:
 * getNamespacesQueryString -- Return the string
 * 
 * */

Ext.define('Sesame.Repository.Namespaces', {
	constructor: function(repositoryUrl){
		if(repositoryUrl){
			this._queryUrl = repositoryUrl + '/namespaces';
			this._setDataStore(this._queryUrl);			
		}
	},
	_setDataStore: function(url){
		var that = this;
		
		Ext.Ajax.request({
		    url: url,
		    method: "GET",
		    headers: {"Accept": "application/sparql-results+xml, */*;q=0.5"},
		    success: function(response){
		    	var parser = new Sesame.XMLParser(response.responseXML);
		        that.json = parser.json;
		        that.store = parser.getDataStore();
		    }
		});

	},

	getNamespacesQueryString: function(){
		var obj = this.json || {};
		var rNamespaces = [];
		for(i = 0; i < obj.results.length; i ++){
			rNamespaces.push('PREFIX ' + obj.results[i].prefix + ':<' + obj.results[i].namespace + '>');
		}
		
		return rNamespaces.join(' ');
	}
	
});