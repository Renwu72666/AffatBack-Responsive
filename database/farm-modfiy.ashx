<%@ WebHandler Language="C#" Class="product_modfiy" %>

using System;
using System.Web;

public class product_modfiy : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        string d = context.Request.Form["d"].ToString();
        string e = context.Request.Form["e"].ToString();
        string f = context.Request.Form["f"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.farm_modfiy(a,b,c,d,e,f);
        context.Response.Write(re_);

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}