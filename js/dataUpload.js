

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
                            no[n] = result;
                            if(k == (arr.length - 1)) {
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

	        controlContract.events.NewData(function(error,event) {
	            if(!error)
	            {
	                console.log(event); // same results as the optional callback above
	                alert("成功在链上发布！");
	            }
	            else console.log(error);
	        });
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
                            let n = i;
                    controlContract.methods.fnameToid(arr[i])
                    .call({from: userAccount}, function(error, result) {
                        if(error)
		                {
		                    console.log(error);
		                }
                    })
                    .then(function(result) {
                            no[n] = result;
                            if(k == (arr.length - 1)) {
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
        
	        controlContract.events.AlterData(function(error, result) {
	            if (!error)
	            {
	                console.log(result);
	                alert("修改成功在链上发布！");
	                hidder1();
	                window.location.href = document.location;
	            } 
	            else console.log(error);
	        });
        }

        function uploadFailed(evt) {
            alert("上传失败");
        }

        function uploadCanceled(evt) {
            alert("上传取消");
        }

