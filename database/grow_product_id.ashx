<%@ WebHandler Language="C#" Class="grow_product_id" %>

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
public class grow_product_id : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        Method_back method_ = new Method_back();
        string a = context.Request.Form["a"].ToString();
        if (a == "a"){
            string re_ = method_.Grow_product_id();
            context.Response.Write(re_);
        }else{
            string re_ = method_.Grow_id();
            context.Response.Write(re_);
        }

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}