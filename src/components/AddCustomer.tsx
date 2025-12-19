import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './Form.css'

export default function AddCustomer() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          registration_date: new Date().toISOString().split('T')[0]
        })
        .select()

      if (error) throw error

      setMessage({ type: 'success', text: `Клиент "${formData.name}" успешно добавлен! ID: ${data[0].id}` })
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: ''
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Ошибка при добавлении клиента' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label>Имя:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Телефон:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Город:</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <button type="submit" disabled={loading} className="button">
        {loading ? 'Добавление...' : 'Добавить клиента'}
      </button>
    </form>
  )
}


