<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<html>
  <head>
    <title>欢迎页！！！</title>
  </head> 
  <body>
    <%request.setCharacterEncoding("GBK"); %>
    <table width="80%" border="1">
    	<tr>
    		<td>用户ID</td>
    		<td>用户名</td>
    		<td>邮箱</td>
    		<td>头像</td>
    	</tr>
    	<tr>
    		<td>${info.userID}</td>
    		<td>${info.userName}</td>
    		<td>${info.userEmail}</td>
    		<td>${info.picturePath}</td> 
    	</tr>
    </table>
  </body>
  
</html>
