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
    public class BilldetailController : ControllerBase
    {
         private readonly TSContext _context;
         
        public BilldetailController(TSContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BillDetail>>> Get()
        {
            return await _context.BillDetails.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BillDetail>> GetE(int id)
        {
            var todoItem = await _context.BillDetails.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPost]
        public async Task<ActionResult<BillDetail>> Post(BillDetail item)
        {
            _context.BillDetails.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
    }
}