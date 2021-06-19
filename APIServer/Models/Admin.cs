using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class Admin
    {
        [Key]
        public string taikhoan { get; set; }
        public string matkhau { get; set; }

        public string hovaten { get; set; }
    }
}
