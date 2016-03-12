var myXmlHttpRequest=getXmlHttpobject();//Ajax引擎对象for markLine
var myCityHttpRequest=getXmlHttpobject();//Ajax引擎对象for geoCoord
var myProvinceHttpRequest=getXmlHttpobject();//Ajax引擎对象for province to find cities
var myPoisonNameHttpRequest=getXmlHttpobject(); //Ajax引擎对象for PoisonName
var myPeopleHttpRequest=getXmlHttpobject();//Ajax引擎对象for people
var myMessageHttpRequest=getXmlHttpobject();//Ajax引擎对象for message
var data=[];
var data2=[];
var row1 = {};
var row2 = {};
var array=[];//该数组用于保存城市定位中的经纬度;该数组长度为2,第一个是经度，第二个是纬度
var data3={};//该对象是给geoCoord数据的最终样式
var array2=[];
var data4={};
var var1;//点击事件记录
document.getElementById('main').style.height=$(window).height()+"px";
document.getElementById('body').style.height=$(window).height()+"px";
function getXmlHttpobject(){
        var xmlHttpRequest;
        if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlHttpRequest=new XMLHttpRequest();
          }else
          {// code for IE6, IE5
          xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
          }
        return xmlHttpRequest;
    }
function getCityPoint(){
        if (myCityHttpRequest) {
            var url="getCityPoint.php";
            myCityHttpRequest.open("post",url,true);
            myCityHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myCityHttpRequest.onreadystatechange=doGetCityPoint;//不能使用function()
            myCityHttpRequest.send();

        }else{
        }
    }
//从省获取市
function getPoisonName(){
        if (myProvinceHttpRequest) {
            var url="getPoisonName.php";
            myProvinceHttpRequest.open("post",url,true);
            var data="province="+document.getElementById('province').value;
            myProvinceHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myProvinceHttpRequest.onreadystatechange=doGetPoisonName;//不能使用function()
            myProvinceHttpRequest.send(data);
        }else{
        }
    }
//从select中获取选择的监狱
function getPoisonData(){
        if (myPoisonNameHttpRequest) {
            var url="getPoisonData.php";
            myPoisonNameHttpRequest.open("post",url,true);
            var data="poisonName="+document.getElementById('poisonName').value;
            myPoisonNameHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myPoisonNameHttpRequest.onreadystatechange=doGetPoisonData;//不能使用function()
            myPoisonNameHttpRequest.send(data);
        }else{
        }
    }
function getPeople(var1){
        if (myPeopleHttpRequest) {
            var url="getPeople.php";
            myPeopleHttpRequest.open("post",url,true);
            var data="location="+var1;
            myPeopleHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myPeopleHttpRequest.onreadystatechange=doGetPeople;//不能使用function()
            myPeopleHttpRequest.send(data);
        }else{
        }
    }
//查询具体短信信息,传入参数：身份证号.
function getMessage(var2,var3){
        if (myMessageHttpRequest) {
            var url="getMessage.php";
            myMessageHttpRequest.open("post",url,true);
            var data="id="+var2+"&poisonName="+var3;//传入参数：犯人身份证号和所在监狱
            myMessageHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myMessageHttpRequest.onreadystatechange=doGetMessage;//不能使用function()
            myMessageHttpRequest.send(data);
        }else{
        }
    }
function doGetCityPoint(){
        //window.alert(myCityHttpRequest.readyState);
        if(myCityHttpRequest.readyState==4 && myCityHttpRequest.status==200){
            var mes=myCityHttpRequest.responseText;
            var reses=eval("("+mes+")");
            var row1;//经度
            var row2;//纬度
            for (var i =0; i < reses.length; i++) {
                array=[];
                array[0]=reses[i].x;
                array[1]=reses[i].y;
                data3[reses[i].city]=array;
            }
        }
}
function doGetPoisonName(){
        //alert(myProvinceHttpRequest.readyState);
        if(myProvinceHttpRequest.readyState==4 && myProvinceHttpRequest.status==200){
            var mes=myProvinceHttpRequest.responseText;
            var reses=eval("("+mes+")");
            document.getElementById('poisonName').length=0;
            var myoption1=document.createElement("option");
                myoption1.value="-1";
                myoption1.innerText="请选择监狱名";
                document.getElementById('poisonName').appendChild(myoption1);
            for (var i =0; i < reses.length; i++) {
               var poisonName=reses[i].poisonname;
               var myoption=document.createElement("option");
                myoption.value=poisonName;
                myoption.innerText=poisonName;
                document.getElementById('poisonName').appendChild(myoption);
            }

        }
    }
function doGetPoisonData(){
        //alert(myProvinceHttpRequest.readyState);
        if(myPoisonNameHttpRequest.readyState==4 && myPoisonNameHttpRequest.status==200){
            var mes=myPoisonNameHttpRequest.responseText;
            myChart.clear();//清除之前的绘图
            option.title.text=document.getElementById('poisonName').value;
            if(mes=='0'){
                array2=[{}];
                data2=[[]];
                option.series[0].markLine.data=data2;
                option.series[0].markPoint.data=array2;
            }else{
               //收到的值不是0，则解析数据开始设置
                var reses=eval("("+mes+")");
                for (var i =0; i <reses.length; i++) {
                    row1={};//清空对象
                    row2={};//清空对象
                    data4={};
                    row1.name=reses[i].from;
                    row2.name=reses[i].to;
                    row2.value=reses[i].value;
                    data4.name=reses[i].from;
                    data4.value=reses[i].value;
                    data=[];//清空数组
                    data.push(row1);
                    data.push(row2);
                    array2[i]=data4;
                    data2.push(data);
                    option.series[0].markLine.data=data2;
                    option.series[0].markPoint.data=array2;
                }     
            }
            
            var ecConfig = require('echarts/config'); 
            myChart.on(ecConfig.EVENT.CLICK, eConsole); 
            myChart.setOption(option);            
        // //清空历史记录,避免在画面中多次点击提交会重复画线
        data=[];
        data2=[];
        row1 = {};
        row2 = {};
        array2=[];
        }
    }
function doGetPeople(){
    var reses=[];
    //window.alert(myPeopleHttpRequest.readyState);
    if(myPeopleHttpRequest.readyState==4&& myPeopleHttpRequest.status==200){
        document.getElementById('doortitle').innerText="来自"+var1+"的囚犯清单";
        var mes=myPeopleHttpRequest.responseText;
        reses=eval("("+mes+")");
        var ul=document.getElementById('table_a');
        document.getElementById('light').style.display='block';
        $("ul").empty();//清空所有列表
       //插入新行
        for(var i=0;i<reses.length;i++){
            var li = document.createElement("li");
            var a=document.createElement("a");
            var text = document.createTextNode(reses[i].name);
            a.appendChild(text);
            a.href="#";
            li.appendChild(a);
            ul.appendChild(li);
        }
        $("li").live("click",function(){
                var i = $(this).index("li");
                 $(this).css("background","#6495EE").siblings().css("background","gray");
                document.getElementById('light2').style.display='block';//相信信息版块显示
                document.getElementById('name').innerText=reses[i].name;
                document.getElementById('id').innerText=reses[i].id;
                document.getElementById('sex').innerText=reses[i].sex;
                document.getElementById('old').innerText=reses[i].old;
                document.getElementById('photo').src=reses[i].photo;
                document.getElementById('home').innerText=reses[i].home;
                document.getElementById('poison').innerText=reses[i].poison;
                document.getElementById('text').innerText=reses[i].text;
                document.getElementById('phone').innerText=reses[i].phone;
                //事件绑定至查询默认具体短信列表
                //根据身份证号
                getMessage(reses[i].id,document.getElementById('poisonName').value);
        }); 
    }
}
function doGetMessage(){
    if(myMessageHttpRequest.readyState==4&& myMessageHttpRequest.status==200){
        var mes=myMessageHttpRequest.responseText;
        //alert(mes);
        reses=eval("("+mes+")");
        $("dl").empty();
        var dl=document.getElementById('text2');
       //插入新行
        for(var i=0;i<reses.length;i++){
            var dt = document.createElement("dt");
            var dd = document.createElement("dd");
            var text1 = document.createTextNode(reses[i].title);
            var text2 = document.createTextNode(reses[i].text);
            dt.appendChild(text1);
            dl.appendChild(dt);
            dd.appendChild(text2);
            dl.appendChild(dd);
        }
    }
}
    //点击,param,启动ajax引擎，获取该点详细资料,param 包含事件详细信息（Important）。
function eConsole(param) { 
                        var1=param.name;
                        getPeople(var1);
                    } 
//**********************************************************************************************************
//echarts    
//**********************************************************************************************************
var myChart;
var option;
require.config({
        paths: {
            echarts: './js'
        }
    });
require(
        [
            'echarts',
            'echarts/chart/map'
        ],
        function (ec) {
            myChart = ec.init(document.getElementById('main')); 
            option = {

                color: ['gold','aqua','lime'],
                title : {
                    text: '全国监狱',
                    subtext:'信息推送系统',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show : false,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: false},
                        dataView : {show: false, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataRange: {
                    min : 0,
                    max : 12,
                    x:'right',
                    y:'center',
                    calculable : true,
                    color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                    textStyle:{
                        fontSize:10,
                        color:'#fff'
                    }
                },
                series : [
                    {
                        name: 'showMap',
                        type: 'map',
                        roam: true,
                        hoverable: false,
                        mapType: 'china',
                        geoCoord: data3,
                        itemStyle:{
                            normal:{
                                borderColor:'rgba(100,149,237,1)',
                                borderWidth:0.5,
                                areaStyle:{
                                    color: '#1b1b1b'
                                }
                            }
                        },
                        data:[],
                        clickable:false,
                        markLine : {
                            clickable:false,
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    label:{show:false},
                                    lineStyle: {
                                        type: 'solid',
                                        // label:{show:false},//默认是false
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : []
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                label:{show:true},
                                normal:{
                                    label:{show:true}
                                },
                                emphasis: {
                                    label:{position:'top'}
                                }
                            },
                            //用于设置标注点的数据
                            data : [
                                
                            ]
                        }
                    },
                ]
            };
                myChart.setOption(option);
        }
        );
