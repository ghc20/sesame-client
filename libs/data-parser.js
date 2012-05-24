/* This object is to parse xml response from Sesame server
 * 
 * Arguments:
 * xml (XML document) -- The xml document from Sesame server response
 * 
 * Public properties:
 * json (JSON) -- The response document in json format
 * 
 * Private properties:
 * _variables (Array) -- The string array for all the fields names
 * 
 * Public methods:
 * getDataStore -- Return Ext.data.Store object
 * 				-- Arguments: 	json (JSON) 
 * 								fields (Array)
 * 
 * */


Ext.define('Sesame.XMLParser',{
	constructor: function(xml){
		this.json = this._getJsonData(xml);
	},
	_getJsonData: function(xml){	
		this._variables = this._getVariables(xml);
		
		var dq = Ext.DomQuery;
		var r = dq.select('result', xml);
		var json = new Sesame.List({root: 'results', nRecords: r.length});
		
		add2Json = function(name, rText){
			for(i = 0; i < r.length; i ++){
				json.results[i][name] = rText[i].firstElementChild.textContent;
			}
		}
		
		for(i = 0; i < r.length; i ++){
			for(j = 0; j < this._variables.length; j ++){
				var pSelect = 'result > binding[name="' + this._variables[j] + '"]';
				add2Json(this._variables[j], dq.select(pSelect, xml));				
			}

		}
		
		return json;
	},
	
	///Get all the variables
	_getVariables: function(xml){
		var dq = Ext.DomQuery;
		
		var variables = [];
		var v = dq.select('head > variable', xml);
		
		for(i = 0; i < v.length; i ++){
				variables.push(v[i].attributes[0].value);
		}
		
		return variables;
	},
	
	getDataStore: function(json, fields){ /// Contains 'json' and 'fields' properties
		
		if(!json){
			json = this.json || {};
		}
		
		if(!fields){
			fields = this._variables || [];
		}

		
		var that = this;
		
		Ext.define('RepositoryList', {
		    extend: 'Ext.data.Model',
		    fields: fields
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
})


/* Create a json object
 * Argument object:
 * options --
 * 	{
 * 		root -- the root name in this json object
 * 		record -- the record name
 * 		nRecords -- the number of records
 * 	}
 * 
 * */

Ext.define('Sesame.List', {
	constructor: function(options){
		this.root = options.root || 'root';
		
		this.object = {};
		this.object[this.root] = [];
		
		for(i = 0; i < options.nRecords; i ++){
			this.object[options.root].push({});
		}
		
		return this.object;
	}
})