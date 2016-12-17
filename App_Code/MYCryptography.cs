using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Web;
using System.Text;

/// <summary>
/// Cryptography 的摘要描述
/// </summary>
public class MYCryptography
{
    public string str_cryptography(string str_key , string word)
    {
        byte[] key = Encoding.Default.GetBytes(str_key);
        HMACSHA384 sha384 = new HMACSHA384(key);//建立一個SHA384
        byte[] source = Encoding.Default.GetBytes(word);//將字串轉為Byte[]
        byte[] crypto = sha384.ComputeHash(source);//進行SHA384加密
        string result = Convert.ToBase64String(crypto);//把加密後的字串從Byte[]轉為字串
        return result;
    }
}