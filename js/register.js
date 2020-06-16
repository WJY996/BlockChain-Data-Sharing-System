


        function createNewUser(name,pwd,address) {
            let userAccount = address;

            controlContract.methods.isExitUserName(name, 0).call({from: userAccount}, function(error1, result1) {
                if(!error1) {
                    console.log(result1);
                    controlContract.methods.isExitUserAddress(address, 0).call({from: userAccount}, function(error2, result2) {
                    if(!error2) {
                        console.log(result2);
                        if(!result1)
                        {
                            if(!result2)
                            {
                                console.log(name);
                                $("#result").html("正在区块链上创建新用户...");
                                controlContract.methods.createUser(name,pwd,address).send({from: userAccount, gas:1000000})
                                .on("receipt", function (receipt) {
                                $("#result").html("成功创建" + name + "!");
                                })
                                .on("error", function (error) {                 
                                console.log(error);
                                });
                            }
                            else 
                            {
                                $("#result").html("用户地址已存在");
                                console.log("地址重复")
                            }
                        }
                        else 
                        {
                            $("#result").html("用户名已存在");
                            console.log("用户名重复")
                        }
                    }
                    else {
                        console.log(error2);
                    }
                    })
                }
                else {
                    console.log(error1);
                }
                    
            })

            controlContract.events.NewUser(function(error,event) {
                if(!error)
                {
                    console.log(event); 
                    alert("成功在链上发布！");
                }
                else console.log(error);
            });
            
        }

        
        $("#register").click(function() {
            console.log($("#username").val());
            if(!isEmpty($("#username").val()) && !isEmpty($("#pwd1").val()) && !isEmpty($("#pwd2").val()) && !isEmpty($("#address").val())) {
                if($("#pwd1").val() == $("#pwd2").val()) {
                    createNewUser($("#username").val(), $("#pwd1").val(), $("#address").val());
                }
                else alert("请确认密码！");
            }
            else alert("输入内容不能为空");
        });

        $("#login").click(function() {
            window.location.href = "login.html";
        });

