<%@ page contentType="text/html" pageEncoding="GBK" %>
<html>
  <head>
    <title>登录</title>
  </head> 
  <body>
<%
	request.setCharacterEncoding("GBK") ;
%>
    <form action="LoginServlet" method="post">
    	用户名：<input type="text" name="uname"><br>
    	密码：<input type="password" name="upsw"><br>
    	<input type="submit" value="登录">
    	<input type="reset" value="重置">  <a href="regist.jsp">注册</a>  	
    </form>
  </body>
</html>
