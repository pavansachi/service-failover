import { createLogger, format, transports } from 'winston';
const  { combine, timestamp, label, prettyPrint } = format;

export default () => {

  return createLogger({
    format: combine(
      label({ label: 'service-failover-api' }),
      timestamp(),
      prettyPrint()
    ),
    transports: [new transports.Console()]
  });
}
