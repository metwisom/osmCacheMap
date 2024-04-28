enum StatusValues {
  online = 'online',
  offline = 'offline'
}

const Status: {
  currentStatus: StatusValues,
} = {
  currentStatus: StatusValues.offline
};

export {Status, StatusValues};