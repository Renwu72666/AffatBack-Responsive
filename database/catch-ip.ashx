<%@ WebHandler Language="C#" Class="catch_ip" %>

using System;
using System.Web;

public class catch_ip : IHttpHandler {
    System.Web.HttpContext context = System.Web.HttpContext.Current;
    public void ProcessRequest (HttpContext context) {
        string sIPAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        if (string.IsNullOrEmpty(sIPAddress))
        {
            context.Response.Write(context.Request.ServerVariables["REMOTE_ADDR"]);
        }
        else
        {
            string[] ipArray = sIPAddress.Split(new Char[] { ',' });
            context.Response.Write(ipArray[0]);
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}