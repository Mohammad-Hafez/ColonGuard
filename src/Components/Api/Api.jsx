import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gheehkolmwuffdreiijw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZWVoa29sbXd1ZmZkcmVpaWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3NDUxOTIsImV4cCI6MTk5OTMyMTE5Mn0.B7MQNWcPyNTpcGaCNOa1peefo8SNcyPR3rfnA-puNAw';
const supabase = createClient(
                        supabaseUrl,
                        supabaseKey
                );
export default supabase; 





