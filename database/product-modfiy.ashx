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
        string g = context.Request.Form["g"].ToString();
        string h = context.Request.Form["h"].ToString();
        string i = context.Request.Form["i"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.product_modfiy(a,b,c,d,e,f,g,h,i);
        context.Response.Write(re_);

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}