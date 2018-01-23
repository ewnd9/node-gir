const path = require('path');
const { promisify: pify } = require('util');
const { execFile, execFileSync } = require('child_process');
const execFileAsync = pify(execFile);

describe('examples should work', () => {
  test('examples/keybinder.js', async done => {
    const proc = execFile('node', [path.resolve(`${__dirname}/../examples/keybinder.js`)], (err, stdout, stderr) => {
      expect(err.signal).toBe('SIGTERM');
      expect(stdout).toBe('<Super>X true\nclicked\nclicked\n');
      expect(stderr).toBe('');
      done();
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    execFileSync('xdotool', ['key', 'super+x']);
    await new Promise(resolve => setTimeout(resolve, 1000));

    execFileSync('xdotool', ['key', 'super+x']);
    await new Promise(resolve => setTimeout(resolve, 1000));

    execFileSync('kill', [proc.pid]);
  });
});
