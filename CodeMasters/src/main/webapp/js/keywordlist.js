function fun1()
    {
        var first=document.getElementById("f1");
        if(document.getElementById("textbox1").value.length == 0)
        {
        document.getElementById("textbox1").value=first.innerHTML;
        return false;
        }
        else
        {
            var gmd=document.getElementById("textbox1");
            var k=gmd.value+","+first.innerHTML;
            var dmg=k.split(",");
            if(dmg.length > 2)
            {
               $("#keyword_limit").text("Keyword limit exceeded..")
            }
            else
            {
                gmd.value=k;
            }
        }
    }
    
    function fun2()
    {
        var first=document.getElementById("f2");
        if(document.getElementById("textbox1").value.length == 0)
        {
        document.getElementById("textbox1").value=first.innerHTML;
        return false;
        }
        else
        {
            var gmd=document.getElementById("textbox1");
            var k=gmd.value+","+first.innerHTML;
            var dmg=k.split(",");
            if(dmg.length > 2)
            {
               $("#keyword_limit").text("Keyword limit exceeded..!")
            }
            else
            {
                gmd.value=k;
            }
        }
    }
    
    function fun3()
    {
        var first=document.getElementById("f3");
        if(document.getElementById("textbox1").value.length == 0)
        {
        document.getElementById("textbox1").value=first.innerHTML;
        return false;
        }
        else
        {
            var gmd=document.getElementById("textbox1");
            var k=gmd.value+","+first.innerHTML;
            var dmg=k.split(",");
            if(dmg.length > 2)
            {
               $("#keyword_limit").text("Keyword limit exceeded..!")
            }
            else
            {
                gmd.value=k;
            }

        }
    }
    
    function fun4()
    {
        var first=document.getElementById("f4");
        if(document.getElementById("textbox1").value.length == 0)
        {
        document.getElementById("textbox1").value=first.innerHTML;
        return false;
        }
        else 
        {
            var gmd=document.getElementById("textbox1");
            var k=gmd.value+","+first.innerHTML;
            var dmg=k.split(",");
            if(dmg.length > 2)
            {
               $("#keyword_limit").text("Keyword limit exceeded..!")
            }
            else
            {
                gmd.value=k;
            }
        }
    }
    
    function fun5()
    {
        var first=document.getElementById("f5");
        if(document.getElementById("textbox1").value.length == 0)
        {
        document.getElementById("textbox1").value=first.innerHTML;
        return false;
        }
        else
        {
            var gmd=document.getElementById("textbox1");
            var k=gmd.value+","+first.innerHTML;
            var dmg=k.split(",");
            if(dmg.length > 2)
            {
               $("#keyword_limit").text("Keyword limit exceeded..!")
            }
            else
            {
                gmd.value=k;
            }
        }
    }



// function fun1()
//    {
//        var first=document.getElementById("f1");
//        document.getElementById("textbox1").value=first.innerHTML;
//        return false;
//    }
//    
//    function fun2()
//    {
//        var first=document.getElementById("f2");
//        document.getElementById("textbox1").value=first.innerHTML;
//        return false;
//    }
//    
//    function fun3()
//    {
//        var first=document.getElementById("f3");
//        document.getElementById("textbox1").value=first.innerHTML;
//        return false;
//    }
//    
//    function fun4()
//    {
//        var first=document.getElementById("f4");
//        document.getElementById("textbox1").value=first.innerHTML;
//        return false;
//    }
//    
//    function fun5()
//    {
//        var first=document.getElementById("f5");
//        document.getElementById("textbox1").value=first.innerHTML;
//        return false;
//    }


