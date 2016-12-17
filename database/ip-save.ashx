<%@ WebHandler Language="C#" Class="ip_save" %>

using System;
using System.Web;

public class ip_save : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.ip_modfiy(a,b,c);
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}