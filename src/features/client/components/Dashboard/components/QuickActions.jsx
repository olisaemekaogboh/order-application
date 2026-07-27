import { motion } from 'framer-motion'

export default function QuickActions({ actions = [] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action) => (
          <motion.div
            key={action.id}

            whileHover={{
              y: -5,
            }}

            className="
                        rounded-2xl
                        border
                        border-slate-200
                        dark:border-slate-800
                        bg-white
                        dark:bg-slate-900
                        p-6
                        shadow-sm
                    "
          >
            <h3 className="font-semibold text-lg">{action.label}</h3>

            <p className="text-sm text-slate-500 mt-2">{action.description}</p>

            <button
              onClick={action.onClick}

              className="
                            mt-6
                            w-full
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            font-medium
                        "
            >
              Open
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
