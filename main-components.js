function ComboRespositoryList(){
	var returnObj = Ext.create('Sesame.RepositoryList.Combobox', {
		id: 'RESPOSITORY_COMBO',
	    fieldLabel: 'Select your repository',
	    queryMode: 'local',
	    displayField: 'id',
	    valueField: 'title',
	    width: 400,
	    labelWidth: 150,
	    repositoryUrl: "http://localhost:8080/openrdf-sesame/repositories"	    
	});
	
	return returnObj;
}

function CmpTips(comboBox){
	var returnObj = Ext.create('Ext.form.field.Text', {
		id: 'COMBO_TIPS',
		readOnly: true,
		labelWidth: 150,
	    width: 400,
	    fieldLabel: 'Title',
	    style: {
	    	'color': 'white'
	    },
	    fieldStyle: {
	    	'border': '0px',
	    	'background': 'none',
	    	'font-style': 'italic'
	    }
	});
	
	comboBox.addListener('select', function(combo, records, eOpts){
		Ext.getCmp('COMBO_TIPS').setValue(records[0].data.title)
	})
	
	return returnObj;
}