import { motion } from 'framer-motion';

const orbitRings = [
  { size: 220, duration: 36, delay: 0 },
  { size: 320, duration: 48, delay: 2 },
  { size: 420, duration: 60, delay: 4 },
];

const glowBlobs = [
  { x: '10%', y: '15%', size: 180, color: 'from-primary-300/30 via-primary-500/20 to-transparent' },
  { x: '70%', y: '10%', size: 220, color: 'from-secondary-300/30 via-secondary-500/20 to-transparent' },
  { x: '30%', y: '70%', size: 160, color: 'from-primary-200/20 via-secondary-200/30 to-transparent' },
];

const floatingBadges = [
  { label: 'Realtime Dashboard', delay: 0 },
  { label: 'Micro Interaction', delay: 1.2 },
  { label: 'React + Astro', delay: 2.4 },
];

type OrbitShowcaseProps = {
  minimal?: boolean;
};

export default function OrbitShowcase({ minimal = false }: OrbitShowcaseProps) {
  return (
    <div className="absolute inset-0 overflow-visible" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 via-white/40 to-secondary-400/20 dark:from-primary-500/10 dark:via-secondary-900/60 dark:to-black/70 blur-3xl transition-colors duration-300" />

      {glowBlobs.map((blob) => (
        <motion.span
          key={`${blob.x}${blob.y}`}
          className={`absolute rounded-full bg-gradient-to-br ${blob.color} blur-3xl`}
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{ scale: [0.9, 1.1, 0.95] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        {orbitRings.map((ring) => (
          <motion.div
            key={ring.size}
            className="absolute rounded-full border border-white/30 shadow-inner shadow-primary-500/30"
            style={{ width: ring.size, height: ring.size }}
            animate={{ rotate: 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear', delay: ring.delay }}
          >
            <motion.span
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 shadow-lg shadow-primary-500/30"
              animate={{ rotate: -360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear', delay: ring.delay }}
            />
          </motion.div>
        ))}
      </div>

      {!minimal && (
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className="space-y-6">
            {floatingBadges.map((badge) => (
              <motion.div
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-2xl border border-secondary-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-primary-500/20 backdrop-blur dark:border-secondary-700 dark:bg-secondary-900/80 dark:text-gray-100 dark:shadow-primary-900/30 transition-colors duration-300"
                animate={{ y: [0, -18, 0], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                {badge.label}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pointer-events-auto max-w-xs rounded-3xl border border-secondary-200 bg-white/90 p-4 text-left text-gray-900 shadow-2xl backdrop-blur dark:border-secondary-700 dark:bg-secondary-900/80 dark:text-gray-100 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Live Animation</p>
            <p className="mt-3 text-lg font-bold text-gray-900 dark:text-white">React Motion Layer</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Orbit visualizer ini dirender dengan React di atas layout Astro untuk
              menambahkan nuansa futuristik pada hero section.
            </p>
            <motion.div
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary-200"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>Explore motion</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

