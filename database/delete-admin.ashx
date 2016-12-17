<%@ WebHandler Language="C#" Class="delete_admin" %>

using System;
using System.Web;

public class delete_admin : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.admin_delete(a);
        context.Response.Write(re_);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}