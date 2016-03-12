<?php
	//这里两句话很重要,第一讲话告诉浏览器返回的数据是xml格式
	header("Content-Type: text/json;charset=utf-8");
	//告诉浏览器不要缓存数据
	header("Cache-Control: no-cache");
	//接受数据
	$poisonName=$_POST['poisonName'];
	//file_put_contents("mylog.log",$poisonName."\r\n",FILE_APPEND);
	//设置数据库变量  
		$db_host   = 'localhost';    //数据库主机名称，一般都为localhost   
		$db_user   = 'root';         //数据库用户帐号，根据个人情况而定   
		$db_passw  = '';             //数据库用户密码，根据个人情况而定   
		$db_name   = $poisonName;         //数据库具体名称，以刚才创建的数据库为准 
		//连接数据库   
		$conn = mysql_connect($db_host,$db_user,$db_passw) or die ('数据库连接失败！</br>错误原因：'.mysql_error());
		//设置字符为"utf-8"
		mysql_query("set names 'utf8'"); 
		//选择数据库
		mysql_select_db($db_name,$conn) or die('数据库选定失败！</br>错误原因：'.mysql_error());   
		$sql="select * from poisonsimple"; //
		//echo $sql;
		$result = mysql_query($sql) or die('数据库查询失败！</br>错误原因：'.mysql_error());  
		while ($resArray = mysql_fetch_array($result)){
			//用于画直线
			$from=$resArray['from'];//户籍城市
			$to=$resArray['to'];//监狱所在城市
			$value=$resArray['value'];//监狱所在城市
			$output[]=array(
	 			'from'=>$from,
	 			'to'=>$to,
	 			"value"=>$value,
	 			//'value'=>$value,
	 			);
		}
		exit(json_encode($output,JSON_UNESCAPED_UNICODE));

?>