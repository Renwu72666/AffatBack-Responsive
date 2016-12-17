<%@ WebHandler Language="C#" Class="product_insert" %>

using System;
using System.Web;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.IO;
using System.Threading;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class product_insert : IHttpHandler {

    public void ProcessRequest (HttpContext context) {

        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        string d = context.Request.Form["d"].ToString();
        string e = context.Request.Form["e"].ToString();
        string f = context.Request.Form["f"].ToString();
        string g = context.Request.Form["g"].ToString();
        string h = context.Request.Form["h"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.Product_insert(a,b,c,d,e,f,g,h);
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}