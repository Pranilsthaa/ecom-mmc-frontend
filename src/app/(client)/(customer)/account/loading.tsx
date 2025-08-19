export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="mb-8">
        <div className="h-4 bg-[var(--color-muted)] rounded w-32 mb-2"></div>
        <div className="h-8 bg-[var(--color-muted)] rounded w-64 mb-2"></div>
        <div className="h-4 bg-[var(--color-muted)] rounded w-48"></div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="card p-4">
            <div className="space-y-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-[var(--color-muted)] rounded"
                ></div>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="card p-6">
            <div className="h-6 bg-[var(--color-muted)] rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-[var(--color-muted)] rounded"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
