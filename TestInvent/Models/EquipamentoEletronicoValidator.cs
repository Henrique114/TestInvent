using FluentValidation;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoValidator : AbstractValidator<EquipamentoEletronicoModel>
    {
        public EquipamentoEletronicoValidator() 
        {
            RuleFor(equipamento => equipamento.Nome).NotNull().MinimumLength(3).MaximumLength(50);
            RuleFor(equipamento => equipamento.Tipo).NotNull().MinimumLength(3).MaximumLength(50);
            RuleFor(equipamento => equipamento.QuantidadeEmEstoque).NotNull();
            RuleFor(equipamento => equipamento.DataDeInclusao).NotNull();
        }
    }
}
