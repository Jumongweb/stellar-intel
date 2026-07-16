import Link from 'next/link';

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction history</h1>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Coming soon. Once available, this page will list every off-ramp you&apos;ve completed
        through Stellar Intel.
      </p>
      <Link
        href="/offramp"
        className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        Back to off-ramp
      </Link>
    </div>
  );
}
