module.exports = {
	getProfileInfo: function(callBack,reload){
		appUtils._serviceGET("profile",function(data) {
				localStorage.setItem("userprofile",JSON.stringify(data));
				callBack(data);
			},function(err) {
				callBack(false);
			});
	},
	updateProfileInfo: function(q,callBack,errCallback){
		if(typeof q=="object") q=q.join("&");
		appUtils._servicePOST("profile",q,function(data) {
				callBack(data);
			},function(err) {
				errCallback(false);
			});
	},
	getDatalist(src, callBack) {
		appUtils._serviceGET("datalist/"+src,function(data) {
				callBack(data);
			},function(err) {
				callBack(false);
			});
	},
	addEquipment: function(q,callBack,errCallback){
		if(typeof q=="object") q=q.join("&");
		appUtils._servicePOST("equipment",q,function(data) {
				callBack(data);
			},function(err) {
				errCallback(false);
			});
	},
	updateEquipment: function(equipID,q,callBack,errCallback){
		if(equipID==null || equipID.length<=0) return false;
		if(typeof q=="object") q=q.join("&");
		appUtils._servicePOST("equipment/"+equipID,q,function(data) {
				callBack(data);
			},function(err) {
				errCallback(false);
			});
	},
	getMyEquipmentList: function(callBack,errCallback){
		appUtils._serviceGET("equipment/my",function(data) {
				callBack(data);
			},function(err) {
				callBack(false);
			});
	},
	populateSelector(src, selector, callBack) {
		$(selector).html("");
		appUtils._serviceGET("datalist/"+src,function(data) {
				$.each(data,function(k,v) {
					if(v.value==null) v.value=v.title;
					html=[];
					html.push("<option value='"+v.value+"'");
					if(v.data!=null && typeof v.data == "object") {
						keys=Object.keys(v.data);
						$.each(keys,function(i1,k1) {
							html.push(" data-"+k1+"='"+v.data[k1]+"'");
						})
					}
					html.push(">");
					html.push(v.title);
					html.push("</option>");
					$(selector).append(html.join(""));
				});
				if(typeof callBack=="fucntion") callBack(data);
			},function(err) {
				if(typeof callBack=="fucntion") callBack(false);
			});
	},
	checkAlerts: function() {
		if(!appSecure.checkLogin()) return;
		dt=appData.getConfig('NOTIFICATION_LAST_CHECK');
		appUtils._servicePOST("alerts/recent","last_check="+dt,function(data) {
				if(data.count>0) {
				   appUI.showNotifications("You have "+data.count+" notifications");
				}
				appData.setConfig('NOTIFICATION_LAST_CHECK',data.timestamp);
			});
	},
	notifyUser: function(userEmail) {
		appUtils._serviceGET("notify/"+userEmail,function(data) {
				console.log(data);
				appUI.showNotifications("User has been notified successfully.");
			},function(err) {
				appUI.showNotifications("Error notifing user.");
				console.log(err);
			});
	},
	testAPI: function(apiCMD) {
		appUtils._serviceGET(apiCMD,function(data) {
				console.log(data);
			},function(err) {
				console.log(err);
			});
	}
};