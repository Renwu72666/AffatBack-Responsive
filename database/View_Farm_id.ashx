<%@ WebHandler Language="C#" Class="View_Farm_id" %>

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

public class View_Farm_id : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        Method_back method_ = new Method_back();
        string re_ = method_.View_Farm_id();
        context.Response.Write(re_);

       

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}