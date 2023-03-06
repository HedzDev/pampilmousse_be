const checkBody = (body, keys) => {
  let isValid = true;
  for (const field of keys) {
    if (!body[field] || body[field] == '') {
      isValid = false;
      break;
    }
  }
  return isValid;
};
