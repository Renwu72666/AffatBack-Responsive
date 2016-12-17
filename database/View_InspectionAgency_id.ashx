<%@ WebHandler Language="C#" Class="View_InspectionAgency_id" %>

using System;
using System.Web;

public class View_InspectionAgency_id : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        Method_back method_ = new Method_back();
        string re_ = method_.View_InspectionAgency_id();
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}