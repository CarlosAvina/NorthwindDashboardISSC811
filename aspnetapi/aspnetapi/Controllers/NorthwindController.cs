using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace aspnetapi.Controllers
{
    public class NorthwindController : Controller
    {
        public ActionResult Index()
        {
            return View ();
        }
    }
}
