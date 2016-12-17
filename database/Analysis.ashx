<%@ WebHandler Language="C#" Class="Analysis" %>

using System;
using System.Web;

public class Analysis : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        Method_back method_ = new Method_back();
        if (a == "id") {
            string re_ = method_.Analysis_View();
            context.Response.Write(re_);
        }else if (a == "all") {
            string re_ = method_.Analysis_View_all();
            context.Response.Write(re_);
        }else {
            string re_ = method_.Analysis_select(a);  
            context.Response.Write(re_);
        }

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}