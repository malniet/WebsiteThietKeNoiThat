using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class User
    {
        [Key]
        public string taikhoan { get; set; }
        public string matkhau { get; set; }

        public string hovaten { get; set; }

        public string diachi { get; set; }  
        public string sdt { get; set; }
        public string email { get; set; }
    }
}
