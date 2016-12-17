using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
/// <summary>
/// Method_back 的摘要描述
/// </summary>
public class Method_back
{
    string Agriculture_sql = WebConfigurationManager.ConnectionStrings["Agriculture_sql"].ConnectionString;
    SqlConnection conn;
    DBUtil db = new DBUtil();
    MYCryptography crypto = new MYCryptography();
    public Method_back()
    {
        conn = new SqlConnection(Agriculture_sql);
    }
    public string Farm_insert(string a, string b, string c, string d, string e)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"insert into [Farm] ([Farm_name],[Farm_location],[Farm_farmername],[Farm_phone],[Farm_detail]) values(@a,@b,@c,@d,@e)", conn);
        //cmd.Parameters.Add("@a", SqlDbType.NChar, 25).Value = "123";
        //cmd.Parameters.Add("@b", SqlDbType.NVarChar, 100).Value = "123sda";
        cmd.Parameters.Add("@a", SqlDbType.NChar, 50).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 100).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.Char, 25).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.NVarChar, 20).Value = d;
        cmd.Parameters.Add("@e", SqlDbType.NChar, 2000).Value = e;

        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string Farm_View()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [Farm]");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string Product_insert(string a, string b, string c, string d, string e, string f, string g, string h)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"insert into [Product] ([Product_name],[Product_num],[Product_price],[Product_unit],[Fram_id],[InspectionAgency_id],[Product_detail],[Picture_location]) values(@a,@b,@c,@d,@e,@f,@g,@h)", conn);
        cmd.Parameters.Add("@a", SqlDbType.VarChar, 50).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.Int).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.Int).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.Char, 10).Value = d;
        cmd.Parameters.Add("@e", SqlDbType.Int).Value = e;
        cmd.Parameters.Add("@f", SqlDbType.Int).Value = f;
        cmd.Parameters.Add("@g", SqlDbType.VarChar, 1000).Value = g;
        cmd.Parameters.Add("@h", SqlDbType.VarChar, 1000).Value = "Product-Image/"+h;

        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string View_Farm_id()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Farm].Farm_id,[Farm].Farm_name from [Farm]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;

    }
    public string View_InspectionAgency_id()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [InspectionAgency]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;

    }
    public string Product_View()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Product].*,[Farm].*,[InspectionAgency].* from [Product],[Farm],[InspectionAgency] where [Product].Fram_id=[Farm].Farm_id and [Product].InspectionAgency_id=[InspectionAgency].InspectionAgency_id");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string Grow_product_id()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Product].Product_id,[Product].Product_name from [Product]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;

    }
    public string Grow_id()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [grow_item]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;

    }
    public string Grow_insert(int a, string b, string c)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"insert into [Grow] ([Product_id],[Grow_time],[Grow_status]) values(@a,@b,@c)", conn);
        cmd.Parameters.Add("@a", SqlDbType.Int).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.VarChar,50).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.VarChar, 50).Value = c;

        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string Grow_View()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Grow].*,[Product].Product_id,[Product].Product_name from [Grow],[Product]  where ([Grow].Product_id = [Product].Product_id)");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string landscape_insert(string a, string b, string c)//id name
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"insert into [landscape] ([address],[coordinate_name],[description]) values(@a,@b,@c)", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string Account_View()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Account].Account,[Account].Password,[Account].Name,[Account].Sex,[Account].[E-mail],[Account].phone,[Account].cellphone,[Account].address,[Account].birthday from [Account]");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string Analysis_View()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [Analysis] where 年分='97' ");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string Analysis_View_all()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [Analysis]");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return str_json;
    }
    public string Analysis_select(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [Analysis].年分,[Analysis].產量 from [Analysis] where 種類=@a", conn);
        cmd.Parameters.Add("@a", SqlDbType.VarChar,100).Value = a;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        
        return str_json;
    }
    public string product_years_added(string a, string b, string c)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"insert into [Analysis] ([年分],[種類],[產量]) values(@a,@b,@c)", conn);
        cmd.Parameters.Add("@a", SqlDbType.Int).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar,500).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.Int).Value = c;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string Forum_view()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [Forum]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return str_json;
    }
    public string Forum_updata(string a, string b, string c , string d)
    {
        conn.Open();
        //SqlCommand cmd = new SqlCommand(@"updata [Forum] set Admin_time = @a , Admin_message = @b , status= @c  where Forum_id = @d ", conn);
        SqlCommand cmd = new SqlCommand(@"update [Forum] SET Admin_time = @a ,Admin_message= @b ,status= @c  where Forum_id = @d " , conn);

        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.Int).Value = d;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();    
        return "success";
    }
    public string Order_list()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [Order_list]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return str_json;
    }
    public string contact_us()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [contact_us].contact_name,[contact_us].contact_mail,[contact_us].contact_phone,[contact_us].contact_detail from [contact_us]");
        cmd.Connection = conn;
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //context.Response.Write(str_json);
        return str_json;
    }
    public string product_modfiy(string a, string b, string c, string d, string e, string f, string g, string h, string i)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"update [Product] SET Product_name = @a ,Product_num= @b ,Product_price= @c ,Product_unit= @d ,Star= @e ,Fram_id= @f ,InspectionAgency_id= @g ,Product_detail= @h  where Product_id = @i ", conn);

        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.NVarChar, 1000).Value = d;
        cmd.Parameters.Add("@e", SqlDbType.NVarChar, 1000).Value = e;
        cmd.Parameters.Add("@f", SqlDbType.NVarChar, 1000).Value = f;
        cmd.Parameters.Add("@g", SqlDbType.NVarChar, 1000).Value = g;
        cmd.Parameters.Add("@h", SqlDbType.NVarChar, 1000).Value = h;
        cmd.Parameters.Add("@i", SqlDbType.NVarChar, 1000).Value = i;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string product_delete(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"delete from [Product] where Product_id= @a");
        cmd.Connection = conn;
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 50).Value = a;
        cmd.ExecuteNonQuery();
        conn.Close();
        return "success";
    }
    public string farm_modfiy(string a, string b, string c, string d, string e, string f)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"update [Farm] SET Farm_name = @a ,Farm_location= @b ,Farm_farmername= @c ,Farm_phone= @d ,Farm_detail= @e  where Farm_id = @f ", conn);

        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.NVarChar, 1000).Value = d;
        cmd.Parameters.Add("@e", SqlDbType.NVarChar, 1000).Value = e;
        cmd.Parameters.Add("@f", SqlDbType.NVarChar, 1000).Value = f;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string farm_delete(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"delete from [Farm] where Farm_id= @a", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 50).Value = a;
        cmd.ExecuteNonQuery();
        conn.Close();
        return "success";
    }
    public string grow_delete(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"delete from [Grow] where Grow_id= @a", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 50).Value = a;
        cmd.ExecuteNonQuery();
        conn.Close();
        return "success";
    }
    public string grow_modfiy(string a, string b, string c)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"update [Grow] SET Product_id = @a ,Grow_status= @b  where Grow_id = @c ", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string account_modify(string b, string c, string d, string e, string f, string g, string h, string i)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"update [Account] SET Name = @c ,Sex= @d ,[E-mail]= @e ,phone= @f ,cellphone= @g ,address= @h ,birthday= @i  where Password = @b ", conn);
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.Parameters.Add("@d", SqlDbType.NVarChar, 1000).Value = d;
        cmd.Parameters.Add("@e", SqlDbType.NVarChar, 1000).Value = e;
        cmd.Parameters.Add("@f", SqlDbType.NVarChar, 1000).Value = f;
        cmd.Parameters.Add("@g", SqlDbType.NVarChar, 1000).Value = g;
        cmd.Parameters.Add("@h", SqlDbType.NVarChar, 1000).Value = h;
        cmd.Parameters.Add("@i", SqlDbType.NVarChar, 1000).Value = i;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
    public string account_delete(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"delete from [Account] where Account= @a", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 50).Value = a;
        cmd.ExecuteNonQuery();
        conn.Close();
        return "success";
    }
    public string account_login(string a , string b)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select * from [back_admin] where Admin_Account = @a  and  Admin_Password = @b", conn);
        cmd.Parameters.Add("@a", SqlDbType.NChar, 25).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 100).Value = crypto.str_cryptography("Agriculture", b);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        if (dt.Rows.Count > 0)
        {
            return dt.Rows[0]["Admin_Account"].ToString(); 
        }
        else
        {
            return "f";
        }
        //return "success";
    }
    public string admin_view()
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"select [back_admin].Admin_Account,[back_admin].Admin_Password,[back_admin].Admin_Name,[back_admin].IP,[back_admin].time from [back_admin]", conn);
        cmd.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd);
        conn.Close();
        conn.Dispose();
        string str_json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return str_json;
    }
    public string admin_insert(string a, string b, string c)
    {
        conn.Open();
        SqlCommand cmd_find = new SqlCommand(@"select * from [back_admin] where Admin_Account = @a " , conn);
        cmd_find.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd_find.ExecuteNonQuery();
        DataTable dt = db.cmdTable(cmd_find);
        if (dt.Rows.Count > 0)
        {
            return "false";
        }
        else
        {
            SqlCommand cmd = new SqlCommand(@"insert into [back_admin] ([Admin_Account],[Admin_Password],[Admin_Name]) values(@a,@b,@c)", conn);
            cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
            cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = crypto.str_cryptography("Agriculture", b);
            cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
            cmd.ExecuteNonQuery();
            conn.Close();
            conn.Dispose();
            return "success";
        }
    }
    public string admin_delete(string a)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"delete from [back_admin] where Admin_Account= @a", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 50).Value = a;
        cmd.ExecuteNonQuery();
        conn.Close();
        return "success";
    }
    public string ip_modfiy(string a, string b, string c)
    {
        conn.Open();
        SqlCommand cmd = new SqlCommand(@"update [back_admin] SET IP = @a ,time= @b  where Admin_Account = @c ", conn);
        cmd.Parameters.Add("@a", SqlDbType.NVarChar, 1000).Value = a;
        cmd.Parameters.Add("@b", SqlDbType.NVarChar, 1000).Value = b;
        cmd.Parameters.Add("@c", SqlDbType.NVarChar, 1000).Value = c;
        cmd.ExecuteNonQuery();
        conn.Close();
        conn.Dispose();
        return "success";
    }
}