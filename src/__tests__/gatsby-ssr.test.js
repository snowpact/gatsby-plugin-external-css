import { onRenderBody } from '../gatsby-ssr';
import { v1 as uuidv1 } from 'uuid';

jest.mock('uuid');

const setHeadComponents = jest.fn();

const TEST_FILE = `${__dirname}/__modules__/style.css`;
const BAD_TEST_FILE = `${__dirname}/__modules__/bad.scss`;
// const VOID_FILE = `${__dirname}/__modules__/not.css`;

const simpleORB = (pluginOptions) =>
  onRenderBody({ setHeadComponents }, { plugins: [], ...pluginOptions });

beforeAll(() => {
  uuidv1.mockImplementationOnce(() => {
    return 'uuid-123';
  });
});

afterAll(() => {
  uuidv1.mockClear();
});

afterEach(() => {
  setHeadComponents.mockClear();
});

test('pluginsOptions need a "source" property', () => {
  expect(() => simpleORB({})).toThrowErrorMatchingSnapshot('source-attribute');
});

test('pluginsOptions need a valid "source" file css', () => {
  expect(() => simpleORB({ source: BAD_TEST_FILE })).toThrowErrorMatchingSnapshot('source-css');
});

// test('pluginsOptions need a "source" file that exists', () => {
//   expect(() => simpleORB({ source: VOID_FILE })).toThrowErrorMatchingSnapshot('source-exists');
// });

test('Providing default valid source file', () => {
  simpleORB({
    source: TEST_FILE,
  });
  expect(setHeadComponents.mock.calls.length).toBe(1);
  expect(setHeadComponents.mock.calls[0]).toMatchSnapshot('source-valid');
});
