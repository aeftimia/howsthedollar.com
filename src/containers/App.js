import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';
import HorizontalChartAxis from '../components/HorizontalChartAxis';
import PriceChart from '../components/PriceChart';
import PriceTable from '../components/PriceTable';
import Tabs from '../components/Tabs';
import VerticalChartAxis from '../components/VerticalChartAxis';

import { fetchPriceHistory, fetchSpotPrices } from '../api';
import { CRYPTOCURRENCY, CURRENCY, DURATION, POLL_FREQUENCY } from '../constants';
import { formatCurrency } from '../utils';

import './App.css';

// `Object.values` polyfill for IE (since it's not supported by CRA)
const CRYPTOCURRENCY_LIST = Object.keys(CRYPTOCURRENCY).map(e => CRYPTOCURRENCY[e]);
const CURRENCY_LIST = Object.keys(CURRENCY).map(e => CURRENCY[e]);
const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);

const INITIAL_STATE = {
  priceHistory: [],
  spotPrice: { amount: '0', currency: CURRENCY_LIST[0] },
  selectedCryptocurrencyIndex: 0,
  selectedCurrencyIndex: 0,
  selectedDurationIndex: 2,
  spotPrices: [],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.fetchPriceData();
    this.startPriceDataPolling();
  }

  componentWillUnmount() {
    this.clearPriceDataPolling();
  }

  startPriceDataPolling() {
    this.pollingId = setInterval(() => {
      this.fetchPriceData();
    }, POLL_FREQUENCY);
  }

  clearPriceDataPolling() {
    clearInterval(this.pollingId);
  }

  fetchPriceData() {
    const {
      selectedCurrencyIndex,
      selectedCryptocurrencyIndex,
      selectedDurationIndex,
    } = this.state;

    const promises = [
      fetchPriceHistory(
        CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].key,
        CURRENCY_LIST[selectedCurrencyIndex].key,
        DURATION_LIST[selectedDurationIndex].key,
      ),
      fetchSpotPrices(CURRENCY_LIST[selectedCurrencyIndex].key),
    ];

    Promise.all(promises)
      .then(([priceHistory, spotPrices]) => {
        this.setState({
          priceHistory,
          spotPrice: spotPrices[selectedCryptocurrencyIndex],
          spotPrices,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  handleCryptocurrencyChange = (nextIndex) => {
    this.setState({ selectedCryptocurrencyIndex: nextIndex }, () => {
      this.fetchPriceData();
    });
  }

  handleDurationChange = (nextIndex) => {
    this.setState({ selectedDurationIndex: nextIndex }, () => {
      this.fetchPriceData();
    });
  }

  renderHelmet() {
    const { selectedCryptocurrencyIndex, spotPrices } = this.state;
    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].key;
    const price = spotPrices[selectedCryptocurrencyIndex] || '';
    const priceText = formatCurrency(price.amount, cryptocurrency) || '';

    return (
      <Helmet>
        <title>{`${cryptocurrency.toUpperCase()}: ${priceText}`}</title>
        <link rel="icon" href={`${process.env.PUBLIC_URL}/icons/icon-${cryptocurrency}.png`} />
      </Helmet>
    );
  }

  renderCryptocurrencyTabs() {
    const { spotPrices } = this.state;
    const keys = [];
    const tabOptions = [];
    CRYPTOCURRENCY_LIST.forEach(({ name }, index) => {
      let key;
      let tabOption;
      if (spotPrices[index]) {
        const price = formatCurrency(spotPrices[index].amount, CRYPTOCURRENCY_LIST[index].key);
        key = `${name} ${price}`;
        tabOption = (
          <span className="cryptocurrency" key={key}>
            <span>{name}</span>
            <span>{price}</span>
          </span>
        );
      } else {
        key = name;
        tabOption = (<span className="cryptocurrency" key={name}>{name}</span>);
      }

      keys.push(key);
      tabOptions.push(tabOption);
    });

    return (
      <Tabs
        keys={keys}
        onChange={this.handleCryptocurrencyChange}
        selectedIndex={this.state.selectedCryptocurrencyIndex}
      >
        {tabOptions}
      </Tabs>
    );
  }

  renderDurationTabs() {
    const tabOptions = DURATION_LIST.map(({ codename }) => (
      <span key={codename}>{codename}</span>
    ));

    return (
      <Tabs
        keys={DURATION_LIST.map(({ codename }) => codename)}
        onChange={this.handleDurationChange}
        selectedIndex={this.state.selectedDurationIndex}
      >
        {tabOptions}
      </Tabs>
    );
  }

  renderPriceTable() {
    const {
      priceHistory,
      selectedCurrencyIndex,
      selectedCryptocurrencyIndex,
      selectedDurationIndex,
      spotPrice,
    } = this.state;

    return (
      <div className="table">
        <PriceTable
          currencyLabel={CURRENCY_LIST[selectedCurrencyIndex].name}
          code={CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].key}
          durationLabel={DURATION_LIST[selectedDurationIndex].humanize}
          priceHistory={priceHistory}
          spotPrice={+spotPrice.amount}
        />
      </div>
    );
  }

  renderPriceHistoryChart() {
    const { priceHistory, selectedCryptocurrencyIndex, selectedDurationIndex } = this.state;
    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const durationType = DURATION_LIST[selectedDurationIndex].key;
    return (
      <div className="chart">
        <div className="topSection">
          <VerticalChartAxis cryptocurrency={cryptocurrency.key} data={priceHistory} textAlign="left" />
          <PriceChart
            data={priceHistory}
            color={
              cryptocurrency && {
                fill: cryptocurrency.fillColor,
                stroke: cryptocurrency.strokeColor,
              }
            }
            code={cryptocurrency.key}
          />
          <VerticalChartAxis cryptocurrency={cryptocurrency.key} data={priceHistory} textAlign="right" />
        </div>
        <HorizontalChartAxis data={priceHistory} duration={durationType} />
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        { this.renderHelmet() }
        <div className="dashboard">
          <div className="tabs">
            { this.renderCryptocurrencyTabs() }
            { this.renderDurationTabs() }
          </div>
          { this.renderPriceTable() }
          { this.renderPriceHistoryChart() }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
