/**
 * array para simular banco de dados
 */
let reports = [];

/**
 * Variáveis que pegam os valores digitado pelo usuário;
 */
let inputAnnouncement = null;
let inputClient = null;
let inputStartDate = null;
let inputEndDate = null;
let inputInvestment = null; //investimento inicial
let btn = null;
let tabReport = null;
let inputFilter = null;
let btnFilterDate = null;
let filterDate = null;
let filterDate2 = null;
let btnFilterClear = null;

/**
 * Variáveis de resultado final
 */
let totValue = null; // valor total investido
let totViews = null; // quantidade máxima de visualizações
let totClicks = null; // quantidade máxima de cliques
let totShares = null; // quantidade máxima de compartilhamentos

window.addEventListener('load', () => {
  btn = document.querySelector('#btn');
  tabReport = document.getElementById('reports');
  inputFilter = document.getElementById('inputFilter');
  btnFilterDate = document.getElementById('btnFilterDate');
  filterDate = document.getElementById('filterDate');
  filterDate2 = document.getElementById('filterDate2');
  btnFilterClear = document.getElementById('btnFilterClear');

  document.getElementById('inputAnnouncement').focus();

  addEvents();
});

function addEvents() {
  renderReports(reports);

  btn.addEventListener('click', getData);
  inputFilter.addEventListener('keyup', handleInputChange);
  btnFilterDate.addEventListener('click', () =>
    findData(filterDate, filterDate2)
  );
  btnFilterClear.addEventListener('click', clearFilter);
}

/**
 * função que preencher as variáveis;
 */
function getData() {
  inputAnnouncement = document.getElementById('inputAnnouncement').value;
  inputClient = document.querySelector('#inputClient').value;
  inputStartDate = document.getElementById('inputStartDate').value;
  inputEndDate = document.querySelector('#inputEndDate').value;
  inputInvestment = document.querySelector('#inputInvestment').value;

  var data = new Date();
  var day = String(data.getDate()).padStart(2, '0');
  var mounth = String(data.getMonth() + 1).padStart(2, '0');
  var year = data.getFullYear();
  let dateNow = year + '-' + mounth + '-' + day;

  if (
    inputAnnouncement === '' ||
    inputClient === '' ||
    inputStartDate === '' ||
    inputEndDate === '' ||
    inputInvestment === ''
  ) {
    M.toast({ html: 'Preencha todos os dados!' });
  } else if (inputStartDate > inputEndDate) {
    M.toast({ html: 'Data cadastrada inválida!' });
  } else if (inputStartDate < dateNow) {
    M.toast({ html: 'Somente a partir da data atual!' });
  } else {
    renderReports(calculate.count());
    clear();
    M.toast({ html: 'Cadastro realizado!' });
  }
}

//prettier-ignore
function renderReports(newReports) {
  
  if (newReports.length === 0 ) {
    console.log('ralatório vazio')

    let staticsHTML = '<div>';
      const staticHTML = `
        <div id="notFound" >
        <h2>Sem relatórios</h2>
        </div>      
    `;
    staticsHTML += staticHTML;
    staticsHTML += '</div>';
    tabReport.innerHTML = staticsHTML;
  }else{

    let staticsHTML = '<div>';
  
    newReports.forEach(report => {
      const { name, client, investment, views, clicks, shares, data } = report;
  
      const formattedMoney = calculate.formatMoney(investment);
      const formattedViews = calculate.formatNumber(views);
  
  
      const staticHTML = `
        <div class="report" >
          <ul>
          <li> <b>Anúncio: </b>${name} </li>
          <li> <b>Cliente: </b>${client} </li>
          <li> <b>Total investido: </b>${formattedMoney} R$</li>
          <li> <b>Total de visualizações: </b>${formattedViews} </li>
          <li> <b>Total de cliques: </b>${clicks} </li>
          <li> <b>Total de compartilhamentos: </b>${shares} </li>
          <li> <b>Cadastro: </b>${data} </li>
          </ul>
        </div>      
    `;
  
      staticsHTML += staticHTML;
    });
    
    staticsHTML += '</div>';
    tabReport.innerHTML = staticsHTML;
    
  }
  
  

}

/**
 * Função para pegar valor digitato em filtro
 */
function handleInputChange(event) {
  const searchText = event.target.value.trim();

  if (event.key !== 'Enter') {
    findClient(searchText);
  }
}

/**
 * Função para filtrar cliente
 */
function findClient(searchText) {
  const search = searchText.toLowerCase();

  const newReports = reports.filter((report) => {
    return report.client.includes(search);
  });
  renderReports(newReports);
}

/**
 * função para excluir relatório
 */
function deleteReport() {
  console.log('deletou');
}

/**
 * função para filtrar por data
 */
function findData(event, event2) {
  const initDT = event.value;
  const endDT = event2.value;

  if (initDT > endDT) {
    M.toast({ html: 'Período inválido!' });
  } else {
    const newReports = reports.filter((report) => {
      return report.data >= initDT && report.data <= endDT;
    });
    renderReports(newReports);
  }
}

/**
 * Função para limpar dados preenchidos
 */
function clear() {
  document.querySelector('#inputClient').value = '';
  document.querySelector('#inputAnnouncement').value = '';
  document.querySelector('#inputStartDate').value = '';
  document.querySelector('#inputEndDate').value = '';
  document.querySelector('#inputInvestment').value = '';
}

/**
 * Função para limpar filtros
 */
function clearFilter() {
  document.getElementById('filterDate').value = '';
  document.getElementById('filterDate2').value = '';
  document.getElementById('inputFilter').value = '';
  renderReports(reports);
}
