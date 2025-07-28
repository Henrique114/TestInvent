using FluentValidation;
using TestInvent.Models;
using TestInvent.Repositories;

namespace TestInvent.Service
{
    public class ServiceEquipamentoEletronico
    {
        private IRepository<EquipamentoEletronicoModel> _repository;
        private IValidator<EquipamentoEletronicoModel> _validator;
        public ServiceEquipamentoEletronico( RavenDbContext context, IValidator<EquipamentoEletronicoModel> validator)
        {
            _repository = new RavenRepository<EquipamentoEletronicoModel>();
            _validator = validator;
        }

        public IEnumerable<EquipamentoEletronicoModel> GetAll()
        {
            var equipamentos = _repository.GetAll();
            return equipamentos;
        }

        public EquipamentoEletronicoModel GetById(string id)
        {
            var equipamento = _repository.GetById(id);
            return equipamento;
        }

        public IEnumerable<EquipamentoEletronicoModel> LookingFor(string nome)
        {
            var equipamentos = _repository.LookingFor(nome);
            return equipamentos;
        }



        public void Add(EquipamentoEletronicoModel equipamento) 
        {
            equipamento.DataDeInclusao = DateTime.Now.ToShortDateString();
            _validator.ValidateAndThrow( equipamento ); 
            _repository.Add( equipamento ); 

        }

        public void Update(string id, EquipamentoEletronicoModel equipamento) 
        {
            _validator.ValidateAndThrow(equipamento);
            _repository.Update( id, equipamento );
        }

        public void Delete(string id) 
        {
   
            _repository.Delete( id );
        }


    }
}
