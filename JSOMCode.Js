$(document).ready(function(){
    alert("Start1 Running");
    SP.SOD.executeFunc('sp.js','SP.ClientContext',getItems);
	//getItems();
    //SP.SOD.executeFunc('sp.js','SP.ClientContext',insertItem);
    //insertItem();
    $("#btnSubmit").click(function(){
        SP.SOD.executeFunc('sp.js','SP.ClientContext',insertItem);
    });
})

function insertItem()
{ 
    var context=new SP.ClientContext();
    //var context=SP.ClientContext.get_current();
    var IndusList=context.get_web().get_lists().getByTitle('JSOM_list');

    var listItemCreationInformation=new SP.ListItemCreationInformation();
    var listItem=IndusList.addItem(listItemCreationInformation);    

    var JSID=$("#txtJSID").val();
    var JSName=$("#txtJSName").val();
    var JSBrand=$("#txtJSBrand").val();
    var JSLocation=$("#txtJSLocation").val();

    listItem.set_item('Title',JSID);
    listItem.set_item('Indus_Name',JSName);
    listItem.set_item('Indus_Brand',JSBrand);
    listItem.set_item('Indus_Location',JSLocation);
    listItem.update();
    context.load(listItem);
    context.executeQueryAsync(onAddSuccess,onAddFialed);
    
}
function onAddSuccess()
{
    alert("Item Inserted");
    SP.SOD.executeFunc('sp.js','SP.ClientContext',getItems);
}
function onAddFialed()
{
alert("Insert failed");
}


function getItems()
{
   var context=new SP.ClientContext();
   var list=context.get_web().get_lists().getByTitle('JSOM_List');
   var caml=new SP.CamlQuery();
   caml.set_viewXml("<View></View>");
   returnedItems=list.getItems(caml);
   context.load(returnedItems);
   context.executeQueryAsync(onSuccess,onFailed);

}

function onSuccess()
{
  alert("Successfully viewed item");
  var IndusHTML="<table border='1'>";
  IndusHTML=IndusHTML+"<tr style='background-color:#ffd700'><td>Industries ID</td><td>Industries Name</td><td>Industries Brand</td><td>Industries Location</td></tr>";
  var enumerator=returnedItems.getEnumerator();
  while(enumerator.moveNext())
  {
    var listItem=enumerator.get_current();
    var JsomName=listItem.get_item("Indus_Name");
    var JsomBrand=listItem.get_item("Indus_Brand");
    var JsomID=listItem.get_item('Title');
    var JsomLocation=listItem.get_item('Indus_Location');
    
    IndusHTML=IndusHTML+"<tr style='background-color:#7fffd4'><td>"+JsomID+"</td><td>"+JsomName+"</td><td>"+JsomBrand+"</td><td>"+JsomLocation+"</td></tr>";

    console.log(JsomBrand);
    /*console.log(JsomName);
    console.log(JsomBrand);
    console.log(JsomID);
    console.log(JsomLocation);*/
  }
  IndusHTML=IndusHTML+"</table>";
  $("#Indus").html(IndusHTML);
}
function onFailed()
{
  alert("Failed");
}

/*function getItems()
	{
	var context=new SP.ClientContext();
	var list=context.get_web().get_lists().getByTitle('JSOM_List');
	var caml=new SP.CamlQuery();
	caml.set_viewXml("<view></view>");
	returneditems=list.getItems(caml);
	context.load=(returneditems);
	context.executeQueryAsync(OnSuccess,OnFailure);
	}
	
	function OnSuccess()
	{
	alert("Success");
	var enumerator=returneditems.getEnumerator();
	while(enumerator.moveNext())
	{
	var listItem=enumerator.get_current();
	var JsomID=listItem.get_item('Title');
	var JsomName=listItem.get_item("Indus_Name");
	var JsomBrand=listItem.get_item("Indus_Brand");
	var JsomLocation=listItem.get_item("Indus_Location");
	console.log(JsomID);
	
    }
	}
	function OnFailure()
	{
	alert("Failed");
	}*/

