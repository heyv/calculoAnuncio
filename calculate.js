let calculate = {
  count: function () {
    let value = parseFloat(inputInvestment);
    let startDate = this.conversion(inputStartDate);
    let endDate = this.conversion(inputEndDate);
    let allClicks = null;
    let allShares = null;
    let allViews = null;

    const totDays = endDate - startDate + 1; //soma mais (1) para bater calculo de dias de investimento

    totValue = totDays * value;
    // Valor total investido

    let originalViews = 30 * totValue;
    //total de visualizações original

    //loop para calculo
    for (let cont = 1; cont < 5; cont++) {
      const clicks = parseInt(originalViews * 0.12);
      allClicks += clicks;

      const shares = parseInt(clicks * 0.15);
      allShares += shares;

      const views = shares * 40;
      originalViews += views;
      allViews = originalViews;
    }

    totViews = allViews;
    totClicks = allClicks;
    totShares = allShares;

    const object = this.createObject();

    reports.push(object);

    return reports;
  },

  /**
   * Função para criar objeto e atribuir valores
   */
  createObject: function () {
    const object = {
      name: inputAnnouncement,
      client: inputClient,
      investment: totValue,
      views: totViews,
      clicks: totClicks,
      shares: totShares,
      data: inputStartDate,
    };
    return object;
  },

  /**
   * Função para conversão de datas para int
   */
  conversion: function (value) {
    const parts = value.split('-');
    const newDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const newDT = newDate.getDate();

    return newDT;
  },

  /**
   * Função para conversão de valor em moeda real
   */
  formatMoney: function (value) {
    const moneyFormatter = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return moneyFormatter.format(value);
  },

  /*
   * Função para converter número
   */
  formatNumber: function (value) {
    const numberFormatter = Intl.NumberFormat('pt-BR');

    const newNumber = numberFormatter.format(value);
    return newNumber;
  },
};
