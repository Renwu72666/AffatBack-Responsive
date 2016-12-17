<%@ WebHandler Language="C#" Class="Account_login" %>

using System;
using System.Web;

public class Account_login : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.account_login(a,b);
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}