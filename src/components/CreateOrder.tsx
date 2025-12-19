import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Form.css'

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
}

interface Customer {
  id: number
  name: string
  email: string
}

export default function CreateOrder() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',
    quantity: '1',
    status: 'pending',
    payment_method: 'card'
  })

  useEffect(() => {
    loadCustomers()
    loadProducts()
  }, [])

  const loadCustomers = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('id, name, email')
      .order('name')
    
    if (data) setCustomers(data)
    if (error) console.error('Ошибка загрузки клиентов:', error)
  }

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, stock_quantity')
      .gt('stock_quantity', 0)
      .order('name')
    
    if (data) setProducts(data)
    if (error) console.error('Ошибка загрузки товаров:', error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const selectedProduct = products.find(p => p.id === parseInt(formData.product_id))
      if (!selectedProduct) {
        throw new Error('Товар не найден')
      }

      if (parseInt(formData.quantity) > selectedProduct.stock_quantity) {
        throw new Error(`Недостаточно товара на складе. Доступно: ${selectedProduct.stock_quantity}`)
      }

      const totalPrice = selectedProduct.price * parseFloat(formData.quantity)

      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_id: parseInt(formData.customer_id),
          product_id: parseInt(formData.product_id),
          quantity: parseInt(formData.quantity),
          total_price: totalPrice,
          order_date: new Date().toISOString(),
          status: formData.status,
          payment_method: formData.payment_method
        })
        .select()

      if (error) throw error

      const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: selectedProduct.stock_quantity - parseInt(formData.quantity) })
        .eq('id', parseInt(formData.product_id))

      if (updateError) throw updateError

      setMessage({ type: 'success', text: `Заказ создан успешно! ID: ${data[0].id}, Сумма: ${totalPrice.toFixed(2)} руб.` })
      setFormData({ customer_id: '', product_id: '', quantity: '1', status: 'pending', payment_method: 'card' })
      loadProducts()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Ошибка при создании заказа' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label>Клиент:</label>
        <select
          value={formData.customer_id}
          onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
          required
        >
          <option value="">Выберите клиента</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Товар:</label>
        <select
          value={formData.product_id}
          onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
          required
        >
          <option value="">Выберите товар</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.price} руб. (Остаток: {product.stock_quantity})
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Количество:</label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </div>

      <div className="field">
        <label>Статус:</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">Ожидает</option>
          <option value="processing">В обработке</option>
          <option value="completed">Завершен</option>
          <option value="cancelled">Отменен</option>
        </select>
      </div>

      <div className="field">
        <label>Способ оплаты:</label>
        <select
          value={formData.payment_method}
          onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
        >
          <option value="card">Карта</option>
          <option value="cash">Наличные</option>
          <option value="online">Онлайн</option>
        </select>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <button type="submit" disabled={loading} className="button">
        {loading ? 'Создание...' : 'Создать заказ'}
      </button>
    </form>
  )
}


