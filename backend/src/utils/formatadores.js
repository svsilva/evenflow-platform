const { isCPF, isCNPJ } = require('validation-br');
const moment = require('moment');

//Formatar e validar CPF/CNPJ
const formatarDocumento = (documento, tipo) => {
    if(!documento) return null;

    const docLimpo = documento.replace(/\D/g, '');

    if(tipo == 'cpf'){
        if(!isCPF(docLimpo)) throw new Error('CPF inválido');
        return docLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    if(tipo == 'cnpj'){
        if (!isCNPJ(docLimpo)) throw new Error('CNPJ inválido');
        return docLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    throw new Error('Tipo de documento inválido');
};

//Formatar e validar CEP
const formatarCEP = (cep) => {
    if(!cep) return null;

    const cepLimpo = cep.replace(/\D/g, '');
    if(cepLimpo.length !== 8) throw new Error('CEP deve conter 8 dígitos');

    return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
};

//Formatar e validar datas
const formatarData = (data, formatoEntrada = ['DD/MM/YYYY', 'YYYY-MM-DD']) => {
    if(!data) return null;

    const dataMoment = moment(data, formatoEntrada, true);
    if(!dataMoment.isValid()) throw new Error('Data inválida');

    return{
        iso: dataMoment.format('YYYY-MM-DD'),
        br: dataMoment.format('DD/MM/YYYY'),
        moment: dataMoment
    };
};

module.exports = {
    formatarDocumento,
    formatarCEP,
    formatarData
}