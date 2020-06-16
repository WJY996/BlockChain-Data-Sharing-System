
        function showData() {
            getDataDetail(data)
            .then(function(datad) {
                getUser(getUrlParas().user)
                .then(function(userd) {
                    getOwner()
                    .then(function(ownerId) {
                        getUser(ownerId)
                        .then(function(owner) {
                            console.log(owner);

                            $("#name").text("数据名称：" + getDataName(datad.dataName));
                            $("#owner").text("数据拥有者：" + owner.userName);
                            $("#description").text("数据描述：" + datad.dataDescription);
                            $("#credit").text("所需积分：" + datad.dataCredit);
                            $("#dlt").text("下载次数：" + datad.downloadTimes);

                            $("#newDescription").val(datad.dataDescription);
                            $("#newCredit").val(datad.dataCredit);
                            $("#next").empty();
                            var j = 0;
                            if(ownerId == userd.userId) {
                                j = 1;
                                $("#next").append(`<div>
                                        <div class="lr">
                                            <button id="dbutton">下载</button>
                                        </div>
                                        <div class="lr">
                                            <button id="abutton">修改</button>
                                        </div>
                                    </div>`);
                                $("#dbutton").click(function() {
                                    window.open(dataURL);
                                });
                                $("#abutton").click(function() {
                                    alterD();
                                });
                            }
                            else{
                                getAccessible(user)
                                .then(function(acc) {
                                    var accessibleData = [];
                                    accessibleData = acc;
                                    console.log(accessibleData);
                                    for (var i = accessibleData.length - 1; i >= 0; i--) {
                                        if(accessibleData[i] == getUrlParas().data)
                                        {
                                            j = 1;
                                            $("#next").empty();
                                            $("#next").append(`<div>
                                                    <button id="dbutton">下载</button>
                                                </div>`);
                                            $("#dbutton").click(function() {
                                                window.open(dataURL);
                                            });
                                            break;
                                        }
                                    }
                                });
                                
                            }
                            
                            
                            if(j == 0)
                            {
                                $("#next").append(`<button id="dbutton">请求访问</button>`);
                                $("#dbutton").click(function() {
                                    $("#cover2").show();
                                });
                            }
                        });
                        
                    });
                });
            });
        }

        function normalRequest() {
            listCheck()
            .then(function(res1) {
                let r1 = res1;
                if (!r1) {
                    creditCheck()
                    .then(function(res2) {
                        let r2 = res2;
                            console.log(r2);
                        if(r2) {
                            console.log(80);
                            controlContract.methods.shareRequest(getUrlParas().user, getUrlParas().data)
                            .send({from: userAccount, gas:1000000})
                            .on("receipt", function (receipt) {
                                console.log(receipt);
                            })
                            .on("error", function (error) {
                                console.log(error);
                            });
                        }
                        else alert("积分不足！");
                    });
                }
                else alert("已被禁止访问！");
                
            })


            controlContract.events.RequestApproved(function(error, result) {
                if (!error)
                {
                    console.log(result);
                    alert("常规访问成功！");
                    window.open(dataURL);
                    hidder2();
                    window.location.href = document.location;
                } 
            else console.log(error);
            });
        }

        function freeCall() {
            $("#popup2").height(500);
            $("#txt").show();
        }

        function freeRequest() {
            listCheck()
            .then(function(res) {
                let r = res;
                    console.log(r);
                if(!r) {
                    console.log(80);
                    controlContract.methods.freeRequest(getUrlParas().user, getUrlParas().data, $("#reason").val())
                    .send({from: userAccount, gas:1000000})
                    .on("receipt", function (receipt) {
                        console.log(receipt);
                    })
                    .on("error", function (error) {
                        console.log(error);
                    });
                }
                else alert("已被禁止访问！");
            });
            

            controlContract.events.FreeRequest(function(error, result) {
                if (!error)
                {
                    console.log(result);
                    alert("免费访问申请成功在链上发布！");
                    hidder2();
                } 
            else console.log(error);
            });
        }

        function alterD() {
            $("#cover1").show();
        }