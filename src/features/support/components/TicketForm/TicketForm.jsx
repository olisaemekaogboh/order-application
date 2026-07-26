import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSupport } from '../../hooks/useSupport'
import Input from '@/shared/components/ui/Input/Input'
import Textarea from '@/shared/components/ui/Textarea/Textarea'
import Select from '@/shared/components/ui/Select/Select'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import { TICKET_ROUTES, TICKET_CATEGORIES_LABELS, TICKET_PRIORITIES_LABELS } from '../../constants'

const TicketForm = () => {
  const navigate = useNavigate()
  const { createTicket, loading } = useSupport()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM',
  })
  const [errors, setErrors] = useState({})

  const categoryOptions = Object.entries(TICKET_CATEGORIES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const priorityOptions = Object.entries(TICKET_PRIORITIES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for the field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.priority) newErrors.priority = 'Priority is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await createTicket(formData)
      navigate(TICKET_ROUTES.LIST)
    } catch (error) {
      // error handled in hook
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Support Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            disabled={submitting}
            placeholder="Brief summary of your issue"
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
            disabled={submitting}
            rows={5}
            placeholder="Please provide details about your issue..."
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            error={errors.category}
            disabled={submitting}
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            error={errors.priority}
            disabled={submitting}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(TICKET_ROUTES.LIST)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default TicketForm
