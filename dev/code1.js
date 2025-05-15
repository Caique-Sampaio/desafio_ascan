function calculadora(operacao, num1, num2) {
    switch (operacao) {
        case 'somar':
            return num1 + num2;
        case 'subtrair':
            return num1 - num2;
        case 'multiplicar':
            return num1 * num2;
        case 'dividir':
            if (num2 === 0) {
                return 'Erro: divisão por zero';
            }
            return num1 / num2;
        default:
            return 'Operação inválida';
    }
}

// Exemplos de uso:
console.log(calculadora('somar', 5, 3)); // 8
console.log(calculadora('subtrair', 20, 3)); // 2
console.log(calculadora('multiplicar', 5, 3)); // 15
console.log(calculadora('dividir', 10, 2)); // Erro: divisão por zero