using Microsoft.AnalysisServices.AdomdClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API_REST_Cubo.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    [RoutePrefix("v1/analysis/northwind")]
    public class NorthwindController : ApiController
    {
        [HttpGet]
        [Route("testing")]
        public HttpResponseMessage Testing()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Funciona!");
        }

        [HttpGet]
        [Route("clients")]
        public HttpResponseMessage getClients()
        {
            string[] dimensions = new string[] { "[Dim Cliente].[Dim Cliente Nombre]", "[Dim Tiempo].[Dim Tiempo Año]", "[Dim Tiempo].[Dim Tiempo Mes]" };

            string WITH = @"
                WITH 
                SET [OrderDimension] AS 
                NONEMPTY(
                    ORDER(
		                {0}.CHILDREN,
		                {0}.CURRENTMEMBER.MEMBER_NAME, 
                        ASC
                    )
                )
            ";

            string COLUMNS = @"
                NON EMPTY
                {
                    [Measures].[Fact Ventas Netas]
                }
                ON COLUMNS,    
            ";

            string ROWS = @"
                NON EMPTY
                {
                    [OrderDimension]
                }
                ON ROWS
            ";

            string CUBO_NAME = "[DWH Northwind]";
            

            //Debug.Write(MDX_QUERY);

            List<string> clients = new List<string>();
            List<string> employees = new List<string>();
            List<string> years = new List<string>();

            dynamic result = new
            {
                clientes = clients,
                empleados = employees,
                anios = years
            };

            for (int i = 0; i < dimensions.Length; i++)
            {
                using (AdomdConnection cnn = new AdomdConnection(ConfigurationManager.ConnectionStrings["CuboNorthwind"].ConnectionString))
                {
                    cnn.Open();
                    string NEW_WITH = string.Format(WITH, dimensions[i]);
                    string MDX_QUERY = NEW_WITH + @"SELECT " + COLUMNS + ROWS + " FROM " + CUBO_NAME;
                    using (AdomdCommand cmd = new AdomdCommand(MDX_QUERY, cnn))
                    {
                        //cmd.Parameters.Add("Dimension", dimensions[i]);

                        Console.WriteLine(MDX_QUERY);
                        using (AdomdDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                        {
                            while (dr.Read())
                            {
                                switch (i)
                                {
                                    case 0:
                                        clients.Add(dr.GetString(0));
                                        break;
                                    case 1:
                                        years.Add(dr.GetString(0));
                                        break;
                                    case 2:
                                        employees.Add(dr.GetString(0));
                                        break;
                                }
                            }
                            dr.Close();
                        }
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, (object)result);
        }
    }
}