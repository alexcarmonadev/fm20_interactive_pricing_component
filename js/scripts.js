const slider = document.getElementById('range');
const yearly = document.getElementById('yearly');
const textSpan = document.querySelector('.card__header-text--span');
const priceSpan = document.querySelector('.card__header-price--span');

const setSlider = () => {
  const max = slider.getAttribute('max');
  const width = getComputedStyle(slider).getPropertyValue('--width');
  const widthValue = Number(width.slice(0, width.length - 1));

  const minimumFillWidth = widthValue * 0.03;
  const maximumFillWidthRatio = 0.95;

  const setFilledArea = () => {
    const fillRation = slider.value / max;
    let fillWidth = fillRation * widthValue * maximumFillWidthRatio;
    if (fillWidth < minimumFillWidth) fillWidth = 0;
    slider.style.setProperty('--value', fillWidth + '%');
  };
  setFilledArea();
  slider.addEventListener('input', setFilledArea);
};

const handlePrice = () => {
  let yearlyBillingDiscount = 0;
  let pageViews = 10;
  let price = 0;
  if (yearly.checked) {
    yearlyBillingDiscount = 0.25;
  }
  switch (slider.value) {
    case '0':
      pageViews = '10K';
      price = 8;
      break;
    case '1':
      pageViews = '50K';
      price = 12;
      break;
    case '2':
      pageViews = '100K';
      price = 16;
      break;
    case '3':
      price = 24;
      pageViews = '500K';
      break;
    case '4':
      price = 36;
      pageViews = '1M';
      break;
  }
  price = price - price * yearlyBillingDiscount;
  textSpan.textContent = pageViews;
  priceSpan.textContent = price.toFixed(2);
};

slider.addEventListener('input', handlePrice);
yearly.addEventListener('input', handlePrice);

setSlider();
