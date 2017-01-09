import axios from 'axios';
import Qs from 'qs';
import Promise from 'bluebird';

import CONFIG from '../../config/default.json';

export function queryEpisodes(episodesId) {
  if (!episodesId || !episodesId.length) {
    return Promise.resolve(null);
  }
  const filter = {_id: episodesId};
  return axios({
    url: `${CONFIG['apiUrl']}/episodes`,
    timeout: 20000,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      filter
    },
    paramsSerializer: params => {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    responseType: 'json'
  })
    .then(res => {
      return res.data.data;
    });
}