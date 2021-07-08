import 'mocha';
import * as chai from 'chai';
import { Crypto } from '@peculiar/webcrypto';

import * as fallbackCrypto from '../src/fallback';

declare global {
  interface Window {
    msCrypto: Crypto;
  }
}

//  using msCrypto because Typescript was complaing read-only
window.msCrypto = new Crypto();

describe('Fallback', () => {
  describe('RandomBytes', () => {
    let length: number;
    let key: Uint8Array;

    beforeEach(async () => {
      length = 32;
      key = fallbackCrypto.randomBytes(length);
    });

    it('should generate random bytes sucessfully', async () => {
      chai.expect(key).to.be.true;
    });

    it('should match request byte length', async () => {
      chai.expect(key.length).to.eql(length);
    });
  });
});
