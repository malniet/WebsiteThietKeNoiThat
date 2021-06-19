using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace APIServer.Models
{
    public class BillDetail
    {
        [Key]
        [Column(Order = 1)]
        public int idBill { get; set; }
        [Key]
        [Column(Order = 2)]
        public int idP { get; set; }
        public int soluong { get; set; }
        public int dongia { get; set; }
        public string tensanpham { get; set; }
    }
}
