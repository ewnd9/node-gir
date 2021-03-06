const { load } = require('../');

const GIRepository = load('GIRepository');
const repo = new GIRepository.Repository();
repo.require('Gtk', '3.0', 0);

describe('struct', () => {
  test('can be returned from native functions', () => {
    const info = repo.findByName('Gtk', 'Button');
    expect(typeof(info)).toEqual('object');
    expect(info.getNamespace()).toEqual('Gtk');
    expect(info.getName()).toEqual('Button');
  });

  test('can call functions with structs', () => {
    const info = repo.findByName('Gtk', 'Button');
    const parentInfo = GIRepository.objectInfoGetParent(info);
    expect(parentInfo).not.toBe(null);
    expect(parentInfo).not.toBe(undefined);
    expect(parentInfo.getNamespace()).toEqual('Gtk');
    expect(parentInfo.getName()).toEqual('Bin');
  });

  test('', () => {
    const buttonInfo = repo.findByName('Gtk', 'Button');
    const propertyInfo = GIRepository.objectInfoGetProperty(buttonInfo, 0);
    const typeInfo = GIRepository.propertyInfoGetType(propertyInfo);
    const typeTag = GIRepository.typeInfoGetTag(typeInfo);
    const typeTagName = GIRepository.typeTagToString(typeTag);
    expect(typeTagName).not.toEqual(null);
    expect(typeTagName).not.toEqual(undefined);
    expect(typeof(typeTagName)).toEqual('string');
  });
});
