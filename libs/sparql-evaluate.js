Ext.define('Sesame.Sparql.Evaluate', {
	constructor: function(repositoryUrl){
		if(repositoryUrl){
			this.requestUrl = repositoryUrl;
		}
	},
	getQueryResults: function(tripleObj){ ///including 's','p' and 'o' properties
		this._postData = 'queryLn=SPARQL&query=' + this._getEvaluateString(tripleObj);
		
		Ext.Ajax.request({
		    url: this.requestUrl,
		    method: "POST",
		    headers: {
		    	'Accept': 'application/sparql-results+xml, */*;q=0.5',
		    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    },
		    xmlData: this._postData,
		    success: function(response){
		    	var parser = new Sesame.XMLParser(response.responseXML);
		        that.json = parser.json;
		        that.store = parser.getDataStore();
		    }
		});		
	},
	_getEvaluateString: function(tripleObj){
		var select = 'SELECT ';
		var where = 'WHERE {';
		
		if(tripleObj.hasOwnProperty('s')){
			where += tripleObj.s + ' ';
		}else{
			select += '?s ';
			where += '?s ';
		}
		
		if(tripleObj.hasOwnProperty('p')){
			where += tripleObj.p + ' ';
		}else{
			select += '?p ';
			where += '?p ';
		}

		if(tripleObj.hasOwnProperty('o')){
			where += tripleObj.o + ' ';
		}else{
			select += '?o ';
			where += '?o ';
		}
		
		where += '.} ';
		
		return ' ' + select + where;
	}
});