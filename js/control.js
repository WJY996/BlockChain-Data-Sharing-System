

		var web3;
		var controlContract;
		var defaultAccount

		function setWeb3() {
			if (typeof web3 !== 'undefined') {
	            web3 = new Web3(web3.currentProvider);
	        } else {
	            // set the provider you want from Web3.providers
	            web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545"));
        	}
        	controlContract = new web3.eth.Contract(controlABI,'0x7048FA82244472bc65810280d9009eF814152BfF');

		}

		function setAccount()
		{
		    web3.eth.getAccounts().then((accounts) => {
		        defaultAccount = accounts[0];
		    });
		}

        var userAccount;

        var user;

        var data;

        var file;

        var fileURL;

        var dataURL;

        function getUrlPara(){
            var url = document.location.toString();//获取当前URL
            if (url.indexOf("?") != -1) 
            {  //判断URL？后面不为空
                var arrUrl = url.split("?");//分割？
                var para = arrUrl[1];//获取参数部分
                if(para)//判断传入的参数部分不为空
                {
                    var arr = para.split("=");//分割=
                    var res = arr[1];//获取参数的值
                    return res;
                }   
            }        
            return null;
        }

        function getUrlParas() {
            var url = document.location.toString();//获取当前URL
            if (url.indexOf("?") != -1) {  //判断URL？后面不为空
                var arrUrl = url.split("?")[1];//分割？
                var para = arrUrl.split("&");//获取参数部分
                var len = para.length;
                var res = {};
                var arr = [];
                for(var i = 0; i < len; i++){
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
            }
            return res;
        };

        function isEmpty(content) {
            return(content == null || content == "" || content == undefined)
        }

        function getDataName(name) {
            let dataName = name.split(".")[0];//分割.
            return dataName;
        }

        function getDataType(name) {
            let dataName = name.split("/")[0];//分割.
            return dataName;
        }
        
        function userDetail() {
            let url = "userDetail.html?user=" + user;
            window.location.href = url;
        }

        function upload() {
        	console.log(user);
            let url = "fileupload.html?user=" + user;
            window.location.href = url;
        }

        function toMain() {
            let url = "main.html?user=" + user;
            window.location.href = url;
        }

        function hidder() {
            $("#bottom").show();
            $("#cover").hide();
        }

        function hidder1() {
            $("#bottom").show();
            $("#cover1").hide();
        }

        function hidder2() {
            $("#bottom").show();
        	$("#txt").hide();
            $("#cover2").hide();
        }

        function getUser(id) {
            return controlContract.methods.users(id)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    r = result;
                    userAccount = r.userAddress;
                }
                else console.log(error);
            });
        
        }


        function getLength() {
            return controlContract.methods.getUserLength()
            .call({from: defaultAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }

        function getUserId(name) {
            return controlContract.methods.fnameToid(name)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                    return result;
                }
                else console.log(error);
            });
        
        }

        function getOwner() {
            return controlContract.methods.fdataToOwner(getUrlParas().data)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    owner = result;
                }
                else console.log(error);
            });
        }

        function getDataDetail(id) {
            return controlContract.methods.datas(id).call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    dataURL = result.dataAddress;
                }
                else console.log(error);
            });
        }

        function getDataLength() {
            return controlContract.methods.getDataLength().call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }

        function getMsgList(id) {
            return controlContract.methods.getMsgList(id)
            .call({from: userAccount}, function(error, result) {
                if(error)
                {
                    console.log(error);
                }
            });
        }

        function getAccessible(id) {
            return controlContract.methods.getAccessible(id)
            .call({from: userAccount}, function(error, result) {
                if(error)
                {
                    console.log(error);
                }
            });
        }

        function getNot(id) {
            return controlContract.methods.getNotAllowed(id)
            .call({from: userAccount}, function(error, result) {
                if(error)
                {
                    console.log(error);
                }
            });
        }

        function selectNotAllowed() {
            var list = $("#not").val();
            var res = [];
            var arr;
            var k = 0;
            if (list) {
                arr = list.split(",");
                console.log(arr);
                for (var i = arr.length - 1; i >= 0; i--) {
                            console.log(i);
                            let n = i;
                    controlContract.methods.fnameToid(arr[i])
                    .call({from: userAccount}, function(error, result) {
                        if(error)
		                {
		                    console.log(error);
		                }
                    })
                    .then(function(result) {
                            console.log(n);
                            res[n] = result;
                            console.log(res);
                            if(k == (arr.length - 1)) {
                				console.log(res);
                            	return res;
                            }
                            k++;
                    });
                }

            }
                       
        }

        function listCheck() {
        	return controlContract.methods.checkList(data, user)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }

        function creditCheck() {
        	return controlContract.methods.checkCredit(user, data)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }

        
