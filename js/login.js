

		$("#lbutton").click(function() {       
            console.log($("#username").val());
            controlContract.methods.fnameToid($("#username").val()).call({from: defaultAccount}, function(error1, result1) {
    			if(!error1) {
    				console.log(result1);
    				let userid = result1;
                    console.log(userid);
    				controlContract.methods.users(userid).call({from: defaultAccount}, function(error2, result2) {
    					if(!error2) {
    						console.log(result2);
    						let userd = result2;
    						if(userd.pwd == $("#pwd").val())
				    		{
				    			let url = "main.html?user="+ userid;
				    	        window.location.href = url;
				    		}
				    		else {
				    			alert("用户名或密码错误");
				    		}
    					}
    					else {
    						alert("用户名或密码错误");
    						console.log(error2);
    					} 
    				});
    			}
    			else console.log(error1);
    		});
		});

        $("#rbutton").click(function() {
            window.location.href = "register.html";
        });
