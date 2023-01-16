import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return correct size', () => {
    const size = 1024;
    const pipe = new FileSizePipe();
    const result = pipe.transform(size);
    expect(result).toBe('1 KB');
  })
  it('should return correct size for 0 bytes', () => {
    const size = 0;

    const pipe = new FileSizePipe();

    const result = pipe.transform(size);

    expect(result).toBe('0 Bytes');

  })
});
