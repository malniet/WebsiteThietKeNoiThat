using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIServer.Models;

namespace APIServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
         private readonly TSContext _context;
         
        public AdminController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Get()
        {
            return await _context.Admins.ToListAsync();
        }
        [HttpGet("{taikhoan}")]
        public async Task<ActionResult<Admin>> GetE(string taikhoan)
        {
            var todoItem = await _context.Admins.FindAsync(taikhoan);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<Admin>> Post(Admin item)
        {
            _context.Admins.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        // PUT: api/TodoItems/5
        [HttpPut("{taikhoan}")]
        public async Task<IActionResult> Put(string taikhoan, Admin item)
        {
            
            var todoItem = await _context.Admins.FirstOrDefaultAsync(x => x.taikhoan.Equals(taikhoan));
            if (todoItem == null)
            {
                return NotFound();
            }
           if (taikhoan != item.taikhoan)
            {
                return BadRequest();
            }
            todoItem.hovaten = item.hovaten;
            await _context.SaveChangesAsync();
            return Ok();
            
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{Adminname}")]
        public async Task<ActionResult<Admin>> Delete(string Adminname)
        {
            var todoItem = await _context.Admins.FindAsync(Adminname);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Admins.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
        [Route("dangnhap")]
        [HttpPost]
        public async Task<ActionResult<Admin>> Login(Admin item)
        {
            Admin todoItem = await _context.Admins.Where(x => x.taikhoan.Equals(item.taikhoan) && x.matkhau.Equals(item.matkhau)).FirstOrDefaultAsync();
            if (todoItem == null)
            {
                return NotFound();
            }
            return todoItem;
        }
        [Route("doimatkhau/{matkhaumoi}")]
        [HttpPost]
        public async Task<ActionResult<Admin>> dmk(Admin item, string mkm)
        {
            var todoItem1 = await _context.Admins.FindAsync(item.taikhoan);
            if (todoItem1 == null)
            {
                return NotFound();
            }
            var todoItem = await _context.Admins.FirstOrDefaultAsync(x => x.taikhoan.Equals(item.taikhoan) &&  x.matkhau.Equals(item.matkhau));
            if (todoItem == null)
            {
                return NotFound();
            }
            todoItem.matkhau =  item.matkhau;
            await _context.SaveChangesAsync();
            return todoItem;
        }
    }
}