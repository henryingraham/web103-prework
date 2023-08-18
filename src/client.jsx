import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY
export const supabase = createClient('https://ihlubchkmsryzuvmwfrl.supabase.co', API_KEY);