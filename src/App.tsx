import { useState } from 'react'
import CreateOrder from './components/CreateOrder'
import AddProduct from './components/AddProduct'
import AddCustomer from './components/AddCustomer'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'order' | 'product' | 'customer'>('order')

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="title">Спортивный магазин</h1>
        <p className="description">Управление заказами, товарами и клиентами</p>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'order' ? 'active' : ''}`}
            onClick={() => setActiveTab('order')}
          >
            Создать заказ
          </button>
          <button 
            className={`tab ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => setActiveTab('product')}
          >
            Добавить товар
          </button>
          <button 
            className={`tab ${activeTab === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveTab('customer')}
          >
            Добавить клиента
          </button>
        </div>

        <div className="content">
          {activeTab === 'order' && <CreateOrder />}
          {activeTab === 'product' && <AddProduct />}
          {activeTab === 'customer' && <AddCustomer />}
        </div>

        <div className="datalens">
          <p>Дашборд DataLens:</p>
          <a 
            href="https://datalens.yandex/7rt4wwwezvi6r" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link"
          >
            Открыть дашборд
          </a>
        </div>
      </div>
    </div>
  )
}

export default App


