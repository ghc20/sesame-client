function init(){
		
}

var viewport;
Ext.onReady(function(){
	Ext.QuickTips.init();

/* Load the components defined in main-components.js
 * */	
	var _comboRespositoryList = ComboRespositoryList();
	var _comboTips = CmpTips(_comboRespositoryList);
	
/* Design the layout of all components
 * */	
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

