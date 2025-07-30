using FluentValidation;
using TestInvent.DTOs;
using TestInvent.Models;
using TestInvent.Repositories;

namespace TestInvent.Service
{
    public class ServiceEquipamentoEletronico
    {
        private IRepository _repository;
        private IValidator<EquipamentoEletronicoModel> _validator;
        public ServiceEquipamentoEletronico( RavenDbContext context, IValidator<EquipamentoEletronicoModel> validator)
        {
            _repository = new RavenRepository();
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
            if (equipamento == null)
            {
                throw new KeyNotFoundException($"Equipamento com ID {id} não encontrado.");
            }
            return equipamento;
        }

        public void Adicionar(CreateDTO createDTO) 
        {
            var equipamento = new EquipamentoEletronicoModel
            {

                Nome = createDTO.Nome,

                Tipo = createDTO.Tipo,

                QuantidadeEmEstoque = createDTO.QuantidadeEmEstoque,

                DataDeInclusao = createDTO.DataDeInclusao,

            };
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
