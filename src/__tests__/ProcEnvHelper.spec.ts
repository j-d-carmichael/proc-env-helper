import ProcEnvHelper from '@/ProcEnvHelper';

test('Should return the string provided', () => {
  expect(ProcEnvHelper.getOrSetDefault('UNITTESTVALUE', 'HELLO')).toBe('HELLO');
});

test('getOrSetDefault and requiredOrThrow should also set the process.env PROC_ENV_HELPER_<name>', () => {
  ProcEnvHelper.getOrSetDefault('UNITTESTVALUE1', 'HELLO');
  process.env.UNITTESTVALUE2 = 'HELLO';
  ProcEnvHelper.requiredOrThrow('UNITTESTVALUE2');
  expect(process.env.UNITTESTVALUE1).toBe('HELLO');
  expect(process.env.UNITTESTVALUE2).toBe('HELLO');
});

test('Should return the string provided', () => {
  process.env.UNITTESTVALUE = 'BOB';
  expect(ProcEnvHelper.getOrSetDefault('UNITTESTVALUE', 'HELLO')).toBe('BOB');
});

test('Should return the string provided', () => {
  process.env.UNITTESTVALUE = 'HELLO';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('HELLO');
});

test('Should return bool true from string provided', () => {
  process.env.UNITTESTVALUE = 'true';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(true);
});

test('Should return bool true from a provided `TRUE` string', () => {
  process.env.UNITTESTVALUE = 'TRUE';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(true);
});

test('Should return bool false from string provided', () => {
  process.env.UNITTESTVALUE = 'false';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(false);
});

test('Should return bool false from a provided `FALSE` string', () => {
  process.env.UNITTESTVALUE = 'FALSE';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(false);
});

test('Should return number from string provided', () => {
  process.env.UNITTESTVALUE = '10.5';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(10.5);
});

test('Should return number from string provided', () => {
  process.env.UNITTESTVALUE = '105';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(105);
});

test('Should return string for large number that exceeds MAX_SAFE_INTEGER to avoid precision loss', () => {
  process.env.UNITTESTVALUE = '3653165048913130137';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('3653165048913130137');
});

test('Should return number for MAX_SAFE_INTEGER', () => {
  process.env.UNITTESTVALUE = '1007111254740990'; // Number.MAX_SAFE_INTEGER
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(1007111254740990);
});

test('Should return undefined from string provided', () => {
  process.env.UNITTESTVALUE = 'undefined';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(undefined);
});

test('Should return null from string provided', () => {
  process.env.UNITTESTVALUE = 'null';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe(null);
});

test('Should return object from json string provided', () => {
  process.env.UNITTESTVALUE = '{"name":"bob"}';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toEqual({
    name: 'bob'
  });
});

test('Should return string from string provided', () => {
  process.env.UNITTESTVALUE = 'production';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('production');
});

test('Should return string false from string provided', () => {
  process.env.UNITTESTVALUE = '\'false\'';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('false');
});

test('Should return string false from string provided', () => {
  process.env.UNITTESTVALUE = '\'false\'';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('false');
});

test('Should return string true from string provided', () => {
  process.env.UNITTESTVALUE = '\'true\'';
  expect(ProcEnvHelper.requiredOrThrow('UNITTESTVALUE')).toBe('true');
});

test('should return `false` when specified env is set to false against the specified default value', () => {
  process.env.UNITTESTVALUE = 'false';
  expect(ProcEnvHelper.getOrSetDefault('UNITTESTVALUE', true)).toEqual(false);
});
