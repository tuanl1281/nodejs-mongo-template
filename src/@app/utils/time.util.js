import moment from 'moment';

const getSystemDateTime = () => moment().utc();
const getLocalDateTime = () => moment().utc().add(7, 'hours');

export { getSystemDateTime, getLocalDateTime };
export default { getSystemDateTime, getLocalDateTime };
