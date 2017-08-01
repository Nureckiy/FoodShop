import dateformat from 'dateformat';

const idComparison = (firstItem, secondItem) => firstItem.id === secondItem.id;

export function mergeSelectedConfigurations(selected, newItem) {
  if (parseInt(newItem.number)) {
    return joinElementToArray(selected, newItem, idComparison);
  } else {
    return excludeFromArray(selected, newItem, idComparison);
  }
}

export function mergeDishToArray(selectedDishes, dish) {
  const configurations = dish.selected.filter(x => x.number !== 0);
  if (configurations.length) {
    return mergeElementToArray(selectedDishes, dish);
  } else {
    return excludeFromArray(selectedDishes, dish, idComparison);
  }
}

export function calculateSelectedTotal(array) {
  return array.map(item => calculateTotal(item.selected))
    .reduce(add, 0);
}

export function calculateTotal(array) {
  return array.map(item => item.number * item.price)
    .reduce(add, 0);
}

const add = (a, b) => a + b;


export function changeConfigurationsNumber(dishes, configuration) {
  return dishes.map(dish => {
    dish.selected = setConfiguration(dish.selected, configuration);
    return dish;
  });
}

function setConfiguration(array, configuration) {
  const index = array.findIndex(a => idComparison(a, configuration));
  if (~index) {
    if (configuration.number) {
      array[index] = configuration;
    } else {
      array.splice(index, 1);
    }
  }
  return array;
}

export function findNumber(selected, id) {
  const current = selected.find(item => idComparison(item, { id }));
  return current ? current.number : 0;
}

export function mergeElementToArray(array, element) {
  return joinElementToArray(array, element, idComparison);
}

export function removeElementFromArray(array, id) {
  return excludeFromArray(array, { id }, idComparison);
}

export function calculateBookingTotal(rooms) {
  return rooms.map(room => calculateRoomTotal(room)).reduce(add, 0);
}

export function calculateRoomTotal(room) {
  const daysCount = room.departureDate.diff(room.arrivalDate, 'days');
  return room.price * daysCount;
}

export function parseRoomBooking(rooms) {
  return (rooms.map(room => {
    return {
      roomId: room.id,
      startDate: requestDateFormat(room.arrivalDate),
      endDate: requestDateFormat(room.departureDate)
    };
  }));
}

export function makePortionsList(array) {
  let res = [];
  array.forEach(item =>
    item.selected.forEach(portion =>
      res.push({
        dishPortionId: portion.id,
        count: portion.number
      })
    ));
  return res;
}

export function mapChildren(children, callback) {
  return Array.isArray(children)
    ? children.map(callback)
    : callback(children, 0);
}

export function renderDateRange({ arrivalDate, departureDate }) {
  let result = {};
  addOptionIfExist(result, arrivalDate, 'startDate');
  addOptionIfExist(result, departureDate, 'endDate');
  return result;
}

export const full = 'dd mmmm yyyy';
export const request = 'MM/DD/YYYY';
export const clipped = 'dd.mm';
export const standard = 'dd mmmm';

export function requestDateFormat(date) {
  return dateformat(date, request);
}

export function clippedDateFormat(date) {
  return dateformat(date, clipped);
}

export function fullDateFormat(date) {
  return dateformat(date, full);
}

export function standardDateFormat(date) {
  return dateformat(date, standard);
}

function addOptionIfExist(item, option, optionName) {
  if(option) {
    item[optionName] = option;
  }
}

export function renderNumberOptions(number) {
  let options = [];
  for(let i = 0; i < number; i++) {
    options.push({
      value: i,
      text: i
    });
  }
  return options;
}

export function renderArrayOptions(items) {
  return items.map(item => {
    return { value: item, text: item };
  });
}

export function renderObjectOptions(item) {
  return Object.keys(item).map(key => {
    return { value: key, text: item[key] };
  });
}

export function renderObjectArrayOptions(items) {
  return items.map(item => {
    return { value: item.id, text: item.name };
  });
}

export function arraysEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function joinElementToArray(arr, item, comparison) {
  const index = arr.findIndex(a => comparison(a, item));
  if (~index) {
    arr[index] = item;
  } else {
    arr.push(item);
  }
  return arr;
}

function excludeFromArray(arr, item, comparison) {
  const index = arr.findIndex(a => comparison(a, item));
  if (~index) {
    arr.splice(index, 1);
  }
  return arr;
}

export function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

export function deleteProps(object, propNames) {
  propNames.forEach(propName => delete object[propName]);
}