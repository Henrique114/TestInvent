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
            return _repository.BuscarTodos(nome);
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

        public void Atualizar(string id, UpdateDTO updateDTO) 
        {
            var existing = BuscarPorId(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"Equipamento com ID {id} não encontrado.");
            }

            existing.Nome = updateDTO.Nome;

            existing.Tipo = updateDTO.Tipo;

            existing.QuantidadeEmEstoque = updateDTO.QuantidadeEmEstoque;

            _validator.ValidateAndThrow(existing);
            _repository.Atualizar( id, existing);
        }

        public void Deletar(string id) 
        {
            var existing = BuscarPorId(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"Equipamento com ID {id} não encontrado.");
            }
            _repository.Deletar( id );
        }


    }
}
