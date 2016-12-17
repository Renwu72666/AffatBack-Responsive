<%@ WebHandler Language="C#" Class="updatemessage" %>

using System.Web;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.IO;
using System.Threading;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class updatemessage : IHttpHandler {

    public void ProcessRequest (HttpContext context) {

        string a = context.Request.Form["a"].ToString();
        string b = context.Request.Form["b"].ToString();
        string c = context.Request.Form["c"].ToString();
        string d = context.Request.Form["d"].ToString();
        Method_back method_ = new Method_back();
        string re_ = method_.Forum_updata(a,b,c,d);
        context.Response.Write(re_);
    }
    public bool IsReusable {
        get {
            return false;
        }
    }
}

