<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<html>
  <head>
    <title>注册</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head> 
  <body>
    <form action="RegistServlet" method="post">
    	用户名:<input type="text" name="uname"><br><br>
    	邮&nbsp;&nbsp;箱:<input type="text" name="uemail"><br><br>
    	密&nbsp;&nbsp;码:<input type="password" name="upsw" ><br><br>
    	<input type="submit" value="注册">
    	<input type="reset" value="重置">
    </form>
    <h4>${info }</h4>
  </body>
</html>
