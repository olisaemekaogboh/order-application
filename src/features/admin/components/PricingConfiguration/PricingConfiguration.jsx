import React, { useState, useEffect } from 'react'
import { useAdmin } from '@/features/admin/hooks/useAdmin'
import PricingConfigForm from '../PricingConfigForm/PricingConfigForm'
import Button from '@/shared/components/ui/Button/Button'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { VEHICLE_TYPES_LABELS } from '../../../drivers/constants'
import toast from 'react-hot-toast'

const PricingConfiguration = () => {
  const { pricingConfigs, loading, fetchPricingConfigs, deletePricingConfig } = useAdmin()
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPricingConfigs()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Delete this pricing configuration?')) {
      await deletePricingConfig(id)
    }
  }

  if (loading && pricingConfigs.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Pricing Configuration
      </h1>

      <PricingConfigForm editingId={editingId} onCancel={() => setEditingId(null)} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Existing Configurations
        </h2>
        <div className="space-y-4">
          {pricingConfigs.map((config) => (
            <div
              key={config.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {VEHICLE_TYPES_LABELS[config.vehicleType] || config.vehicleType}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Base: ₦{config.baseRatePerKm}/km | Min: ₦{config.minimumCharge}
                  {config.active && (
                    <span className="ml-2 text-green-600 dark:text-green-400">• Active</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setEditingId(config.id)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(config.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {pricingConfigs.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No pricing configurations</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PricingConfiguration
