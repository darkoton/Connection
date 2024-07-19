import axios from 'axios';

export default (path, ...args) => axios(path, ...args).then(r => r);
