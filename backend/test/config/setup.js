import { promisify } from 'util';
import { exec } from 'child_process';

const asyncExec = promisify(exec);

export default async () => {
  await asyncExec(
    'sequelize db:seed:undo --env test && sequelize db:seed:all --env test'
  );
};
