import { UserRejectedError } from '@/lib/stellar/errors';
import { NetworkMismatchError } from '@/lib/stellar/sep10';

/**
 * Maps an ExecuteDrawer failure to a human-readable message a user can act
 * on. Falls back to the raw error message for anything unclassified, so this
 * never hides diagnostic information — it only replaces the common cases
 * that would otherwise surface as an opaque Horizon result_codes summary or
 * anchor HTTP error string.
 */
export function classifyExecuteError(err: unknown): string {
  const message = err instanceof Error ? err.message : 'Unknown error';

  if (err instanceof NetworkMismatchError) return message;
  if (err instanceof UserRejectedError) return 'Freighter rejected the signature request.';

  const lower = message.toLowerCase();

  if (lower.includes('underfunded') || lower.includes('insufficient')) {
    return 'Horizon rejected the transaction — check your USDC balance.';
  }
  if (lower.includes('op_no_trust') || lower.includes('no trust')) {
    return 'Your wallet does not have a trustline for this asset yet.';
  }
  if (lower.includes('expired')) {
    return 'Anchor challenge expired — refresh and try again.';
  }

  return message;
}
