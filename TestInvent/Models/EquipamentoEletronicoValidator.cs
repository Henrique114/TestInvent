using FluentValidation;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoValidator : AbstractValidator<EquipamentoEletronicoModel>
    {
        public EquipamentoEletronicoValidator() 
        {
            RuleFor(equipamento => equipamento.Nome).NotNull().MaximumLength(25);
            RuleFor(equipamento => equipamento.Tipo).NotNull().MaximumLength(25);
            RuleFor(equipamento => equipamento.QuantidadeEmEstoque).NotNull();
            RuleFor(equipamento => equipamento.DataDeInclusao).NotNull();
        }
    }
}
