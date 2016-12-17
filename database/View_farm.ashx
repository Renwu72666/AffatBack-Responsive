<%@ WebHandler Language="C#" Class="View_farm" %>
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
public class View_farm : IHttpHandler {
    DBUtil db = new DBUtil();
    string Agriculture_sql = WebConfigurationManager.ConnectionStrings["Agriculture_sql"].ConnectionString;
    public void ProcessRequest (HttpContext context) {
        string a = context.Request.Form["a"].ToString();
        Method_back method_ = new Method_back();
        if (a=="product")
        {
            string re_ = method_.Product_View();
            context.Response.Write(re_);
        }else if (a == "grow")
        {
            string re_ = method_.Grow_View();
            context.Response.Write(re_);

        }else if(a == "account"){
            string re_ = method_.Account_View();
            context.Response.Write(re_);
        }else{
            string re_ = method_.Farm_View();
            context.Response.Write(re_);
        }

        /* context.Response.ContentType = "text/plain";
         SqlConnection conn = new SqlConnection(Agriculture_sql);
         conn.Open();//[Farm].Farm_name,[Farm].Farm_location,[Farm].Farm_farmername,[Farm].Farm_phone,[Farm].Farm_detail
         SqlCommand cmd = new SqlCommand(@"select * from [Farm]");
         cmd.Connection = conn;
         cmd.ExecuteNonQuery();
         DataTable dt = db.cmdTable(cmd);
         conn.Close();
         conn.Dispose();
         string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
         context.Response.Write(str_json);*/
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}