

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

        function getLength() {
            return controlContract.methods.getUserLength().call({from: defaultAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }
        
        function userDetail() {
            let url = "userDetail.html?user=" + user;
            window.location.href = url;
        }

        function upload() {
        	console.log(user);
            let url = "fileupload1.html?user=" + user;
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
                    console.log(result);
                    r = result;
                    userAccount = r.userAddress;
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

        function getAccessible(id) {
            return controlContract.methods.getAccessible(id)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
            });
        }

        function getNot(id) {
            return controlContract.methods.getNotAllowed(id)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                }
                else console.log(error);
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
                        if(!error)
                        {
                            console.log(result);
                        }
                        else console.log(error);
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
        	console.log(user);
        	console.log(data);
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

        function fileSelected() {
            file = document.getElementById('fileToUpload').files[0];
            if (file) {
                var fileSize = 0;
                if (file.size > 1024 * 1024)
                    fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                else
                    fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                $("#fileName").text('共享数据名称: ' + getDataName(file.name));
                $("#fileSize").text('共享数据大小: ' + fileSize);
                $("#fileType").text('共享数据类型: ' + getDataType(file.type));
                fileURL = "http://47.240.169.239:8100/blockchain/download.do?filename=" + file.name;
            }
        }

        function uploadFile1() {
        	controlContract.methods.isExitDataName(document.getElementById('fileToUpload').files[0].name, 0)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                    if(!result) {
			            var fd = new FormData();
			            fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
			            var xhr = new XMLHttpRequest();
			            xhr.upload.addEventListener("progress", uploadProgress, false);
			            xhr.addEventListener("load", uploadComplete1, false);
			            xhr.addEventListener("error", uploadFailed, false);
			            xhr.addEventListener("abort", uploadCanceled, false);
			            xhr.open("POST", "http://47.240.169.239:8100/blockchain/upload.do"); //修改成自己的接口
			            xhr.send(fd);
                    }
                    else alert("共享数据名不得重复！");
                }
                else console.log(error);
            });
        }

        function uploadFile2() {
        	controlContract.methods.isExitDataName(document.getElementById('fileToUpload').files[0].name, data)
            .call({from: userAccount}, function(error, result) {
                if(!error)
                {
                    console.log(result);
                    if(!result) {
			            var fd = new FormData();
			            fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
			            var xhr = new XMLHttpRequest();
			            xhr.upload.addEventListener("progress", uploadProgress, false);
			            xhr.addEventListener("load", uploadComplete2, false);
			            xhr.addEventListener("error", uploadFailed, false);
			            xhr.addEventListener("abort", uploadCanceled, false);
			            xhr.open("POST", "http://47.240.169.239:8100/blockchain/upload.do"); //修改成自己的接口
			            xhr.send(fd);
                    }
                    else alert("共享数据名不得重复！");
                }
                else console.log(error);
            });
        }

        function uploadProgress(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
            } else {
                document.getElementById('progressNumber').innerHTML = 'unable to compute';
            }
        }

        function uploadComplete1(evt) {
            //alert(evt.target.responseText);
            var list = $("#not").val();
            var no = [];
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
                        if(!error)
                        {
                            console.log(result);
                        }
                        else console.log(error);
                    })
                    .then(function(result) {
                            console.log(n);
                            no[n] = result;
                            console.log(no);
                            if(k == (arr.length - 1)) {
                				console.log(no);
					            controlContract.methods.createData(user, Number($("#credit").val()), no, file.name, $("#description").val(), fileURL)
					            .send({from: userAccount, gas:1000000})
					            .on("receipt", function (receipt) {
					                console.log(receipt);
					            })
					            .on("error", function (error) {
					                console.log(error);
					            });
                            }
                            k++;
                    });
                }

            }
            else {
            	controlContract.methods.createData(user, Number($("#credit").val()), no, file.name, $("#description").val(), fileURL)
	            .send({from: userAccount, gas:1000000})
	            .on("receipt", function (receipt) {
	                console.log(receipt);
	            })
	            .on("error", function (error) {
	                console.log(error);
	            });
            }
        }

        function uploadComplete2(evt) {
            //console.log(evt.target.responseText);
            var list = $("#not").val();
            var no = [];
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
                        if(!error)
                        {
                            console.log(result);
                        }
                        else console.log(error);
                    })
                    .then(function(result) {
                            console.log(n);
                            no[n] = result;
                            console.log(no);
                            if(k == (arr.length - 1)) {
                				console.log(no);
					            controlContract.methods.alterData(data, Number($("#newCredit").val()), file.name, $("#newDescription").val(), fileURL, no)
					            .send({from: userAccount, gas:1000000})
					            .on("receipt", function (receipt) {
					                console.log(receipt);
					            })
					            .on("error", function (error) {
					                console.log(error);
					            });
                            }
                            k++;
                    });
                }

            }
            else {
            	controlContract.methods.alterData(data, Number($("#newCredit").val()), file.name, $("#newDescription").val(), fileURL, no)
	            .send({from: userAccount, gas:1000000})
	            .on("receipt", function (receipt) {
	                console.log(receipt);
	            })
	            .on("error", function (error) {
	                console.log(error);
	            });
            }
        }

        function uploadFailed(evt) {
            alert("上传失败");
        }

        function uploadCanceled(evt) {
            alert("上传取消");
        }
