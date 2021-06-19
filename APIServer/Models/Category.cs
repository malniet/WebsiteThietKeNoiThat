using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class Category
    {
        [Key]
        public int id { get; set; }
        public string tendanhmuc { get; set; }

    }
}
