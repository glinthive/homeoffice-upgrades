async function convertPrices() {
  const elements = document.querySelectorAll('[data-price]');
  const res = await fetch('https://api.exchangerate.host/latest');
  const data = await res.json();
  const locale = navigator.language;
  const currency = locale.split('-')[1] || 'USD';
  const rate = data.rates[currency] || 1;
  elements.forEach(el => {
    const usd = parseFloat(el.getAttribute('data-price'));
    el.textContent = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(usd * rate);
  });
}
window.addEventListener('DOMContentLoaded', convertPrices);
