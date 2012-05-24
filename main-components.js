/* Define the all the components in the view port
 * All the functions return component objects which can be placed in the view port directly 
 * */


/* Create a combo box listing all the repositories
 * */
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

/* Create a text field to display the description for the combobox
 * Arguments:
 * comboBox -- the combo box component with the description 
 * */
function CmpTips(comboBox){
	var returnObj = Ext.create('Ext.form.field.Text', {
		id: 'COMBO_TIPS',
		readOnly: true,
		labelWidth: 150,
	    width: 400,
	    fieldLabel: 'Description',
	    fieldStyle: {
	    	'border': '0px',
	    	'background': 'none'
	    }
	});
	
	comboBox.addListener('select', function(combo, records, eOpts){
		Ext.getCmp('COMBO_TIPS').setValue(records[0].data.title)
	})
	
	return returnObj;
}