export function mergeSelectedConfigurations(selected, newItem) {
  const index = selected.findIndex((item) => item.id === newItem.id);
  if (parseInt(newItem.number)) {
    return joinElementToArray(selected, newItem, index);
  } else {
    return excludeFromArray(selected, index);
  }
}

export function mergeGoods(selected, good) {
  const selectedConfigurations = good.selected.filter(x => x.number !== 0);
  const index = selected.findIndex(x => x.id === good.id);
  if (selectedConfigurations && selectedConfigurations.length) {
    return joinElementToArray(selected, good, index);
  } else {
    return excludeFromArray(selected, index);
  }
}

export function calculateGoodTotal(goods) {
  let total = 0;
  goods.map(good =>
    total += calculateTotal(good.selected)
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

export function changeConfigurationsNumber(goods, configuration) {
  goods.map(good => {
    const index = good.selected.findIndex(x => x.id === configuration.id);
    if (~index) {
      if (configuration.number) {
        good.selected[index] = configuration;
      } else {
        good.selected.splice(index, 1);
      }
    }
  });
  return goods;
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

export function mergeSelectedRooms(selected, room) {
  const index = selected.findIndex(x => x.id === room.id);
  return joinElementToArray(selected, room, index);
}

export function removeRoomFromSelected(selected, action) {
  const index = selected.findIndex(x => x.id === action.id);
  return excludeFromArray(selected, index);
}

export function renderDateRange({ arrivalDate, departureDate }) {
  let result = {};
  if (arrivalDate) {
    result.arrivalDate = renderDate(arrivalDate);
  }
  if (departureDate) {
    result.departureDate = renderDate(departureDate);
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
      hotelRoomId: room.id,
      arrivalDate: renderDate(room.arrivalDate),
      departureDate: renderDate(room.departureDate)
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

export function makeConfigurationsList(selected) {
  let res = {};
  selected.forEach(item =>
    item.selected.forEach(configuration =>
      res[configuration.id] = configuration.number
    )
  );
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