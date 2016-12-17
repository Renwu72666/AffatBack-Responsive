<%@ WebHandler Language="C#" Class="Order_list" %>

using System;
using System.Web;

public class Order_list : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        Method_back method_ = new Method_back();
        string re_ = method_.Order_list();
        context.Response.Write(re_);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}