import axios from 'axios';

const apiClient = axios.create({});

apiClient.interceptors.request.use(config => {
  const { params } = config;
  return {
    ...config,
    params: {
      ...params,
      token: 'e7fab8a7d0929281f434f5572edf32',
    },
  };
});

const prepareProduct = product => {
  if (typeof product.versions !== 'object') {
    return product;
  }

  // code below converts array of versions to hashMap
  return {
    ...product,
    versions: product.versions.reduce((hashMap, version, index) => {
      hashMap[index] = {
        id: index,
        measure: version.value.measure,
        price: version.value.price,
      };
      return hashMap;
    }, {}),
    chosenVersion: 0,
  };
};

async function getProductsByKey(key) {
  const { data } = await apiClient(`/cockpit/api/collections/get/${key}`);
  return data.entries.map(prepareProduct);
}

async function getCollectionByKey(key) {
  const { data } = await apiClient(`/cockpit/api/collections/get/${key}`);
  return data;
}

async function getCollectionSchemaByKey(key) {
  const { data } = await apiClient(`/cockpit/api/collections/collection/${key}`);
  return data;
}

async function getSingletonByKey(key) {
  const { data } = await apiClient(`/cockpit/api/singletons/get/${key}`);
  return data;
}

async function sendForm(form) {
  const { data } = await apiClient({
    url: `/order/`,
    data: form,
  });
  return data;
}

async function saveOrder(form) {
  const { data } = await apiClient({
    url: `/cockpit/api/collections/save/orders`,
    data: form,
  });
  return data;
}

export { getProductsByKey, getCollectionByKey, getCollectionSchemaByKey, getSingletonByKey, sendForm, saveOrder };
