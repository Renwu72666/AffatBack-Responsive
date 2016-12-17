
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// DBUtil 的摘要描述
/// </summary>
public class DBUtil
{

    //連線字串
    //string connStr = WebConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
    string Agriculture_sql = WebConfigurationManager.ConnectionStrings["Agriculture_sql"].ConnectionString;
    /// <summary>
    /// 傳入SQL語句，回傳DataTable物件
    /// </summary>
    /// <param name="sql"></param>
    /// <returns></returns>
    public DataTable cmdTable(SqlCommand cmd)
    {
        DataSet ds = new DataSet();
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        da.Fill(ds);
        return ds.Tables.Count > 0 ? ds.Tables[0] : new DataTable();
    }



}