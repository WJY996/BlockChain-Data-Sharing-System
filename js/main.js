
        function displayDatas() {
            getDataLength()
            .then(function(datal) {
                let length = datal;
                var datas = [];
                for (var i = length - 1; i >= 0; i--) {
                    datas[i] = i;
                }
                console.log(datas);
                for (var i =  0; i < datas.length; i++) {
                    let id = datas[i];
                    console.log(id);
                    controlContract.methods.fdataToOwner(id).call({from: userAccount}, function(error1, ownerid) {
                        if(!error1)
                        {
                            console.log(ownerid);
                            controlContract.methods.users(ownerid).call({from: userAccount}, function(error2, owner) {
                                if(!error2)
                                {
                                    console.log(owner);
                                    getDataDetail(id)
                                    .then(function (datad) {
                                        let dataURL = "dataDetail.html?user="+user+"&data="+id;
                                        var yu = (id % 2);
                                        console.log(yu);
                                        if ( yu == 0) {
                                            let dn = getDataName(datad.dataName);
                                            $("#ldatas").append(`<div class="data">
                                              <br>数据名: ${dn}</br>
                                              <br>数据拥有者: ${owner.userName}</br>
                                              <br>下载次数: ${datad.downloadTimes}</br>
                                              <a href=${dataURL} style="display: inline-block;width: 100%; text-align: center" target="_blank">详情</a>
                                            </div>`);
                                        }
                                        else {
                                            let dn = getDataName(datad.dataName);
                                            $("#rdatas").append(`<div class="data">
                                              <br>数据名: ${dn}</br>
                                              <br>数据拥有者: ${owner.userName}</br>
                                              <br>下载次数: ${datad.downloadTimes}</br>
                                              <a href=${dataURL} style="display: inline-block;width: 100%; text-align: center" target="_blank">详情</a>
                                            </div>`);
                                        }
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
