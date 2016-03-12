<?php
	//这里两句话很重要,第一讲话告诉浏览器返回的数据是xml格式
	header("Content-Type: text/json;charset=utf-8");
	//告诉浏览器不要缓存数据
	header("Cache-Control: no-cache");
	//接受数据
	//$username=$_POST['username'];
	//设置数据库变量  
		$db_host   = 'localhost';    //数据库主机名称，一般都为localhost   
		$db_user   = 'root';         //数据库用户帐号，根据个人情况而定   
		$db_passw  = '';             //数据库用户密码，根据个人情况而定   
		$db_name   = 'poison_common';         //数据库具体名称，以刚才创建的数据库为准 
		//连接数据库   
		$conn = mysql_connect($db_host,$db_user,$db_passw) or die ('数据库连接失败！</br>错误原因：'.mysql_error());
		//设置字符为"utf-8"
		mysql_query("set names 'utf8'"); 
		//选择数据库
		mysql_select_db($db_name,$conn) or die('数据库选定失败！</br>错误原因：'.mysql_error());   
		$sql="select * from geocoord"; //从数据表test查询android返回参数id的temp,shidu,sunshine,control
		$result = mysql_query($sql) or die('数据库查询失败！</br>错误原因：'.mysql_error());  
		while ($resArray = mysql_fetch_array($result)){
			$city=$resArray['city'];
			$x=$resArray['longitude'];//经度
			$y=$resArray['latitude'];//纬度
			$output[]=array(
	 			'city'=>$city,
	 			'x'=>$x,
	 			'y'=>$y,
	 			);
		}
		exit(json_encode($output,JSON_UNESCAPED_UNICODE));

?>