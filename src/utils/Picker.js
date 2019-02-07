const sexo = ['Masculino', 'Feminino'];
const sexoAndroid = [
  { label: 'Selecione', value: 0 },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
];

const skinColor = [
  'Branca',
  'Preta',
  'Parda',
  'Amarela',
  'Indígena',
  'Sem Declaração',
];
const skinColorAndroid = ['Selecione', ...skinColor];

const estadoCivil = [
  'SOLTEIRO(A)',
  'CASADO(A)',
  'VIÚVO(A)',
  'DIVORCIADO(A)',
  'SEPARADO(A)',
];
const estadoCivilAndroid = ['Selecione', ...estadoCivil];

const conhecimentoFinanceiro = ['BÁSICO', 'INTERMEDIÁRIO', 'AVANÇADO'];

const conhecimentoFinanceiroAndroid = ['Selecione', ...conhecimentoFinanceiro];

const envioCorrespondencia = [
  { label: 'ENDEREÇO RESIDENCIAL', value: 'ENDERECO_RESIDENCIAL' },
  {
    label: 'ENDEREÇO COMERCIAL',
    value: 'ENDERECO_COMERCIAL_OU_OPCIONAL',
  },
];

const envioCorrespondenciaAndroid = [
  { label: 'Selecione', value: 'Selecione' },
  ...envioCorrespondencia,
];

const segmentoInvestidor = ['PRIVATE', 'VAREJO ALTA RENDA', 'VAREJO', 'OUTROS'];

const segmentoInvestidorAndroid = ['Selecione', ...segmentoInvestidor];

const publicFunction = [
  { codigo: 1, descricao: 'Presidente da República' },
  { codigo: 4, descricao: 'Deputado Federal' },
  { codigo: 5, descricao: ' Diretor de Autarquia Federal' },
  { codigo: 9, descricao: 'Diretor de Empresa Pública Federal' },
  { codigo: 12, descricao: 'Diretor de Fundação Pública Federal' },
  { codigo: 18, descricao: 'Diretor de Sociedade de Economia Mista Federal' },
  { codigo: 32, descricao: 'Governador' },
  { codigo: 53, descricao: 'Membro de Instituição Financeira Pública' },
  { codigo: 21, descricao: 'Membro de Tribunal Superior' },
  { codigo: 19, descricao: 'Membro do Conselho Nacional de Justiça' },
  {
    codigo: 22,
    descricao: 'Membro do Conselho Nacional do Ministério Público',
  },
  { codigo: 20, descricao: 'Membro do Supremo Tribunal Federal' },
  { codigo: 29, descricao: 'Membro do Tribunal de Contas da União' },
  { codigo: 63, descricao: 'Membro do Tribunal de Contas de Estado' },
  { codigo: 72, descricao: 'Membro do Tribunal Regional Federal' },
  { codigo: 73, descricao: 'Membro do Tribunal Regional do Trabalho' },
  { codigo: 74, descricao: 'Membro do Tribunal Regional Eleitoral' },
  {
    codigo: 75,
    descricao: 'Membro do Conselho Superior da Justiça do Trabalho',
  },
  { codigo: 76, descricao: 'Membro do Conselho da Justiça Federal' },
  {
    codigo: 77,
    descricao: 'Membro da Alta Administração de uma Organização Internacional',
  },
  { codigo: 5, descricao: 'Ministro de Estado' },
  { codigo: 40, descricao: 'Prefeito de Capital de Estado' },
  {
    codigo: 35,
    descricao: 'Presidente de Assembléia Legislativa/Câmara Distrital',
  },
  { codigo: 7, descricao: 'Presidente de Autarquia Federal' },
  {
    codigo: 42,
    descricao: 'Presidente de Câmara Municipal de Capital de Estado',
  },
  {
    codigo: 38,
    descricao: 'Presidente de Conselho de Contas de Estado/Distrito Federal',
  },
  { codigo: 39, descricao: ' Presidente de Conselho de Contas de municípios' },
  { codigo: 13, descricao: ' Presidente de Empresa Pública Federal' },
  { codigo: 10, descricao: ' Presidente de Fundação Pública Federal' },
  {
    codigo: 16,
    descricao: ' Presidente de Sociedade de Economia Mista Federal',
  },
  {
    codigo: 36,
    descricao: ' Presidente de Tribunal de Contas de Estado/Distrito Federal',
  },
  { codigo: 37, descricao: ' Presidente de Tribunal de Contas de Municípios' },
  { codigo: 34, descricao: ' Presidente de Tribunal de Justiça' },
  { codigo: 45, descricao: ' Procurador Geral Eleitoral' },
  { codigo: 27, descricao: ' Procurador-Geral da Justiça Militar' },
  {
    codigo: 28,
    descricao: ' Procurador-Geral de Justiça de Estado/Distrito Federal',
  },
  {
    codigo: 30,
    descricao: ' Procurador-Geral do Ministério Público junto ao TCU',
  },
  { codigo: 26, descricao: ' Procurador-Geral do Trabalho' },
  { codigo: 6, descricao: '  Secretário Especial' },
  { codigo: 3, descricao: '  Senador' },
  { codigo: 25, descricao: ' SubProcurador-Geral da República' },
  { codigo: 33, descricao: ' Vice-Governador' },
  { codigo: 41, descricao: ' Vice-Prefeito de Capital de Estado' },
  { codigo: 2, descricao: '  Vice-Presidente da República' },
  { codigo: 8, descricao: '  Vice-Presidente de Autarquia Federal' },
  {
    codigo: 43,
    descricao: ' Vice-Presidente de Câmara Municipal de Capital de Estado',
  },
  { codigo: 14, descricao: ' Vice-Presidente de Empresa Pública Federal' },
  { codigo: 11, descricao: ' Vice-Presidente de Fundação Pública Federal' },
  {
    codigo: 17,
    descricao: ' Vice-Presidente de Sociedade de Economia Mista Federal',
  },
  { codigo: 24, descricao: ' Vice-Procurador-Geral da República' },
  { codigo: 47, descricao: ' Vice-Procurador-Geral de Justiça' },
  { codigo: 48, descricao: ' Vice-Procurador-Geral Eleitoral' },
];

const publicFunctionAndroid = [
  { codigo: 0, descricao: 'Selecione' },
  ...publicFunction,
];

const relatedCode = [
  { codigo: 1, descricao: 'Pai e Mãe' },
  { codigo: 2, descricao: 'Filhos(as)' },
  { codigo: 3, descricao: 'Cônjuge (esposa ou esposo)' },
  { codigo: 4, descricao: 'Companheiro(a)' },
  { codigo: 5, descricao: 'Enteado(a)' },
  { codigo: 6, descricao: 'Representante ou procurador de PEP Primário' },
  {
    codigo: 7,
    descricao: 'Assessor ou Assistente Parlamentar de PEP Primário',
  },
  {
    codigo: 8,
    descricao: 'Assessor ou Assistente Técnico de PEP Primário',
  },
  {
    codigo: 9,
    descricao: 'Assessor ou Assistente Jurídico de PEP Primário',
  },
  { codigo: 10, descricao: 'Sócios' },
  { codigo: 11, descricao: 'Profssional' },
  { codigo: 12, descricao: 'Comercial' },
  { codigo: 13, descricao: 'Parentes não constantes do quadro anterior' },
];

const relatedCodeAndroid = [
  { codigo: 0, descricao: 'Selecione' },
  ...relatedCode,
];

const idType = [ 'CNH', 'RG', 'RNE' ];
const idTypeAndroid = [ 'Selecione', ...idType ]

export {
  sexo,
  sexoAndroid,
  skinColor,
  skinColorAndroid,
  estadoCivil,
  estadoCivilAndroid,
  conhecimentoFinanceiro,
  conhecimentoFinanceiroAndroid,
  envioCorrespondencia,
  envioCorrespondenciaAndroid,
  segmentoInvestidor,
  segmentoInvestidorAndroid,
  publicFunction,
  publicFunctionAndroid,
  relatedCode,
  relatedCodeAndroid,
  idType,
  idTypeAndroid
};
