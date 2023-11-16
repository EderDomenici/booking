function validateCpf(cpf){
    cpf = cpf.replace(/[.-]/g, '')

    if(cpf.length != 11 || cpf == '00000000000'){
        throw new Error('CPF inválido');
    }
    sum = 0
    count = 10
    cpfAux = cpf.substring(0, 9)
    //Valida primeiro digito
    for(let i = 0; i < cpfAux.length; i++){
        sum += count * parseInt(cpfAux[i])
        count--
    }

    firstDigit = 11 - (sum % 11)

    if(firstDigit > 9){
        firstDigit = 0
    }

    if(firstDigit != parseInt(cpf[9])){
        throw new Error('CPF inválido');
    }

    sum = 0
    count = 11
    cpfAux += firstDigit

    for(let i = 0; i < cpfAux.length; i++){
        sum += count * parseInt(cpfAux[i])
        count--
    }

    secondDigit = 11 - (sum % 11)

    if(secondDigit > 9){
        secondDigit = 0
    }

    if(secondDigit != parseInt(cpf[10])){
        return false
    }

    cpfAux += secondDigit

    if(cpf == cpfAux){
        return true
    }

}

module.exports = validateCpf;

