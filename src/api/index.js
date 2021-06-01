import axios from 'axios';

const baseURL = 'https://e-fila96.ru/';
const token = 'e7fab8a7d0929281f434f5572edf32';

const apiClient = axios.create({
  baseURL,
});

const prepareProduct = (product, key) => {
  const result = {
    ...product,
    categoryId: key,
  };

  if (product.sizes) {
    result.sizes = product.sizes.map((size) => {
      const _size = size.value;
      const options = _size.options;
      if (options) {
        _size.options = options.map((option) => option.value);
      }
      return _size;
    });
  }

  return result;
};

async function getCollectionByKey({ key, filter, options }) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/collections/get/${key}?token=${token}`,
    data: {
      filter,
      ...options,
      populate: 1,
      sort: { _o: true },
    },
  });
  return data.entries.map((entry) => prepareProduct(entry, key));
}

async function getSingletonByKey(key) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/singletons/get/${key}?token=${token}`,
  });
  return data;
}

async function sendForm({ url, form }) {
  const { data } = await apiClient({
    method: 'post',
    url,
    data: form,
  });
  return data;
}

export { baseURL, getCollectionByKey, getSingletonByKey, sendForm };
