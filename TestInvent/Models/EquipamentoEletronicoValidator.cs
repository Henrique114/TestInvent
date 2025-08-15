using FluentValidation;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoValidator : AbstractValidator<EquipamentoEletronicoModel>
    {
        public EquipamentoEletronicoValidator() 
        {
            RuleFor(equipamento => equipamento.Nome).NotNull();
            RuleFor(equipamento => equipamento.Tipo).NotNull();
            RuleFor(equipamento => equipamento.QuantidadeEmEstoque).NotNull();
            RuleFor(equipamento => equipamento.DataDeInclusao).NotNull();
        }
    }
}
