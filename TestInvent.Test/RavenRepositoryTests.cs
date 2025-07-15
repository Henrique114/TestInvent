using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using Raven.TestDriver;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TestInvent.Models;
using Xunit;

namespace TestInvent.Test
{
    public class RavenRepositoryTests : RavenTestDriver
    {
        private class EquipamentoEletronico 
        {
            public string? Id { get; set; }
            public string? Nome { get; set; }
            public string? Tipo { get; set; }
            public int? QuantidadeEmEstoque { get; set; }
            public DateTime DataDeInclusao { get; set; }
            public bool TemEmEstoque { get { return QuantidadeEmEstoque > 0; } }
        }



        [Fact]
        public void RepositoryOperations_ShouldWorkCorrectly()
        {
            //// Configuração do documento
            //using (var store = GetDocumentStore())
            //{
            //    // ADD
            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = new EquipamentoEletronicoModel { Id = "1", Nome = "Asus", Tipo = "Notebook", QuantidadeEmEstoque = 10, DataDeInclusao = new DateTime() };
            //        session.Store(equipamento);
            //        session.SaveChanges();
            //    }

            //    // GETBYID
            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = session.Query<EquipamentoEletronicoModel>().FirstOrDefault(u => u.Id == "1");
            //        Assert.NotNull(equipamento);
            //        Assert.Equal(10, equipamento.QuantidadeEmEstoque);
            //    }

            //    // UPDATE
            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = session.Query<EquipamentoEletronicoModel>().FirstOrDefault(u => u.Nome == "Asus");
            //        Assert.NotNull(equipamento);
            //        equipamento.QuantidadeEmEstoque = 35;
            //        session.SaveChanges();
            //    }

            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = session.Query<EquipamentoEletronicoModel>().FirstOrDefault(u => u.Nome == "Asus");
            //        Assert.NotNull(equipamento);
            //        Assert.Equal(35, equipamento.QuantidadeEmEstoque);
            //    }

            //    // DELETE
            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = session.Query<EquipamentoEletronicoModel>().FirstOrDefault(u => u.Nome == "Asus");
            //        Assert.NotNull(equipamento);
            //        session.Delete(equipamento);
            //        session.SaveChanges();
            //    }

            //    using (var session = store.OpenSession())
            //    {
            //        var equipamento = session.Query<EquipamentoEletronicoModel>().FirstOrDefault(u => u.Nome == "Asus");
            //        Assert.Null(equipamento);
            //    }
            //}

            ////Erro Na Licença, license.json não encontrado. Configuration: License Options

        }

    }
}
