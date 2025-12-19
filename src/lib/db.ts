import { Pool } from 'pg'

const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'db.lehihjdhzndarctkqkjq.supabase.co',
  port: 5432,
  database: import.meta.env.VITE_DB_NAME || 'postgres',
  user: import.meta.env.VITE_DB_USER || 'postgres',
  password: import.meta.env.VITE_DB_PASSWORD || 'mazsAx-ragja4-bunqan',
  ssl: {
    rejectUnauthorized: false
  }
}

export const pool = new Pool(dbConfig)

export const db = {
  async query(text: string, params?: any[]) {
    const start = Date.now()
    try {
      const res = await pool.query(text, params)
      const duration = Date.now() - start
      console.log('Executed query', { text, duration, rows: res.rowCount })
      return res
    } catch (error) {
      console.error('Database query error', error)
      throw error
    }
  },
  
  async from(table: string) {
    return {
      select: async (columns: string = '*') => {
        const query = `SELECT ${columns} FROM public.${table}`
        const result = await pool.query(query)
        return { data: result.rows, error: null }
      },
      
      insert: async (data: Record<string, any>) => {
        const keys = Object.keys(data)
        const values = Object.values(data)
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')
        const query = `INSERT INTO public.${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`
        try {
          const result = await pool.query(query, values)
          return { data: result.rows, error: null }
        } catch (error: any) {
          return { data: null, error }
        }
      },
      
      update: async (data: Record<string, any>, conditions: Record<string, any>) => {
        const setClause = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ')
        const whereKeys = Object.keys(conditions)
        const whereClause = whereKeys.map((key, i) => `${key} = $${Object.keys(data).length + i + 1}`).join(' AND ')
        const values = [...Object.values(data), ...Object.values(conditions)]
        const query = `UPDATE public.${table} SET ${setClause} WHERE ${whereClause} RETURNING *`
        try {
          const result = await pool.query(query, values)
          return { data: result.rows, error: null }
        } catch (error: any) {
          return { data: null, error }
        }
      }
    }
  }
}


