import axios from 'axios'

const fixerUrl = 'http://data.fixer.io/api/latest?access_key=40566e492bb0ba863934bb0722f72bd5'

export function getRates(base) {
  return axios.get(fixerUrl, {
    params: {
      base
    }
  })
    .then(res => {
      const { data } = res,
        currencyList = []

      currencyList.push({
        name: data.base,
        value: 1
      })

      console.log(data.base)

      for (let rate in data.rates) {
        currencyList.push({
          name: rate,
          value: data.rates[rate]
        })
      }

      return currencyList
    })
}

export function convertRates(base, target) {
  return axios.get(fixerUrl, {
    params: {
      base: base,
      symbols: target
    }
  }).then(res => {
    console.log(res)
    console.log(base + ' ' + target)
    const { data } = res,
      currencyList = []

    return data.rates[target]
  })
}


