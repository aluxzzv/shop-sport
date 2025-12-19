import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from '@/styles/Form.module.css'

interface Category {
  id: number
  name: string
}

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    brand: '',
    size: '',
    color: '',
    stock_quantity: '0'
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')
    
    if (data) setCategories(data)
    if (error) console.error('Ошибка загрузки категорий:', error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          category_id: parseInt(formData.category_id),
          price: parseFloat(formData.price),
          brand: formData.brand,
          size: formData.size,
          color: formData.color,
          stock_quantity: parseInt(formData.stock_quantity),
          created_at: new Date().toISOString()
        })
        .select()

      if (error) throw error

      setMessage({ type: 'success', text: `Товар "${formData.name}" успешно добавлен! ID: ${data[0].id}` })
      setFormData({
        name: '',
        category_id: '',
        price: '',
        brand: '',
        size: '',
        color: '',
        stock_quantity: '0'
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Ошибка при добавлении товара' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label>Название товара:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className={styles.field}>
        <label>Категория:</label>
        <select
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>Цена (руб.):</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div className={styles.field}>
        <label>Бренд:</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label>Размер:</label>
        <input
          type="text"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label>Цвет:</label>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label>Количество на складе:</label>
        <input
          type="number"
          min="0"
          value={formData.stock_quantity}
          onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
          required
        />
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Добавление...' : 'Добавить товар'}
      </button>
    </form>
  )
}

