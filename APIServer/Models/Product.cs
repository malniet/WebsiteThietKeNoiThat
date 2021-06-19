using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }
        public string tensanpham { get; set; }
        public int dongia { get; set; }
        public int loaisanpham { get; set; }
        public string hinhanh { get; set; }
        public int hienthi {get;set;}
        public int soluong {get;set;}
    }
}
