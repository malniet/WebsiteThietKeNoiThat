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
    public class BillController : ControllerBase
    {
         private readonly TSContext _context;
         
        public BillController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> Get()
        {
            return await _context.Bills.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetE(int id)
        {
            var todoItem = await _context.Bills.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<Bill>> Post(Bill item)
        {
            _context.Bills.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Bill item)
        {
            
            var todoItem = await _context.Bills.FirstOrDefaultAsync(x => x.id.Equals(id));
            if (todoItem == null)
            {
                return NotFound();
            }
           if (id != item.id)
            {
                return BadRequest();
            }
            todoItem.ngaytao = item.ngaytao;
            todoItem.sdt =  item.sdt;
            todoItem.diachi = item.diachi;
            todoItem.hovaten = item.hovaten;
            todoItem.tong = item.tong;
            await _context.SaveChangesAsync();
            return Ok();
            
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bill>> Delete(int id)
        {
            var todoItem = await _context.Bills.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }
    }
}