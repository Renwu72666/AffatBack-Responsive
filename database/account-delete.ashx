<%@ WebHandler Language="C#" Class="account_delete" %>

using System;
using System.Web;

public class account_delete : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        if (context.Request.ServerVariables["HTTP_REFERER"] == null)
        {
            context.Response.Redirect("../404.html");
        } else {
            string a = context.Request.Form["a"].ToString();
            Method_back method_ = new Method_back();
            string re_ = method_.account_delete(a);
            context.Response.Write(re_);
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}