import jetLogger from 'jet-logger';

export const logger = new (class Logger {
  info(value: string) {
    console.log('\n');

    jetLogger.info(`${value}\n`);
  }

  log(value: string) {
    console.log('\n');
    jetLogger.imp('================================');
    jetLogger.imp(value);
    jetLogger.imp('================================');
    console.log('\n');
  }

  err(value: string) {
    console.log('\n');
    jetLogger.err(`${value}\n`);
  }
})();
