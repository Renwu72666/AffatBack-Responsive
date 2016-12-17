<%@ WebHandler Language="C#" Class="contact_us" %>

using System;
using System.Web;

public class contact_us : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        Method_back method_ = new Method_back();
        string re_ = method_.contact_us();
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}