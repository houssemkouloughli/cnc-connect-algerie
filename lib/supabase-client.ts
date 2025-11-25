import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Quote = {
  id: string
  user_id: string
  file_name: string
  file_url?: string | null
  geometry_data: any
  dfm_analysis: any
  config: any
  price_breakdown: any
  status: 'draft' | 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export type Order = {
  id: string
  quote_id: string
  user_id: string
  workshop_id?: string
  total_price: number
  status: 'pending' | 'confirmed' | 'in_production' | 'completed' | 'cancelled'
  payment_status: 'unpaid' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
}

export type Workshop = {
  id: string
  name: string
  city: string
  specialties: string[]
  capacity: number
  rating: number
  certifications: string[]
  created_at: string
}

// API Functions
export async function uploadFile(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `uploads/${fileName}`

  const { data, error } = await supabase.storage
    .from('stl-files')
    .upload(filePath, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('stl-files')
    .getPublicUrl(filePath)

  return { path: filePath, url: urlData.publicUrl }
}

export async function saveQuote(quoteData: Partial<Quote>) {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quoteData])
    .select()

  if (error) throw error
  return data[0]
}

export async function getQuotes(userId: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createOrder(orderData: Partial<Order>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()

  if (error) throw error
  return data[0]
}

export async function getWorkshops() {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .order('rating', { ascending: false })

  if (error) throw error
  return data
}
