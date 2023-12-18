import Barion from 'node-barion';

export const barion = new Barion({
  POSKey: process.env.BARION_POS_KEY!,
  Environment: 'test',
  FundingSources: ['Balance'],
  Locale: 'en-US',
});
