<%@ WebHandler Language="C#" Class="product_delete" %>

using System;
using System.Web;

public class product_delete : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.product_delete(a);
        context.Response.Write(re_);

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}