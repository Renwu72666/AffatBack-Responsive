<%@ WebHandler Language="C#" Class="farm_insert" %>

using System;
using System.Web;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.IO;
using System.Threading;

public class farm_insert : IHttpHandler {
    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        string d = context.Request.Form["d"].ToString();
        string e = context.Request.Form["e"].ToString();
        //string f_view = context.Request.Form["f_view"].ToString();
        /*string a =context.Request.QueryString["a"];
        string b =context.Request.QueryString["b"];
        string c =context.Request.QueryString["c"];
        string d =context.Request.QueryString["d"];
        string e =context.Request.QueryString["e"];*/
        Method_back method_ = new Method_back();
        string re_ = method_.Farm_insert(a, b, c, d, e);
        context.Response.Write(re_);

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}