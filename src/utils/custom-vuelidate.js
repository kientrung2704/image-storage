export const japaneseFullWidth = (value) => {
  if (!value) return true;
  const jaRegex =
    /^[ー]?[０-９ぁ-んァ-ン一-龥Ａ-ｚ\s、，．：；！？＂＇｀＾～￣＿＆＠＃％＋－＊＝＜＞（）［］｛｝｟｠｜￤／＼￢＄￡￠￦￥・。ー「」]+$/;
  return jaRegex.test(value);
};

export const password = (value) => {
  // eslint-disable-next-line no-useless-escape
  const paRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*"?\s&_()-.,|`+=>\<{}~\/:^;\'\][\\\\])[A-Za-z\d@#$!%*?\s&_()-:.,|`+=>\<{}~\/:^;"\'\][\\\\]{8,}$/;

  return paRegex.test(value);
};

export const email = (value) => {
  // eslint-disable-next-line no-useless-escape
  const eRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return eRegex.test(value);
};

export const notSameAddress = (value, vm) => {
  if (!value) return true;

  return !(value === vm.address1 && value === vm.address2);
};

export const notSameTrainLine = (value, vm) => {
  if (!value?.code) return true;

  return !(value?.code === vm?.train_line1?.code && value?.code === vm?.train_line2?.code);
};

export const notSameMail = (value, vm) =>
  value === vm?.mail_address && value === vm?.mail_address_confirmation;

export const notSameStation = (value, vm) => {
  if (!value?.code) return true;

  return !(value?.code === vm?.station1?.code && value?.code === vm?.station2?.code);
};

export const numericCustom = (value) => {
  if (!value) return true;
  const valueInput = value.replace(/,/g, '');
  // eslint-disable-next-line no-restricted-globals
  return !Number.isNaN(Number(valueInput));
};
export const maxValueCustom = (value) => {
  if (!value) return true;
  const valueInput = parseFloat(value.replace(/,/g, ''));
  // eslint-disable-next-line no-restricted-globals
  if (valueInput < 2147483647) {
    return true;
  }
  return false;
};
export const integerCustom = (value) => {
  if (!value) return true;
  const valueInput = parseFloat(value.replace(/,/g, ''));
  // eslint-disable-next-line no-restricted-globals
  if (Number.isInteger(valueInput)) {
    return true;
  }
  return false;
};
export const minValueCustom = (value) => {
  if (!value) return true;
  const valueInput = parseFloat(value.replace(/,/g, ''));
  // eslint-disable-next-line no-restricted-globals
  if (Number.isInteger(valueInput) && valueInput > 0) {
    return true;
  }
  return false;
};
export const notSameTrainLineReExhibit = (value, vm) => {
  if (!value?.value) return true;
  return !(value?.value === vm?.train_line1?.value && value?.value === vm?.train_line2?.value);
};

export const notSameStationReExhibit = (value, vm) => {
  if (!value?.value) return true;

  return !(value?.value === vm?.station1?.value && value?.value === vm?.station2?.value);
};

export const japaneseFullWidthAlphabet = (value) => {
  if (!value) return true;
  const jaRegex =
    /^[ー]?[０-９ぁ-んァ-ン一-龥Ａ-ｚ\s、，．：；！？＂＇｀＾～￣＿＆＠＃％＋－＊＝＜＞（）［］｛｝｟｠｜￤／＼￢＄￡￠￦￥・。ー]+$/;
  return jaRegex.test(value);
};
