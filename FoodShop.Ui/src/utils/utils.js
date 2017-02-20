export function mergeSelected(selected, newItem) {
  const index = selected.findIndex((item) => item.configurationId === newItem.configurationId);
  if (~index) {
    selected[index] = newItem;
  } else {
    selected.push(newItem);
  }
  return selected;
}

export function mergeGoods(selected, goods) {
  goods.map((meal) => {
    let index = selected.findIndex((item) => item.configurationId === meal.configurationId);
    if (~index) {
      selected[index] = meal;
    } else {
      selected.push(meal);
    }
  });
  return selected;
}

export function calculateTotal(selected) {
  let total = 0;
  selected.map((item) =>
    total += item.price * item.number
  );
  return total;
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

export function findNumber(selected, id) {
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].configurationId === id)
      return selected[i].number;
  }
  return 0;
}

export function findSelectedConfigurations(selected, configurations) {
  let result = [];
  configurations.map((item) => {
    let overlap = selected.find((meal) => meal.configurationId === item.Id);
    if (overlap) {
      result.push(overlap);
    }
  });
  return result;
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