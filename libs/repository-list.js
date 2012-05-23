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
		
		Ext.Ajax.request({
		    url: url,
		    method: "GET",
		    headers: {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"},
		    success: function(response){
		        that.json = that._setJsonData(response.responseXML);
		        that.store = that._setStore(that.json);
		    }
		});		
	},
	_setJsonData: function(xml){
		var dq = Ext.DomQuery;
		
		var nResults = dq.select('result', xml).length;
		var json = new Sesame.List({root: 'results', nRecords: nResults});
		
		add2Json = function(name, rText){
			for(i = 0; i < nResults; i ++){
				json.results[i][name] = rText[i].textContent;
			}
		}
		
		add2Json('id', dq.select('binding[name="id"] > literal', xml));
		add2Json('title', dq.select('binding[name="title"] > literal', xml));
		add2Json('uri', dq.select('binding[name="uri"] > uri', xml));
		
		return json;
	},
	_setStore: function(json){
		var that = this;
		
		Ext.define('RepositoryList', {
		    extend: 'Ext.data.Model',
		    fields: ['id', 'title', 'uri']
		});

		var store = Ext.create('Ext.data.Store', {
		    model: 'RepositoryList',
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


