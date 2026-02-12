import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xttkxcybwedllxcqmuvl.supabase.co';
const supabaseAnonKey = 'sb_publishable_LFs5HxUfRd1HXiQSoyhMJw_VvYYhOKQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
