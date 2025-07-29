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

        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome)
        {
            var equipamentos = _repository.BuscarTodos(nome);
            return equipamentos;
        }

        public EquipamentoEletronicoModel BuscarPorId(string id)
        {
            var equipamento = _repository.BuscarPorId(id);
            return equipamento;
        }

        public void Adicionar(EquipamentoEletronicoModel equipamento) 
        {
            equipamento.DataDeInclusao = DateTime.Now.ToShortDateString();
            _validator.ValidateAndThrow( equipamento ); 
            _repository.Adicionar( equipamento ); 

        }

        public void Atualizar(string id, EquipamentoEletronicoModel equipamento) 
        {
            _validator.ValidateAndThrow(equipamento);
            _repository.Atualizar( id, equipamento );
        }

        public void Deletar(string id) 
        {
   
            _repository.Deletar( id );
        }


    }
}
