using FluentValidation;
using TestInvent.Models;
using TestInvent.Repositories;

namespace TestInvent.Service
{
    public class EquipamentoEletronicoService

    {
        private readonly IRepository _repository;
        private readonly IValidator<EquipamentoEletronicoModel> _validator;

        public EquipamentoEletronicoService(
            IRepository repository,
            IValidator<EquipamentoEletronicoModel> validator
            )
        {
            _repository = repository;
            _validator = validator;
        }

        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string filtro)
        {
            return _repository.BuscarTodos(filtro);
        }

        public EquipamentoEletronicoModel BuscarPorId(string id)
        {
            return _repository.BuscarPorId(id);
        }

        public void Adicionar(EquipamentoEletronicoModel equipamentoEletronico) 
        {
            _validator.ValidateAndThrow(equipamentoEletronico); 
            _repository.Adicionar(equipamentoEletronico); 
        }

        public void Atualizar(string id, EquipamentoEletronicoModel equipamentoEletronico) 
        {
            _validator.ValidateAndThrow(equipamentoEletronico);
            _repository.Atualizar(id, equipamentoEletronico);
        }

        public void Deletar(string id) 
        {
            _repository.Deletar( id );
        }
    }
}
