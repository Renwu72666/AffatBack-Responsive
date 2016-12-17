<%@ WebHandler Language="C#" Class="admin_view" %>

using System;
using System.Web;

public class admin_view : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        Method_back method_ = new Method_back();
        string re_ = method_.admin_view();
        context.Response.Write(re_);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}