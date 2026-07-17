import { describe, it, expect } from 'vitest';
import { classifyExecuteError } from '@/lib/errors/messages';
import { NetworkMismatchError } from '@/lib/stellar/sep10';

describe('classifyExecuteError', () => {
  it('passes through NetworkMismatchError verbatim', () => {
    const err = new NetworkMismatchError('Mainnet', 'Testnet');
    expect(classifyExecuteError(err)).toBe(err.message);
  });

  it('maps a Horizon underfunded result_codes error to a balance message', () => {
    const err = new Error('Transaction failed: tx_failed: [] | op_underfunded: []');
    expect(classifyExecuteError(err)).toBe(
      'Horizon rejected the transaction — check your USDC balance.'
    );
  });

  it('maps a missing-trustline error to a trustline message', () => {
    const err = new Error('Transaction failed: tx_failed: [] | op_no_trust: []');
    expect(classifyExecuteError(err)).toBe(
      'Your wallet does not have a trustline for this asset yet.'
    );
  });

  it('maps an expired-challenge error to a refresh-and-retry message', () => {
    const err = new Error('SEP-10 challenge expired');
    expect(classifyExecuteError(err)).toBe('Anchor challenge expired — refresh and try again.');
  });

  it('falls back to the raw message for unclassified errors', () => {
    const err = new Error('Something entirely unexpected happened');
    expect(classifyExecuteError(err)).toBe('Something entirely unexpected happened');
  });

  it('falls back to "Unknown error" for a non-Error throw', () => {
    expect(classifyExecuteError('a plain string')).toBe('Unknown error');
  });
});
