function init(){
	//test_repository_list();
	//test_repository_statements();
	//test_context_list();
	//test_graphstore_support();	
}

var viewport;
Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var _comboRespositoryList = ComboRespositoryList();
	var _comboTips = CmpTips(_comboRespositoryList);
	
	
	viewport = Ext.create('Ext.Viewport', {
		id: 'VIEWPORT',
        layout: {
            type: 'border',
            padding: '10px'
            
        },
        defaults: {
            split: true
        },
	    items: [{
	    	id: 'RESULT_PANEL',
	        region:'center',
	        xtype: 'tabpanel',
	        items: [{
				id: 'DETAILS_TAB',
				title: 'Details'
			},{
				id: 'GRAPH_TAB',
				title: 'Graph'
			}]
	    },{
	    	id: 'SEARCH_PANEL',
	        region: 'west',
	        xtype: 'panel',
	        width: 600,
	        layout: {
	        	type: 'border'
	        },
	        items: [{
	        	id: 'RESULTS_LIST',
	        	title: 'Results',
	        	region: 'center'
	        },{
	        	id: 'VOCAB_SEARCH',
	        	region: 'north',
	        	height: 400,
	        	xtype: 'panel',
		        bodyPadding: 20,
	        	items: [_comboRespositoryList,
	        	        _comboTips]
	        }]
	    }
	    ]
	});
	
	
})


/* Create a json object
 * Options:
 * root -- the root name in this json object
 * record -- the record name
 * nRecords -- the number of records
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