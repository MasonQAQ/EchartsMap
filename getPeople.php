<?php
	//这里两句话很重要,第一讲话告诉浏览器返回的数据是xml格式
	header("Content-Type: text/json;charset=utf-8");
	//告诉浏览器不要缓存数据
	header("Cache-Control: no-cache");
	//接受数据
	$location=$_POST['location'];
	//设置数据库变量  
		$db_host   = 'localhost';    //数据库主机名称，一般都为localhost   
		$db_user   = 'root';         //数据库用户帐号，根据个人情况而定   
		$db_passw  = '';             //数据库用户密码，根据个人情况而定   
		$db_name   = "山东省泰安监狱";         //数据库具体名称，以刚才创建的数据库为准 
		//连接数据库   
		$conn = mysql_connect($db_host,$db_user,$db_passw) or die ('数据库连接失败！</br>错误原因：'.mysql_error());
		//设置字符为"utf-8"
		mysql_query("set names 'utf8'"); 
		//选择数据库
		mysql_select_db($db_name,$conn) or die('数据库选定失败！</br>错误原因：'.mysql_error());   
		$sql="select * from poisonlist where p_home_city='".$location."'";
		$result = mysql_query($sql) or die('数据库查询失败！</br>错误原因：'.mysql_error());
		while ($resArray = mysql_fetch_array($result)){
			$name=$resArray['p_name'];//囚犯姓名
			$id=$resArray['p_id'];//囚犯身份证号
			$photo=$resArray['p_photo_url'];//囚犯照片所在路径
			$sex=$resArray['p_sex'];//性别
			$old=$resArray['p_old'];//年龄
			$phone=$resArray['p_connect_number'];//联系人电话
			$home=$resArray['p_home_province']."省".$resArray['p_home_city']."市";//户籍所在地：xx省xx市
			$poison=$resArray['p_poison_province']."省".$resArray['p_poison_city']."市/".$resArray['p_poison_name'];//监狱所在地
			$text=$resArray['p_text'];//犯罪详细信息
			$output[]=array(
	 			'name'=>$name,
	 			'id'=>$id,
	 			"photo"=>$photo,
	 			'sex'=>$sex,
	 			'old'=>$old,
	 			'home'=>$home,
	 			'poison'=>$poison,
	 			'phone'=>$phone,
	 			'text'=>$text,
	 			);
		}
		exit(json_encode($output,JSON_UNESCAPED_UNICODE));
?>