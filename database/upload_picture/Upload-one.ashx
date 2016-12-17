<%@ WebHandler Language="C#" Class="uploadHandler" %>

using System;
using System.IO;
using System.Web;

public class uploadHandler : IHttpHandler {

    public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Charset = "utf-8";

            HttpPostedFile file = context.Request.Files["files"];

            string uploadPath =
                HttpContext.Current.Server.MapPath("/") + "Product-Image\\";

            if (file != null)
            {
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                file.SaveAs(uploadPath + file.FileName);
                //下面這句代碼缺少的話，上傳成功後上傳隊列的顯示不會自動消失
                string newName = file.FileName;
                string oldName = file.FileName;
                context.Response.Write("{\"newName\": \"" + newName + "\", \"oldName\": \"" + oldName + "\"}");
            }
            else
            {
                context.Response.Write("0");
            }
        }

    public bool IsReusable {
        get {
            return false;
        }
    }

}