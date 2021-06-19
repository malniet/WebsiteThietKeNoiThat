using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class Bill
    {
        [Key]
        public int id { get; set; }
        public string ngaytao { get; set; }
        public int tong { get; set; }
        public string hovaten { get; set; }
        public string diachi { get; set; }
        public string sdt { get; set; }
    }
}
