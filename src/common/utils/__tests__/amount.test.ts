/* eslint-disable spellcheck/spell-checker */
import { NormalizeAmount, NormalizeCurrencyCode, XRPLValueToNFT, NFTValueToXRPL, ValueToIOU } from '../amount';

describe('Utils.Amount', () => {
    describe('XRPLValueToNFT', () => {
        it('should return right values', () => {
            const tests = [
                {
                    value: 4.65661287307739e-10,
                    output: false,
                },
                {
                    value: 12.123,
                    output: false,
                },
                {
                    value: 0.000000000000000000000001,
                    output: false,
                },
                {
                    value: 0.0000000000000000000000000000000000000000000000000000000000000000000001,
                    output: false,
                },
                {
                    value: 7.5128000168e-78,
                    output: false,
                },
                {
                    value: 0.000000000000000000000000000000000000000000000000000000000000000000000000000000001,
                    output: 1,
                },
                {
                    value: 1e-81,
                    output: 1,
                },
                {
                    value: 10e-82,
                    output: 1,
                },
                {
                    value: 0.0000000000000000000000000000000000000000000000000000000000000000000000000000001,
                    output: 100,
                },
                {
                    value: 1000000000000000e-94,
                    output: 100,
                },
                {
                    value: 0.000000000000000000000000000000000000000000000000000000000000000000000000000000031,
                    output: 31,
                },
                {
                    value: 3100000000000000e-95,
                    output: 31,
                },
            ];

            tests.forEach((v) => {
                expect(XRPLValueToNFT(v.value)).toBe(v.output);
            });
        });
    });

    describe('NFTValueToXRPL', () => {
        it('should return right values', () => {
            const balance = 3100000000000000e-95;

            const tests = [
                {
                    balance,
                    value: '31',
                    output: '0.000000000000000000000000000000000000000000000000000000000000000000000000000000031',
                },
                {
                    balance,
                    value: '-31',
                    output: '-0.000000000000000000000000000000000000000000000000000000000000000000000000000000031',
                },
                {
                    balance: undefined,
                    value: '5',
                    output: '0.000000000000000000000000000000000000000000000000000000000000000000000000000000005',
                },
            ];

            tests.forEach((v) => {
                expect(NFTValueToXRPL(v.value, v.balance)).toBe(v.output);
            });
        });
    });

    describe('NormalizeAmount', () => {
        it('should return right values', () => {
            const tests = [
                {
                    value: 10e-82,
                    output: 1,
                },
                {
                    value: 999.0123456789,
                    output: 999.01234568,
                },
                {
                    value: 2e2,
                    output: 200,
                },
            ];
            tests.forEach((v) => {
                expect(NormalizeAmount(v.value)).toBe(v.output);
            });
        });
    });

    describe('NormalizeCurrencyCode', () => {
        it('should return right values', () => {
            const tests = [
                {
                    value: '',
                    output: '',
                },
                {
                    value: 'XRP',
                    output: 'XRP',
                },
                {
                    value: '4D79417765736F6D6543757272656E6379000000',
                    output: 'MyAwesomeCurrency',
                },
                {
                    value: '20416E205852504C204E46543F3F3F3F3F3F3F3F',
                    output: ' An XRPL NFT????????',
                },
                {
                    value: 'xrp',
                    output: 'FakeXRP',
                },
                {
                    value: 'xrP',
                    output: 'FakeXRP',
                },
                {
                    value: 'CSC',
                    output: 'CSC',
                },
                {
                    value: '5852500000000000000000000000000000000000',
                    output: 'FakeXRP',
                },
                {
                    value: '021D001703B37004416E205852504C204E46543F',
                    output: 'An XRPL NFT?',
                },
                {
                    value: '4A65727279436F696E0000000000000000000000',
                    output: 'JerryCoin',
                },
            ];
            tests.forEach((v) => {
                expect(NormalizeCurrencyCode(v.value)).toBe(v.output);
            });
        });
    });

    describe('ValueToIOU', () => {
        it('should raise error', () => {
            expect(() => ValueToIOU(undefined)).toThrowError('Value is not valid string!');
            // @ts-ignore
            expect(() => ValueToIOU(0.1)).toThrowError('Value is not valid string!');
            // @ts-ignore
            expect(() => ValueToIOU(0)).toThrowError('Value is not valid string!');
            expect(() => ValueToIOU('99999999999999999.1234566')).toThrowError('Amount too high to reliably slice!');
        });
        it('should return right values', () => {
            const tests = [
                {
                    value: '123.123',
                    output: '123.123',
                },
                {
                    value: '1337',
                    output: '1337',
                },
                {
                    value: '1234567891011123.123456',
                    output: '1234567891011123',
                },
                {
                    value: '90000000',
                    output: '90000000',
                },
                {
                    value: '1234567.1234567891011',
                    output: '1234567.123456789',
                },
                {
                    value: '0.0000000000000001',
                    output: '0',
                },
                {
                    value: '0.1230000000000000000001',
                    output: '0.123',
                },
                {
                    value: '9999999999999999.1',
                    output: '9999999999999999',
                },
            ];
            tests.forEach((v) => {
                expect(ValueToIOU(v.value)).toBe(v.output);
            });
        });
    });
});
