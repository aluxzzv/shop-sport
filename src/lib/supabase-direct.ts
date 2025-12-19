const SUPABASE_URL = 'https://lehihjdhzndarctkqkjq.supabase.co'

interface QueryOptions {
  select?: string
  filter?: Record<string, any>
  orderBy?: string
  limit?: number
}

export const supabase = {
  async from(table: string) {
    return {
      select: async (columns: string = '*', options?: QueryOptions) => {
        try {
          let url = `${SUPABASE_URL}/rest/v1/${table}?select=${columns}`
          
          if (options?.orderBy) {
            url += `&order=${options.orderBy}`
          }
          if (options?.limit) {
            url += `&limit=${options.limit}`
          }
          if (options?.filter) {
            Object.entries(options.filter).forEach(([key, value]) => {
              url += `&${key}=eq.${value}`
            })
          }

          const response = await fetch(url, {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            }
          })

          if (!response.ok) {
            const error = await response.text()
            return { data: null, error: { message: error } }
          }

          const data = await response.json()
          return { data, error: null }
        } catch (error: any) {
          return { data: null, error }
        }
      },

      insert: async (values: Record<string, any> | Record<string, any>[]) => {
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(Array.isArray(values) ? values : [values])
          })

          if (!response.ok) {
            const error = await response.text()
            return { data: null, error: { message: error } }
          }

          const data = await response.json()
          return { data: Array.isArray(values) ? data : data[0], error: null }
        } catch (error: any) {
          return { data: null, error }
        }
      },

      update: async (values: Record<string, any>, filter: Record<string, any>) => {
        try {
          let url = `${SUPABASE_URL}/rest/v1/${table}?`
          Object.entries(filter).forEach(([key, value], index) => {
            if (index > 0) url += '&'
            url += `${key}=eq.${value}`
          })

          const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.default',
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(values)
          })

          if (!response.ok) {
            const error = await response.text()
            return { data: null, error: { message: error } }
          }

          const data = await response.json()
          return { data, error: null }
        } catch (error: any) {
          return { data: null, error }
        }
      }
    }
  }
}


