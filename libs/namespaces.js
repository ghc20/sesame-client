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
		        that.json = that._getJsonData(response.responseXML);
		        that.store = that._getStore(that.json);
		    }
		});

	},
	_getJsonData: function(xml){
		var dq = Ext.DomQuery;
		
		var nResults = dq.select('result', xml).length;
		var json = new Sesame.List({root: 'results', nRecords: nResults});
		
		add2Json = function(name, rText){
			for(i = 0; i < nResults; i ++){
				json.results[i][name] = rText[i].textContent;
			}
		}
		
		add2Json('prefix', dq.select('binding[name="prefix"] > literal', xml));
		add2Json('namespace', dq.select('binding[name="namespace"] > literal', xml));
		
		return json;		
	},
	_getStore: function(json){
		var that = this;
		
		Ext.define('Namespaces', {
		    extend: 'Ext.data.Model',
		    fields: ['prefix', 'namespace']
		});

		var store = Ext.create('Ext.data.Store', {
		    model: 'Namespaces',
		    data: that.json,
		    proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: 'results'
		        }
		    }
		});
		return store;		
	}
	
});