import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

const badges = [
  'CI/CD Automation',
  'Realtime Dashboard',
  'Motion UI',
  'Cloud Native',
  'Team Play',
  'Secure Auth',
  'AI Assisted',
  'Design System',
];

const columns = 3;
const rows = 8;

const buildGrid = () => {
  const base = Array.from({ length: columns }, () => [] as string[]);
  let pointer = 0;
  for (let i = 0; i < rows; i++) {
    base[pointer].push(badges[i % badges.length]);
    pointer = (pointer + 1) % columns;
  }
  return base;
};

const cardVariants: Variants = {
  initial: (delay: number) => ({ opacity: 0, y: 10, scale: 0.98, transition: { delay } }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  hover: { scale: 1.03, y: -4 },
};

const ShowcaseWall = () => {
  const grid = useMemo(buildGrid, []);

  return (
    <div className="pointer-events-none absolute inset-0 hidden" aria-hidden="true">
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        {grid.map((col, columnIndex) => (
          <div key={`col-${columnIndex}`} className="space-y-6">
            {col.map((label, rowIndex) => {
              const delay = columnIndex * 0.12 + rowIndex * 0.04;
              return (
                <motion.div
                  key={`${label}-${rowIndex}`}
                  className="pointer-events-auto rounded-2xl border border-primary-100/40 bg-white/80 px-4 py-2 text-sm font-medium text-secondary-700 shadow-lg shadow-primary-200/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:shadow-black/30"
                  custom={delay}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"></span>
                    {label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseWall;

