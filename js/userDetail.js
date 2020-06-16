

        function getUserDetail(id) {
            getUser(id).then(function(userd) {
                $("#name").text("用户名称：" + userd.userName);
                $("#credit").text("用户积分：" + userd.credit);
                $("#description").text("用户描述：" + userd.userDescription);

                $("#newName").val(userd.userName);
                $("#newAddress").val(userd.userAddress);
                $("#pwd").val(userd.pwd);
                $("#newDescription").val(userd.userDescription);
            });
        }

        function displayDatas() {
            getAccessible(user)
            .then(function(result) {
                var datas = [];
                datas = result;
                var k = 0;
                for (var i = 0; i < datas.length; i++) {
                    let id = datas[i];
                    controlContract.methods.fdataToOwner(id).call({from: userAccount}, function(error1, ownerid) {
                        if(!error1)
                        {
                            controlContract.methods.users(ownerid).call({from: userAccount}, function(error2, owner) {
                                if(!error2)
                                {
                                    getDataDetail(id)
                                    .then(function (datad) {
                                        let dataURL = "dataDetail.html?user="+user+"&data="+id;
                                        var yu = (k % 2);
                                        if (yu == 0) {
                                            let dn = getDataName(datad.dataName);
                                            $("#ldatas").append(`<div class="data">
                                              <p>数据名称: ${dn}</p>
                                              <p>数据拥有者: ${owner.userName}</p>
                                              <p>下载次数: ${datad.downloadTimes}</p>
                                              <a href=${dataURL} style="display: inline-block;width: 100%; text-align: center;" target="_blank">详情</a>
                                            </div>`);
                                        }
                                        else {
                                            let dn = getDataName(datad.dataName);
                                            $("#rdatas").append(`<div class="data">
                                              <p>数据名称: ${dn}</p>
                                              <p>数据拥有者: ${owner.userName}</p>
                                              <p>下载次数: ${datad.downloadTimes}</p>
                                              <a href=${dataURL} style="display: inline-block;width: 100%; text-align: center;" target="_blank">详情</a>
                                            </div>`);
                                        }
                                        if(k == (datas.length - 1)) {
                                            if((datas.length % 2) == 1) {
                                                $("#rdatas").append(`<div class="data" style="height: 149px; border-color: transparent;"></div>`);
                                            }
                                        }
                                        k++;
                                    });
                                }
                                else console.log(error2);
                            });
                        }
                        else console.log(error1);
                    });
                   
                }
            });

        }

        function approve(ac, id) {
            controlContract.methods.freeApproved(id).send({from: ac, gas:1000000})
            .on("receipt", function (receipt) {
                console.log(receipt);
            })
            .on("error", function (error) {                 
                console.log(error);
            });

            controlContract.events.FreeApproved(function(error, result) {
                if (!error)
                    {
                        console.log(result);
                        alert("免费访问批准成功！");
                        hidder();
                        window.location.href = url;
                    } 
                else console.log(error);
            });
        }

        function deny(ac, id) {
            controlContract.methods.freeDenied(id).send({from: ac, gas:1000000})
            .on("receipt", function (receipt) {
                console.log(receipt);
            })
            .on("error", function (error) {                 
                console.log(error);
            });

            controlContract.events.FreeDenied(function(error, result) {
                if (!error)
                    {
                        console.log(result);
                        alert("免费访问拒绝成功！");
                        hidder();
                        window.location.href = url;
                    } 
                else console.log(error);
            });
        }   

        function statusOutput(i) {
            var txt = "";
            if (i==0) {
                txt = "处理中";
            }
            else if (i==1) {
                txt = "批准";
            }
            else if (i==2) {
                txt = "拒绝";
            }
            console.log(txt);
            return txt;
        }

        function msgStatus(s1, s2, ba, n1, n2, t, msgId) {
            if(isEmpty(t)) {
                t = "未填写";
            }
            if(s2 == 1) {
                ac = visitorAccount;
                if ((ba % 2) == 0) {
                    n2 = getDataName(n2);
                    $("#lmsgs").append(`<div class="data" style="height: 220px;">
                      <p>申请用户: ${n1}</p>
                      <p>申请数据: ${n2}</p>
                      <p>申请原因: ${t}</p>
                      <div class="lr">
                        <button id="a" onclick="approve(ac, ${msgId})">批准</button>
                      </div>
                      <div class="lr">
                        <button id="d" onclick="deny(ac, ${msgId})">拒绝</button>
                      </div>
                    </div>`);
                }
                else {
                    console.log(msgId);
                    n2 = getDataName(n2);
                    $("#rmsgs").append(`<div class="data" style="height: 220px;">
                      <p>申请用户: ${n1}</p>
                      <p>申请数据: ${n2}</p>
                      <p>申请原因: ${t}</p>
                      <div class="lr">
                        <button id="a" onclick="approve(ac, ${msgId})">批准</button>
                      </div>
                      <div class="lr">
                        <button id="d" onclick="deny(ac, ${msgId})">拒绝</button>
                      </div>
                    </div>`);
                }
            }
            else {
                var st = statusOutput(s1);
                if ((ba % 2) == 0) {
                    n2 = getDataName(n2);
                    $("#lmsgs").append(`<div class="data" style="height: 200px; padding-top: 20px;">
                      <p>数据拥有者: ${n1}</p>
                      <p>申请数据: ${n2}</p>
                      <p>申请原因: ${t}</p>
                      <p>申请状态: ${st}</p>
                    </div>`);
                }
                else {
                    n2 = getDataName(n2);
                    $("#rmsgs").append(`<div class="data" style="height: 200px; padding-top: 20px;">
                      <p>数据拥有者: ${n1}</p>
                      <p>申请数据: ${n2}</p>
                      <p>申请原因: ${t}</p>
                      <p>申请状态: ${st}</p>
                    </div>`);
                }
            }        }
 
        function displayMsgs() {
            getMsgList(user)
            .then(function(result) {
                var msgs = [];
                msgs = result;
                var ba = 0;
                for (var i =  0; i < msgs.length; i++) {
                    let id = msgs[i];
                    
                    controlContract.methods.msgs(id).call({from: userAccount}, function(error1, msg) {
                    if(!error1)
                    {
                        let cid = id;
                        if(msg.resId == user) {
                            if(msg.status == 0) {
                                controlContract.methods.users(msg.reqId).call({from: userAccount}, function(error2, visitor) {
                                    if(!error2)
                                    {
                                        console.log(msg);
                                        console.log(visitor);
                                        console.log(cid);
                                        visitorAccount = visitor.userAddress;
                                        getDataDetail(msg.dataId)
                                        .then(function (datad) {
                                            console.log(datad);
                                            msgStatus(msg.status, 1, ba, visitor.userName, datad.dataName, msg.text, cid);
                                            ba++;
                                        });
                                        console.log(cid);
                                    }
                                    else console.log(error2);
                                });
                            }
                        }
                        else {
                            controlContract.methods.users(msg.resId).call({from: userAccount}, function(error3, owner) {
                                if(!error3)
                                {
                                    console.log(msg);
                                    console.log(owner);
                                    console.log(cid);
                                    getDataDetail(msg.dataId)
                                    .then(function (datad) {
                                        console.log(datad);
                                        msgStatus(msg.status, 0, ba, owner.userName, datad.dataName, msg.text, cid);
                                        ba++;
                                    });
                                    console.log(cid);
                                }
                                else console.log(error3);
                            });
                        }
                    }
                    else console.log(error1);
                });
                   
                }
            });

        }


       
        function alterU() {
            var name = $("#newName").val();
            console.log(name);
            var address = $("#newAddress").val();
            var pwd = $("#pwd").val();
            var des = $("#newDescription").val();
            controlContract.methods.isExitUserName(name, user).call({from: userAccount}, function(error1, result1) {
                if(!error1) {
                    console.log(result1);
                    controlContract.methods.isExitUserAddress(address, user).call({from: userAccount}, function(error2, result2) {
                    if(!error2) {
                        console.log(result2);
                        if(!result1)
                        {
                            if(!result2)
                            {
                                controlContract.methods.alterUser(user, name, pwd, des, address).send({from: userAccount, gas:1000000})
                                .on("receipt", function (receipt) {
                                console.log(receipt);
                                })
                                .on("error", function (error) {                 
                                console.log(error);
                                alert("发生错误");
                                });
                            }
                            else 
                            {
                                alert("用户地址已存在");
                                console.log("地址重复");
                            }
                        }
                        else 
                        {
                            alert("用户名已存在");
                            console.log("用户名重复");
                        }
                    }
                    else {
                        console.log(error2);
                    }
                    });
                }
                else {
                    console.log(error1);
                }
                    
            });
            

            controlContract.events.AlterUser(function(error, result) {
                if (!error)
                    {
                        console.log(result);
                        alert("用户修改成功在链上发布！");
                        hidder();
                        window.location.href = url;
                    } 
                else console.log(error);
            });
        }

        function alterCall() {
            $("#bottom").hide();
            $("#cover").show();
        }