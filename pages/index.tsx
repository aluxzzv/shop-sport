import { useState } from 'react'
import Head from 'next/head'
import CreateOrder from '@/components/CreateOrder'
import AddProduct from '@/components/AddProduct'
import AddCustomer from '@/components/AddCustomer'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'order' | 'product' | 'customer'>('order')

  return (
    <>
      <Head>
        <title>Спортивный магазин - Управление</title>
        <meta name="description" content="Управление заказами, товарами и клиентами" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Спортивный магазин</h1>
          <p className={styles.description}>Управление заказами, товарами и клиентами</p>
          
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'order' ? styles.active : ''}`}
              onClick={() => setActiveTab('order')}
            >
              Создать заказ
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'product' ? styles.active : ''}`}
              onClick={() => setActiveTab('product')}
            >
              Добавить товар
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'customer' ? styles.active : ''}`}
              onClick={() => setActiveTab('customer')}
            >
              Добавить клиента
            </button>
          </div>

          <div className={styles.content}>
            {activeTab === 'order' && <CreateOrder />}
            {activeTab === 'product' && <AddProduct />}
            {activeTab === 'customer' && <AddCustomer />}
          </div>

          <div className={styles.datalens}>
            <p>Дашборд DataLens:</p>
            <a 
              href="https://datalens.yandex/7rt4wwwezvi6r" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              Открыть дашборд
            </a>
          </div>
        </div>
      </main>
    </>
  )
}


