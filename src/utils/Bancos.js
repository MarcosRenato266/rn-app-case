const bancos = [
  {
    codigo: '654',
    nome: 'Banco A.J.Renner S.A.',
    site: 'http://www.bancorenner.com.br',
  },
  {
    codigo: '246',
    nome: 'Banco ABC Brasil S.A.',
    site: 'http://www.abcbrasil.com.br',
  },
  {
    codigo: '075',
    nome: 'Banco ABN AMRO S.A.',
    site: 'http://www.bancocr2.com.br',
  },
  {
    codigo: '025',
    nome: 'Banco Alfa S.A.',
    site: 'http://www.bancoalfa.com.br',
  },
  {
    codigo: '641',
    nome: 'Banco Alvorada S.A.',
    site: '',
  },
  {
    codigo: '213',
    nome: 'Banco Arbi S.A.',
    site: 'http://www.arbi.com.br',
  },
  {
    codigo: '029',
    nome: 'Banco Banerj S.A.',
    site: 'http://www.banerj.com.br',
  },
  {
    codigo: '000',
    nome: 'Banco Bankpar S.A.',
    site: 'http://www.aexp.com',
  },
  {
    codigo: '740',
    nome: 'Banco Barclays S.A.',
    site: 'http://www.barclays.com',
  },
  {
    codigo: '107',
    nome: 'Banco BBM S.A.',
    site: 'http://www.bbmbank.com.br',
  },
  {
    codigo: '031',
    nome: 'Banco Beg S.A.',
    site: 'http://www.itau.com.br',
  },
  {
    codigo: '122-8',
    nome: 'Banco BERJ S.A.',
    site: '',
  },
  {
    codigo: '739',
    nome: 'Banco BGN S.A.',
    site: 'http://www.bgn.com.br',
  },
  {
    codigo: '096',
    nome: 'Banco BM&FBOVESPA de Serviços de Liquidação e Custódia S.A',
    site: 'http://www.bmf.com.br',
  },
  {
    codigo: '318',
    nome: 'Banco BMG S.A.',
    site: 'http://www.bancobmg.com.br',
  },
  {
    codigo: '752',
    nome: 'Banco BNP Paribas Brasil S.A.',
    site: 'http://www.bnpparibas.com.br',
  },
  {
    codigo: '248',
    nome: 'Banco Boavista Interatlântico S.A.',
    site: '',
  },
  {
    codigo: '218',
    nome: 'Banco Bonsucesso S.A.',
    site: 'http://www.bancobonsucesso.com.br',
  },
  {
    codigo: '065',
    nome: 'Banco Bracce S.A.',
    site: 'http://www.bancobracce.com.br',
  },
  {
    codigo: '036',
    nome: 'Banco Bradesco BBI S.A.',
    site: '',
  },
  {
    codigo: '204',
    nome: 'Banco Bradesco Cartões S.A.',
    site: 'http://www.iamex.com.br',
  },
  {
    codigo: '237',
    nome: 'Banco Bradesco S.A.',
    site: 'http://www.bradesco.com.br',
  },
  {
    codigo: '225',
    nome: 'Banco Brascan  S.A.',
    site: 'http://www.bancobrascan.com.br',
  },
  {
    codigo: 'M15',
    nome: 'Banco BRJ S.A.',
    site: 'http://www.brjbank.com.br',
  },
  {
    codigo: '208',
    nome: 'Banco BTG Pactual S.A.',
    site: 'http://www.pactual.com.br',
  },
  {
    codigo: '044',
    nome: 'Banco BVA S.A.',
    site: 'http://www.bancobva.com.br',
  },
  {
    codigo: '263',
    nome: 'Banco Cacique S.A.',
    site: 'http://www.bancocacique.com.br',
  },
  {
    codigo: '473',
    nome: 'Banco Caixa Geral - Brasil S.A.',
    site: 'http://www.bcgbrasil.com.br',
  },
  {
    codigo: '412',
    nome: 'Banco Capital S.A.',
    site: 'http://www.bancocapital.com.br',
  },
  {
    codigo: '040',
    nome: 'Banco Cargill S.A.',
    site: 'http://www.bancocargill.com.br',
  },
  {
    codigo: '266',
    nome: 'Banco Cédula S.A.',
    site: 'http://www.bancocedula.com.br',
  },
  {
    codigo: '233',
    nome: 'Banco Cifra S.A.',
    site: 'http://www.bancocifra.com.br',
  },
  {
    codigo: '745',
    nome: 'Banco Citibank S.A.',
    site: 'http://www.citibank.com.br',
  },
  {
    codigo: 'M08',
    nome: 'Banco Citicard S.A.',
    site: 'http://www.credicardbanco.com.br',
  },
  {
    codigo: '241',
    nome: 'Banco Clássico S.A.',
    site: '',
  },
  {
    codigo: 'M19',
    nome: 'Banco CNH Capital S.A.',
    site: 'http://www.bancocnh.com.br',
  },
  {
    codigo: '215',
    nome: 'Banco Comercial e de Investimento Sudameris S.A.',
    site: 'http://www.sudameris.com.br',
  },
  {
    codigo: '095',
    nome: 'Banco Confidence de Câmbio S.A.',
    site: 'http://www.bancoconfidence.com.br',
  },
  {
    codigo: '756',
    nome: 'Banco Cooperativo do Brasil S.A. - BANCOOB',
    site: 'http://www.bancoob.com.br',
  },
  {
    codigo: '748',
    nome: 'Banco Cooperativo Sicredi S.A.',
    site: 'http://www.sicredi.com.br',
  },
  {
    codigo: '721',
    nome: 'Banco Credibel S.A.',
    site: 'http://www.credibel.com.br',
  },
  {
    codigo: '222',
    nome: 'Banco Credit Agricole Brasil S.A.',
    site: 'http://www.calyon.com.br',
  },
  {
    codigo: '505',
    nome: 'Banco Credit Suisse (Brasil) S.A.',
    site: 'http://www.csfb.com',
  },
  {
    codigo: '229',
    nome: 'Banco Cruzeiro do Sul S.A.',
    site: 'http://www.bcsul.com.br',
  },
  {
    codigo: '003',
    nome: 'Banco da Amazônia S.A.',
    site: 'http://www.bancoamazonia.com.br',
  },
  {
    codigo: '083-3',
    nome: 'Banco da China Brasil S.A.',
    site: '',
  },
  {
    codigo: 'M21',
    nome: 'Banco Daimlerchrysler S.A.',
    site: 'http://www.bancodaimlerchrysler.com.br',
  },
  {
    codigo: '707',
    nome: 'Banco Daycoval S.A.',
    site: 'http://www.daycoval.com.br',
  },
  {
    codigo: '300',
    nome: 'Banco de La Nacion Argentina',
    site: 'http://www.bna.com.ar',
  },
  {
    codigo: '495',
    nome: 'Banco de La Provincia de Buenos Aires',
    site: 'http://www.bapro.com.ar',
  },
  {
    codigo: '494',
    nome: 'Banco de La Republica Oriental del Uruguay',
    site: '',
  },
  {
    codigo: 'M06',
    nome: 'Banco de Lage Landen Brasil S.A.',
    site: 'http://www.delagelanden.com',
  },
  {
    codigo: '024',
    nome: 'Banco de Pernambuco S.A. - BANDEPE',
    site: 'http://www.bandepe.com.br',
  },
  {
    codigo: '456',
    nome: 'Banco de Tokyo-Mitsubishi UFJ Brasil S.A.',
    site: 'http://www.btm.com.br',
  },
  {
    codigo: '214',
    nome: 'Banco Dibens S.A.',
    site: 'http://www.bancodibens.com.br',
  },
  {
    codigo: '001',
    nome: 'Banco do Brasil S.A.',
    site: 'http://www.bb.com.br',
  },
  {
    codigo: '047',
    nome: 'Banco do Estado de Sergipe S.A.',
    site: 'http://www.banese.com.br',
  },
  {
    codigo: '037',
    nome: 'Banco do Estado do Pará S.A.',
    site: 'http://www.banparanet.com.br',
  },
  {
    codigo: '039',
    nome: 'Banco do Estado do Piauí S.A. - BEP',
    site: 'http://www.bep.com.br',
  },
  {
    codigo: '041',
    nome: 'Banco do Estado do Rio Grande do Sul S.A.',
    site: 'http://www.banrisul.com.br',
  },
  {
    codigo: '004',
    nome: 'Banco do Nordeste do Brasil S.A.',
    site: 'http://www.banconordeste.gov.br',
  },
  {
    codigo: '265',
    nome: 'Banco Fator S.A.',
    site: 'http://www.bancofator.com.br',
  },
  {
    codigo: 'M03',
    nome: 'Banco Fiat S.A.',
    site: 'http://www.bancofiat.com.br',
  },
  {
    codigo: '224',
    nome: 'Banco Fibra S.A.',
    site: 'http://www.bancofibra.com.br',
  },
  {
    codigo: '626',
    nome: 'Banco Ficsa S.A.',
    site: 'http://www.ficsa.com.br',
  },
  {
    codigo: '394',
    nome: 'Banco Finasa BMC S.A.',
    outrosNomes: ['Banco Bradesco Financiamentos S.A.'],
    site: 'http://www.bmc.com.br',
  },
  {
    codigo: 'M18',
    nome: 'Banco Ford S.A.',
    site: 'http://www.bancoford.com.br',
  },
  {
    codigo: '734',
    nome: 'Banco Gerdau S.A.',
    site: 'http://www.bancogerdau.com.br',
  },
  {
    codigo: 'M07',
    nome: 'Banco GMAC S.A.',
    site: 'http://www.bancogm.com.br',
  },
  {
    codigo: '612',
    nome: 'Banco Guanabara S.A.',
    site: 'http://www.bancoguanabara.com.br',
  },
  {
    codigo: 'M22',
    nome: 'Banco Honda S.A.',
    site: 'http://www.bancohonda.com.br',
  },
  {
    codigo: '063',
    nome: 'Banco Ibi S.A. Banco Múltiplo',
    site: 'http://www.ibi.com.br',
  },
  {
    codigo: 'M11',
    nome: 'Banco IBM S.A.',
    site: 'http://www.ibm.com/br/financing/',
  },
  {
    codigo: '604',
    nome: 'Banco Industrial do Brasil S.A.',
    site: 'http://www.bancoindustrial.com.br',
  },
  {
    codigo: '320',
    nome: 'Banco Industrial e Comercial S.A.',
    site: 'http://www.bicbanco.com.br',
  },
  {
    codigo: '653',
    nome: 'Banco Indusval S.A.',
    site: 'http://www.bip.b.br',
  },
  {
    codigo: '630',
    nome: 'Banco Intercap S.A.',
    site: 'http://www.intercap.com.br',
  },
  {
    codigo: '077-9',
    nome: 'Banco Intermedium S.A.',
    site: 'http://www.intermedium.com.br',
  },
  {
    codigo: '249',
    nome: 'Banco Investcred Unibanco S.A.',
    site: '',
  },
  {
    codigo: '184',
    nome: 'Banco Itaú BBA S.A.',
    site: 'http://www.itaubba.com.br',
  },
  {
    codigo: '479',
    nome: 'Banco ItaúBank S.A',
    site: 'http://www.itaubank.com.br',
  },
  {
    codigo: 'M09',
    nome: 'Banco Itaucred Financiamentos S.A.',
    site: 'http://www.itaucred.com.br',
  },
  {
    codigo: '376',
    nome: 'Banco J. P. Morgan S.A.',
    site: 'http://www.jpmorgan.com',
  },
  {
    codigo: '074',
    nome: 'Banco J. Safra S.A.',
    site: 'http://www.jsafra.com.br',
  },
  {
    codigo: '217',
    nome: 'Banco John Deere S.A.',
    site: 'http://www.johndeere.com.br',
  },
  {
    codigo: '076',
    nome: 'Banco KDB S.A.',
    site: 'http://www.bancokdb.com.br',
  },
  {
    codigo: '757',
    nome: 'Banco KEB do Brasil S.A.',
    site: 'http://www.bancokeb.com.br',
  },
  {
    codigo: '600',
    nome: 'Banco Luso Brasileiro S.A.',
    site: 'http://www.lusobrasileiro.com.br',
  },
  {
    codigo: '243',
    nome: 'Banco Máxima S.A.',
    site: 'http://www.bancomaxima.com.br',
  },
  {
    codigo: 'M12',
    nome: 'Banco Maxinvest S.A.',
    site: 'http://www.bancomaxinvest.com.br',
  },
  {
    codigo: '389',
    nome: 'Banco Mercantil do Brasil S.A.',
    site: 'http://www.mercantil.com.br',
  },
  {
    codigo: '370',
    nome: 'Banco Mizuho do Brasil S.A.',
    site: 'http://www.mizuhobank.com/brazil/pt/',
  },
  {
    codigo: '746',
    nome: 'Banco Modal S.A.',
    site: 'http://www.bancomodal.com.br',
  },
  {
    codigo: 'M10',
    nome: 'Banco Moneo S.A.',
    site: 'http://www.bancomoneo.com.br',
  },
  {
    codigo: '738',
    nome: 'Banco Morada S.A.',
    site: 'http://www.bancomorada.com.br',
  },
  {
    codigo: '066',
    nome: 'Banco Morgan Stanley S.A.',
    site: 'http://www.morganstanley.com.br',
  },
  {
    codigo: '045',
    nome: 'Banco Opportunity S.A.',
    site: 'http://www.opportunity.com.br',
  },
  {
    codigo: '079',
    nome: 'Banco Original do Agronegócio S.A.',
    site: 'http://www.bancooriginal.com.br',
  },
  {
    codigo: '212',
    nome: 'Banco Original S.A.',
    site: 'http://www.bancooriginal.com.br',
  },
  {
    codigo: 'M17',
    nome: 'Banco Ourinvest S.A.',
    site: 'http://www.ourinvest.com.br',
  },
  {
    codigo: '623',
    nome: 'Banco Panamericano S.A.',
    site: 'http://www.bancopan.com.br',
  },
  {
    codigo: '611',
    nome: 'Banco Paulista S.A.',
    site: 'http://www.bancopaulista.com.br',
  },
  {
    codigo: '613',
    nome: 'Banco Pecúnia S.A.',
    site: 'http://www.bancopecunia.com.br',
  },
  {
    codigo: '094-2',
    nome: 'Banco Petra S.A.',
    site: 'http://www.personaltrader.com.br',
  },
  {
    codigo: '643',
    nome: 'Banco Pine S.A.',
    site: 'http://www.bancopine.com.br',
  },
  {
    codigo: '724',
    nome: 'Banco Porto Seguro S.A.',
    site: '',
  },
  {
    codigo: '735',
    nome: 'Banco Pottencial S.A.',
    site: 'http://www.pottencial.com.br',
  },
  {
    codigo: '638',
    nome: 'Banco Prosper S.A.',
    site: 'http://www.bancoprosper.com.br',
  },
  {
    codigo: 'M24',
    nome: 'Banco PSA Finance Brasil S.A.',
    site: '',
  },
  {
    codigo: '747',
    nome: 'Banco Rabobank International Brasil S.A.',
    site: 'http://www.rabobank.com.br',
  },
  {
    codigo: '088-4',
    nome: 'Banco Randon S.A.',
    site: '',
  },
  {
    codigo: '356',
    nome: 'Banco Real S.A.',
    site: 'http://www.bancoreal.com.br',
  },
  {
    codigo: '633',
    nome: 'Banco Rendimento S.A.',
    site: 'http://www.rendimento.com.br',
  },
  {
    codigo: '741',
    nome: 'Banco Ribeirão Preto S.A.',
    site: 'http://www.brp.com.br',
  },
  {
    codigo: 'M16',
    nome: 'Banco Rodobens S.A.',
    site: 'http://www.rodobens.com.br',
  },
  {
    codigo: '072',
    nome: 'Banco Rural Mais S.A.',
    site: 'http://www.rural.com.br',
  },
  {
    codigo: '453',
    nome: 'Banco Rural S.A.',
    site: 'http://www.rural.com.br',
  },
  {
    codigo: '422',
    nome: 'Banco Safra S.A.',
    site: 'http://www.safra.com.br',
  },
  {
    codigo: '033',
    nome: 'Banco Santander (Brasil) S.A.',
    site: 'http://www.santander.com.br',
  },
  {
    codigo: '743',
    nome: 'Banco Semear S.A.',
    site: 'http://www.bancosemear.com.br',
  },
  {
    codigo: '749',
    nome: 'Banco Simples S.A.',
    site: 'http://www.bancosimples.com.br',
  },
  {
    codigo: '366',
    nome: 'Banco Société Générale Brasil S.A.',
    site: 'http://www.sgbrasil.com.br',
  },
  {
    codigo: '637',
    nome: 'Banco Sofisa S.A.',
    site: 'http://www.sofisa.com.br',
  },
  {
    codigo: '012',
    nome: 'Banco Standard de Investimentos S.A.',
    site: 'http://www.standardbank.com',
  },
  {
    codigo: '464',
    nome: 'Banco Sumitomo Mitsui Brasileiro S.A.',
    site: '',
  },
  {
    codigo: '082-5',
    nome: 'Banco Topázio S.A.',
    site: 'http://www.bancotopazio.com.br',
  },
  {
    codigo: 'M20',
    nome: 'Banco Toyota do Brasil S.A.',
    site: 'http://www.bancotoyota.com.br',
  },
  {
    codigo: '634',
    nome: 'Banco Triângulo S.A.',
    site: 'http://www.tribanco.com.br',
  },
  {
    codigo: '018',
    nome: 'Banco Tricury S.A.',
    site: 'http://www.tricury.com.br',
  },
  {
    codigo: 'M14',
    nome: 'Banco Volkswagen S.A.',
    site: 'http://www.bancovw.com.br',
  },
  {
    codigo: 'M23',
    nome: 'Banco Volvo (Brasil) S.A.',
    site: '',
  },
  {
    codigo: '655',
    nome: 'Banco Votorantim S.A.',
    site: 'http://www.bancovotorantim.com.br',
  },
  {
    codigo: '610',
    nome: 'Banco VR S.A.',
    site: 'http://www.vr.com.br',
  },
  {
    codigo: '119',
    nome: 'Banco Western Union do Brasil S.A.',
    site: '',
  },
  {
    codigo: '021',
    nome: 'BANESTES S.A. Banco do Estado do Espírito Santo',
    site: 'http://www.banestes.com.br',
  },
  {
    codigo: '719',
    nome: 'Banif-Banco Internacional do Funchal (Brasil)S.A.',
    site: 'http://www.banif.com.br',
  },
  {
    codigo: '755',
    nome: 'Bank of America Merrill Lynch Banco Múltiplo S.A.',
    site: 'http://www.ml.com',
  },
  {
    codigo: '744',
    nome: 'BankBoston N.A.',
    site: 'http://www.bankboston.com.br',
  },
  {
    codigo: '073',
    nome: 'BB Banco Popular do Brasil S.A.',
    site: 'http://www.bancopopulardobrasil.com.br',
  },
  {
    codigo: '250',
    nome: 'BCV - Banco de Crédito e Varejo S.A.',
    site: 'http://www.bancobcv.com.br',
  },
  {
    codigo: '078',
    nome: 'BES Investimento do Brasil S.A.-Banco de Investimento',
    site: 'http://www.besinvestimento.com.br',
  },
  {
    codigo: '069',
    nome: 'BPN Brasil Banco Múltiplo S.A.',
    site: 'http://www.bpnbrasil.com.br',
  },
  {
    codigo: '125',
    nome: 'Brasil Plural S.A. - Banco Múltiplo',
    site: 'http://www.brasilplural.com',
  },
  {
    codigo: '070',
    nome: 'BRB - Banco de Brasília S.A.',
    site: 'http://www.brb.com.br',
  },
  {
    codigo: '092-2',
    nome: 'Brickell S.A. Crédito, financiamento e Investimento',
    site: '',
  },
  {
    codigo: '104',
    nome: 'Caixa Econômica Federal',
    site: 'http://www.caixa.gov.br',
  },
  {
    codigo: '114-7',
    nome: 'Central das Coop. de Economia e Crédito Mutuo do Est. do ES',
    site: '',
  },
  {
    codigo: '477',
    nome: 'Citibank S.A.',
    site: 'http://www.citibank.com/brasil',
  },
  {
    codigo: '081-7',
    nome: 'Concórdia Banco S.A.',
    site: 'http://www.concordiabanco.com',
  },
  {
    codigo: '097-3',
    nome: 'Cooperativa Central de Crédito Noroeste Brasileiro Ltda.',
    site: '',
  },
  {
    codigo: '085-x',
    nome: 'Cooperativa Central de Crédito Urbano-CECRED',
    site: '',
  },
  {
    codigo: '099-x',
    nome: 'Cooperativa Central de Economia e Credito Mutuo das Unicreds',
    site: '',
  },
  {
    codigo: '090-2',
    nome: 'Cooperativa Central de Economia e Crédito Mutuo das Unicreds',
    site: '',
  },
  {
    codigo: '089-2',
    nome: 'Cooperativa de Crédito Rural da Região de Mogiana',
    site: '',
  },
  {
    codigo: '087-6',
    nome: 'Cooperativa Unicred Central Santa Catarina',
    site: '',
  },
  {
    codigo: '098-1',
    nome: 'CREDIALIANÇA COOPERATIVA DE CRÉDITO RURAL',
    site: '',
  },
  {
    codigo: '487',
    nome: 'Deutsche Bank S.A. - Banco Alemão',
    site: 'http://www.deutsche-bank.com.br',
  },
  {
    codigo: '064',
    nome: 'Goldman Sachs do Brasil Banco Múltiplo S.A.',
    site: 'http://www.goldmansachs.com',
  },
  {
    codigo: '062',
    nome: 'Hipercard Banco Múltiplo S.A.',
    site: 'http://www.hipercard.com.br',
  },
  {
    codigo: '399',
    nome: 'HSBC Bank Brasil S.A. - Banco Múltiplo',
    site: 'http://www.hsbc.com.br',
  },
  {
    codigo: '168',
    nome: 'HSBC Finance (Brasil) S.A. - Banco Múltiplo',
    site: '',
  },
  {
    codigo: '492',
    nome: 'ING Bank N.V.',
    site: 'http://www.ing.com',
  },
  {
    codigo: '652',
    nome: 'Itaú Unibanco Holding S.A.',
    site: 'http://www.itau.com.br',
  },
  {
    codigo: '341',
    nome: 'Itaú Unibanco S.A.',
    site: 'http://www.itau.com.br',
  },
  {
    codigo: '488',
    nome: 'JPMorgan Chase Bank',
    site: 'http://www.jpmorganchase.com',
  },
  {
    codigo: '014',
    nome: 'Natixis Brasil S.A. Banco Múltiplo',
    site: '',
  },
  {
    codigo: '753',
    nome: 'NBC Bank Brasil S.A. - Banco Múltiplo',
    site: 'http://www.nbcbank.com.br',
  },
  {
    codigo: '086-8',
    nome: 'OBOE Crédito Financiamento e Investimento S.A.',
    site: '',
  },
  {
    codigo: '254',
    nome: 'Paraná Banco S.A.',
    site: 'http://www.paranabanco.com.br',
  },
  {
    codigo: '751',
    nome: 'Scotiabank Brasil S.A. Banco Múltiplo',
    site: 'http://www.br.scotiabank.com',
  },
  {
    codigo: '409',
    nome: 'UNIBANCO - União de Bancos Brasileiros S.A.',
    site: 'http://www.unibanco.com.br',
  },
  {
    codigo: '230',
    nome: 'Unicard Banco Múltiplo S.A.',
    site: 'http://www.unicard.com.br',
  },
  {
    codigo: '091-4',
    nome: 'Unicred Central do Rio Grande do Sul',
    site: 'http://www.unicred-rs.com.br',
  },
  {
    codigo: '084',
    nome: 'Unicred Norte do Paraná',
    site: '',
  },
];

var bancosAndroid = [{ codigo: '000', nome: 'Selecione' }, ...bancos];

export { bancos, bancosAndroid };
