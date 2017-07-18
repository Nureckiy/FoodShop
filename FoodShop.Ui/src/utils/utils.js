export function mergeSelectedConfigurations(selected, newItem) {
  const index = selected.findIndex((item) => item.id === newItem.id);
  if (parseInt(newItem.number)) {
    return joinElementToArray(selected, newItem, index);
  } else {
    return excludeFromArray(selected, index);
  }
}

export function mergeDishes(selected, dish) {
  const selectedConfigurations = dish.selected.filter(x => x.number !== 0);
  const index = selected.findIndex(x => x.id === dish.id);
  if (selectedConfigurations && selectedConfigurations.length) {
    return joinElementToArray(selected, dish, index);
  } else {
    return excludeFromArray(selected, index);
  }
}

export function calculateDishTotal(dishes) {
  let total = 0;
  dishes.map(dish =>
    total += calculateTotal(dish.selected)
  );
  return total;
}

export function calculateTotal(array) {
  let total = 0;
  array.map((item) =>
    total += item.price * item.number
  );
  return total;
}

export function changeConfigurationsNumber(dishes, configuration) {
  dishes.map(dish => {
    const index = dish.selected.findIndex(x => x.id === configuration.id);
    if (~index) {
      if (configuration.number) {
        dish.selected[index] = configuration;
      } else {
        dish.selected.splice(index, 1);
      }
    }
  });
  return dishes;
}

export function findNumber(selected, id) {
  const current = selected.find(item => item.id === id);
  return current ? current.number : 0;
}

export function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

export function getProfileItem(itemName) {
  const profile = getProfile();
  if (profile) {
    return profile[itemName];
  }
}

export function getProfileItemFromMetadata(itemName) {
  const profile = getProfile();
  if (profile && profile.user_metadata)
    return profile.user_metadata[itemName];
}

export function mergeElementToArray(array, element) {
  const index = array.findIndex(x => x.id === element.id);
  return joinElementToArray(array, element, index);
}

export function removeElementFromArrayById(array, id) {
  const index = array.findIndex(x => x.id === id);
  return excludeFromArray(array, index);
}

export function renderDateRange({ arrivalDate, departureDate }) {
  let result = {};
  if (arrivalDate) {
    result.startDate = renderDate(arrivalDate);
  }
  if (departureDate) {
    result.endDate = renderDate(departureDate);
  }
  return result;
}

export function calculateBookingTotal(rooms) {
  const daysCount = ({ arrivalDate, departureDate }) => departureDate.diff(arrivalDate, 'days');
  let sum = 0;
  rooms.map(room => sum += room.price * daysCount(room));
  return sum;
}

export function parseRoomBooking(rooms) {
  return (rooms.map(room => {
    return {
      roomId: room.id,
      startDate: renderDate(room.arrivalDate),
      endDate: renderDate(room.departureDate)
    };
  }));
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

export function makePortionsList(selected) {
  let res = [];
  selected.forEach(item =>
    item.selected.forEach(portion =>
      res.push({
        dishPortionId: portion.id,
        count: portion.number
      })
    ));
  return res;
}




















function joinElementToArray(arr, el, index) {
  if (~index) {
    arr[index] = el;
  } else {
    arr.push(el);
  }
  return arr;
}

function excludeFromArray(arr, index) {
  if (~index) {
    arr.splice(index, 1);
  }
  return arr;
}

function renderDate(date) {
  return date.format('MM/DD/YYYY');
}