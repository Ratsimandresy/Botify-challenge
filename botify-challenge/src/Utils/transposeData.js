//this function will transpose the data retreived of certains properties of NEOs
//to place them in the charts

export const transposeData = (arr) =>
  arr[0].map((el, i) => arr.map((a) => a[i]));
