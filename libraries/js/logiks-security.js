module.exports = {
	checkLogin: function(autoLoginPage) {
		token=localStorage.getItem("token");
	    if(token==null) {
	        if(autoLoginPage===true) {
	            // $("#footer,#sidebar").hide();
	            appUI.navigatePage("#login");
	        }
	        return false;
	    } else {
	        return true;
	    }
	},
	checkToken: function() {
		token=localStorage.getItem("token");
		if(token==null) {
			appUI.navigatePage("#login");
		} else {
			appUtils._serviceGET("user/token",function(data) {
				if(data=="FOUND") {

				} else {
					localStorage.removeItem("token");
					localStorage.removeItem("userprofile");
					appUI.navigatePage("#login");
				}
			},function(data) {
				localStorage.removeItem("token");
				localStorage.removeItem("userprofile");
				appUI.navigatePage("#login");
			});
		}
	},
	doRegister: function(q, callSuccess, callError) {
		q.push("type=photographer");
		$.post(APPCONFIG.URLS.APIREGISTER,q.join("&"))
			.success(function(data) {
				if(typeof callSuccess=="function") callSuccess(data);
			})
			.error(function(err) {
				if(typeof callError=="function") callError(err.responseText);
			});
	},
	doLogin: function(userid, password, callSuccess, callError) {
		q=["email="+userid,"pwd="+(password)];//hashMD5

		$.post(APPCONFIG.URLS.APILOGIN,q.join("&"))
			.success(function(data) {
				localStorage.setItem("token",data.token);
				// console.log(data);
				if(typeof callSuccess=="function") callSuccess(data);
			})
			.error(function(err) {
				// console.log(err);
				if(typeof callError=="function") callError(err.responseText);
			});
	},
	doLogout: function(callSuccess,callError) {
		appUtils._serviceGET("logout", function(data) {
				localStorage.removeItem("token");
				localStorage.removeItem("userprofile");
				if(typeof callSuccess=="function") callSuccess(data);
			}, function(err) {
				if(typeof callError=="function") callError(err.responseText);
			});
	},
	checkAccess: function(page) {
		//console.log(page);
		if(APPCONFIG.POLICIES.NOLOGIN_PAGES==null) APPCONFIG.POLICIES.NOLOGIN_PAGES=[];
		if(APPCONFIG.POLICIES.NOLOGIN_PAGES.indexOf(page)>=0) return true;

		if(APPCONFIG.POLICIES.DEFAULT_STATE==null) APPCONFIG.POLICIES.DEFAULT_STATE="open";
		if(APPCONFIG.POLICIES.SECURE_PAGES==null) APPCONFIG.POLICIES.SECURE_PAGES=[];

		switch(APPCONFIG.POLICIES.DEFAULT_STATE.toUpperCase()) {
			case "CLOSED":
				if(APPCONFIG.POLICIES.SECURE_PAGES.indexOf(page)>=0) {
					if(this.checkLogin()) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			break;
			case "OPEN":
			default:
				if(APPCONFIG.POLICIES.SECURE_PAGES.indexOf(page)>=0) {
					if(this.checkLogin()) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			break;
		}
	},
	userInfo: function() {
		try {
			userInfo=JSON.parse(localStorage.getItem("userprofile"));
			return userInfo;
		} catch(e) {
			return {};
		}
	}
};