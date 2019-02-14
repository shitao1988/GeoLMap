<%@page language="java" contentType="application/json; charset=UTF-8"%>
<%@page import="java.util.Enumeration"%>
<%@page session="false"%>
<%@page import="java.net.*,java.io.*"%>
<%@page import="java.util.Properties" %>
<%
	try {
		request.setCharacterEncoding("UTF-8");
		final int length = 5000;
        String reqURI = request.getQueryString();
        int index = reqURI.indexOf("url=") + "url=".length();
        String realUrl = reqURI.substring(index);
        String reqUrl = URLDecoder.decode(realUrl, "UTF-8");
		
		//System.out.println(reqUrl);
		URL url = null;
		String charset = request.getParameter("charset");
		if (charset == null) {
			charset = "UTF-8";
		}
		url = new URL(reqUrl);

		
		HttpURLConnection con = (HttpURLConnection) url.openConnection();


		con.setRequestMethod(request.getMethod());
		con.setDoOutput(true);

		int clength = request.getContentLength();
		if (clength > 0) {

			con.setDoInput(true);
			InputStream istream = request.getInputStream();
			OutputStream os = con.getOutputStream();

			byte[] bytes = new byte[length];
			int bytesRead = 0;
			while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
				os.write(bytes, 0, bytesRead);
			}

		}

		if (con.getContentType().toLowerCase()
				.contains("application/vnd.ogc.wms_xml")) {
			response.setContentType("application/xml");
		} else
			response.setContentType(con.getContentType());
        String tt=con.getResponseMessage();
		out.clear();
		out = pageContext.pushBody();
		OutputStream ostream = response.getOutputStream();
		response.setContentType(con.getContentType());
		InputStream in = con.getInputStream();

		byte[] bytes = new byte[length];
		int bytesRead = 0;
		while ((bytesRead = in.read(bytes, 0, length)) > 0) {
			ostream.write(bytes, 0, bytesRead);
		}
	} catch (Exception e) {
		System.out.println(e.getMessage());
		System.out.println(e.getStackTrace());
	}
%>