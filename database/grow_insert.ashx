<%@ WebHandler Language="C#" Class="grow_insert" %>

using System;
using System.Web;

public class grow_insert : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        int a = Int32.Parse(context.Request.Form["a"].ToString());
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.Grow_insert(a, b, c);
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}