<%@ WebHandler Language="C#" Class="map_id_insert" %>

using System;
using System.Web;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.IO;
using System.Threading;

public class map_id_insert : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["id_input"].ToString();
        string b = context.Request.Form["name_input"].ToString();
        string c = context.Request.Form["description"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.landscape_insert(a, b ,c);
        context.Response.Write(re_);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}