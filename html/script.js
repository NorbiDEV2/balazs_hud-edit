
$(function () {

    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }
    display(true)
    $("#society-container").hide();

    function moneyFormat(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var isArmorShown = false;
    var isStaminaShown = false;
    var isOxygenShown = false;
    var isCashShown = false;
    var isDirtyShown = false;
    var isSocShown = false;

    $("#cash-container").hide();
    $("#dirty-container").hide();
    $("#armor-container").hide(); 
    $("#stamina-container").hide();
    $("#oxygen-container").hide();  
    $("#cash-container").hide();
    $("#society-container").hide();

    window.addEventListener('message', function(event) {
        if (event.data.type === "ui") {
            if (event.data.status == true) {
                display(true)
            }
            else {
                display(false)
            }
        }
        else if (event.data.type === "update") {
            var date = new Date();
            document.getElementById("date").innerHTML = ("0" + date.getHours()).slice(-2)+":"+("0" + date.getMinutes()).slice(-2);
            document.getElementById("id").innerHTML = event.data.id;
            document.getElementById("health").style.width = event.data.health + "%";
            document.getElementById("stamina").style.width = event.data.stamina + "%";
            document.getElementById("hunger").style.width = event.data.food + "%";
            document.getElementById("thirst").style.width = event.data.water + "%";
            document.getElementById("job").innerHTML = event.data.job;
            document.getElementById("jobgrade").innerHTML = event.data.jobgrade;
            document.getElementById("cash").innerHTML = "$"+moneyFormat(event.data.cash);
            document.getElementById("bank").innerHTML = "$"+moneyFormat(event.data.bank);
            document.getElementById("dirty").innerHTML = "$"+moneyFormat(event.data.black);
            document.getElementById("society").innerHTML = "$"+moneyFormat(event.data.socBal);

            if (event.data.cash > 0) {
                if (!isCashShown) {
                    $("#cash-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#cash-container").show();
                    $("#cash-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#cash-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#cash-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isCashShown = true;
                }
            }
            else if (event.data.cash == 0){
                if (isCashShown) {
                    $("#cash-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#cash-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#cash-container").hide();
                             
                        });
                    });
                    isCashShown = false; 
                }
            }

            
            if (event.data.black > 0) {
                if (!isDirtyShown) {
                    $("#dirty-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#dirty-container").show();
                    $("#dirty-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#dirty-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#dirty-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isDirtyShown = true;
                }
            }
            else if (event.data.black == 0){
                if (isDirtyShown) {
                    $("#dirty-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#dirty-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#dirty-container").hide();
                             
                        });
                    });
                    isDirtyShown = false; 
                }
            }


           if (event.data.armor > 0) {
                if (!isArmorShown) {
                    $("#armor-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#armor-container").show();
                    $("#armor-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#armor-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#armor-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isArmorShown = true;
                }
                document.getElementById("armor").style.width = event.data.armor + "%";
            }
            else if (event.data.armor == 0){
                if (isArmorShown) {
                    $("#armor-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#armor-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#armor-container").hide();             
                        });
                    });
                    isArmorShown = false; 
                }
            }

            if (event.data.stamina < 100) {
                if (!isStaminaShown) {
                    $("#stamina-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#stamina-container").show();
                    $("#stamina-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#stamina-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#stamina-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isStaminaShown = true;
                }
                document.getElementById("stamina").style.width = event.data.stamina + "%";
            }
            else if (event.data.stamina == 100) {
                if (isStaminaShown) {
                    $("#stamina-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#stamina-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#stamina-container").hide();
                             
                        });
                    });
                    isStaminaShown = false; 
                }
                
                 
            }

            
            if (event.data.oxygen < 100) {
                if (!isOxygenShown) {
                    $("#oxygen-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#oxygen-container").show();
                    $("#oxygen-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#oxygen-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#oxygen-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isOxygenShown = true;
                }
                if (event.data.oxygen > 0){
                    document.getElementById("oxygen").style.width = event.data.oxygen + "%";
                }
                else{
                    document.getElementById("oxygen").style.width = "0%";
                }
                
            }
            
            else if (event.data.oxygen >= 100) {
                if (isOxygenShown) {
                    $("#oxygen-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#oxygen-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#oxygen-container").hide();         
                        });
                    });
                    isOxygenShown = false; 
                }
            }

        
            
        }
    
        else if (event.data.type === "isBoss") {
            if (event.data.isBoss == true) {
                if (!isSocShown){
                    $("#society-container").css({width:'100%', left:'100%', opacity: 0});
                    $("#society-container").show();
                    $("#society-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#society-container").animate({width:'100%', left:'10%', opacity: 1}, 150, function(){
                            $("#society-container").animate({width:'100%', left:'0%', opacity: 1}, 100)
                        });
                    });
                    
                    isSocShown = true;
                }
                
            }
            else {
                if (isSocShown) {
                    $("#society-container").animate({width:'100%', left:'-10%', opacity: 1}, 400, function(){
                        $("#society-container").animate({width:'100%', left:'100%', opacity: 0}, 150, function(){
                            $("#society-container").hide();
                        });
                    });
                    isSocShown = false; 
                }
            }            
        }
    })

    
})