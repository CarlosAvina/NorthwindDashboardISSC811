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
            List<string> months = new List<string>();
            List<string> years = new List<string>();

            dynamic result = new
            {
                clientes = clients,
                meses = months,
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
                                        months.Add(dr.GetString(0));
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

        [HttpPost]
        [Route("GetDataPieByDimension/{dim}/{order}")]
        public HttpResponseMessage GetDataPieByDimension(string dim, string order, [FromBody] dynamic values)
        {
            string WITH = @"
            WITH 
                SET [OrderDimension] AS 
                NONEMPTY(
                    ORDER(
			        STRTOSET(@Dimension),
                    [Measures].[Fact Ventas Netas], DESC
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
                    ([OrderDimension], STRTOSET(@Anios), STRTOSET(@Meses))
                }
                ON ROWS
            ";

            string CUBO_NAME = "[DWH Northwind]";
            //WITH = string.Format(WITH, dim);
            string MDX_QUERY = WITH + @"SELECT " + COLUMNS + ROWS + " FROM " + CUBO_NAME;

            Debug.Write(MDX_QUERY);

            List<string> dimension = new List<string>();
            List<string> anios = new List<string>();
            List<string> meses = new List<string>();
            List<decimal> ventas = new List<decimal>();
            List<dynamic> lstTabla = new List<dynamic>();

            dynamic result = new
            {
                datosDimension = dimension,
                datosAnios = anios,
                datosMeses = meses,
                datosVenta = ventas,
                datosTabla = lstTabla
            };

            string valoresDimension = string.Empty;
            Console.WriteLine(values);
            foreach (var item in values.clients)
            {
                valoresDimension += "{0}.[" + item + "],";
            }
            valoresDimension = valoresDimension.TrimEnd(',');
            valoresDimension = string.Format(valoresDimension, dim);
            valoresDimension = @"{" + valoresDimension + "}";

            string valoresAnios = string.Empty;
            foreach(var item in values.years)
            {
                valoresAnios += "[Dim Tiempo].[Dim Tiempo Año].[" + item + "],";
            }
            valoresAnios = valoresAnios.TrimEnd(',');
            valoresAnios = @"{" + valoresAnios + "}";

            string valoresMeses = string.Empty;
            foreach (var item in values.months)
            {
                valoresMeses += "[Dim Tiempo].[Dim Tiempo Mes].[" + item + "],";
            }
            valoresMeses = valoresMeses.TrimEnd(',');
            valoresMeses = @"{" + valoresMeses + "}";

            using (AdomdConnection cnn = new AdomdConnection(ConfigurationManager.ConnectionStrings["CuboNorthwind"].ConnectionString))
            {
                cnn.Open();
                using (AdomdCommand cmd = new AdomdCommand(MDX_QUERY, cnn))
                {
                    cmd.Parameters.Add("Dimension", valoresDimension);
                    cmd.Parameters.Add("Anios", valoresAnios);
                    cmd.Parameters.Add("Meses", valoresMeses);
                    using (AdomdDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        while (dr.Read())
                        {
                            dimension.Add(dr.GetString(0));
                            anios.Add(dr.GetString(1));
                            meses.Add(dr.GetString(2));
                            ventas.Add(Math.Round(dr.GetDecimal(3)));

                            dynamic objTabla = new
                            {
                                descripcion = dr.GetString(0),
                                años = dr.GetString(1),
                                meses = dr.GetString(2),
                                valor = Math.Round(dr.GetDecimal(3))
                            };

                            lstTabla.Add(objTabla);
                        }
                        dr.Close();
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, (object)result);
        }
    }
}