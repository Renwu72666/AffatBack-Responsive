<%@ WebHandler Language="C#" Class="grow_modify" %>

using System;
using System.Web;

public class grow_modify : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.grow_modfiy(a,b,c);
        context.Response.Write(re_);

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}