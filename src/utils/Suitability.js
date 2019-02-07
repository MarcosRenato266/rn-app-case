const investmentTime = [
  { title: 'Até 1 ano', value: 'a' },
  { title: 'De 1 a 5 anos', value: 'b' },
  { title: 'Mais de 5 anos', value: 'c' },
];

const resourcesNecessity = [
  { title: 'Precisarei deste dinheiro como complemento de renda', value: 'a' },
  {
    title:
      'Eventualmente posso precisar utilizar uma parte dos recursos investidos',
    value: 'b',
  },
  { title: 'Não tenho necessidade imediata deste dinheiro', value: 'c' },
];

const investmentParcelNeedsLiquidity = [
  { title: '81% a 100%', value: 'a' },
  { title: '51% a 80%', value: 'b' },
  { title: '31% a 50%', value: 'c' },
  { title: '0% a 30%', value: 'd' },
];

const investmentMainGoal = [
  { title: 'Preservação do patrimônio assumindo um menor risco', value: 'a' },
  {
    title: 'Uma combinação entre preservação do patrimônio e sua valorização',
    value: 'b',
  },
  {
    title: 'Maximização do potencial de ganho assumindo um maior risco',
    value: 'c',
  },
];

const tenPercentLossAction = [
  { title: 'Venderia toda a posição', value: 'a' },
  { title: 'Manteria a posição', value: 'b' },
  { title: 'Aumentaria a posição', value: 'c' },
];

const education = [
  { title: 'Ensino Fundamental', value: 'a' },
  { title: 'Ensino Médio', value: 'b' },
  { title: 'Ensino Superior', value: 'c' },
  { title: 'Pós-Graduação,Mestrado,Doutorado', value: 'd' },
];

const investmentExperience = [
  { title: 'Não possuo experiência', value: 'a' },
  {
    title:
      'Tenho experiência com investimentos com pouca probabilidade de perda.',
    value: 'b',
  },
  {
    title:
      'Sinto-me seguro em tomar minhas decisões de investimento e estou apto a entender e ponderar os riscos associados.',
    value: 'c',
  },
];

const investmentGroup = [
  { title: 'Grupo (I)', value: 'a' },
  { title: 'Grupos (I) e (II)', value: 'b' },
  { title: 'Grupos (I), (II) e (III)', value: 'c' },
  { title: 'Grupos (I), (II), (III) e (IV)', value: 'd' },
  { title: 'Nenhum destes', value: 'e' },
];

export {
  investmentTime,
  resourcesNecessity,
  investmentParcelNeedsLiquidity,
  investmentMainGoal,
  tenPercentLossAction,
  education,
  investmentExperience,
  investmentGroup,
};
