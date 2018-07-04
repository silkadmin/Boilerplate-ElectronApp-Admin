function getTextAvatar(name, params) {
	if(name==null) name="#";
	if(name.length>1) name=name.substr(0,1);
	name=name.toUpperCase();
	params=$.extend({
		"background":"#c7c7c7",
		"color":"#333",
		"width":"35px",
	    "height":"35px",
	    "padding":"0px",
	    "display":"inline-block",
	    "font-size":"27px",
	    "font-weight":"bold",
	    "font-family":"monospace",
	    "text-align":"center",
	    "border-radius":"20px",
	},params);

	css=[];
	$.each(params,function(k,v) {css.push(k+":"+v);});
	css=css.join(";");

	return '<span class="textAvatar" style="'+css+'">'+name+'</span>';
}

function getTextAvatar2(name, params) {
	if(name==null) name="#";
	if(name.length>2) name=name.substr(0,2);
	params=$.extend({
		"background":"#c7c7c7",
		"color":"#333",
		"width":"35px",
	    "height":"35px",
	    "padding":"4px",
	    "display":"inline-block",
	    "font-size":"20px",
	    "font-weight":"bold",
	    "font-family":"monospace",
	    "text-align":"center",
	    "border-radius":"20px",
	},params);

	css=[];
	$.each(params,function(k,v) {css.push(k+":"+v);});
	css=css.join(";");css.join(";")

	return '<span class="textAvatar" style="'+css+'">'+name+'</span>';
}
