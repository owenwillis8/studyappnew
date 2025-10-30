import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://xyjaozeudmwvuuqufdcc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5amFvemV1ZG13dnV1cXVmZGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzIxNDcsImV4cCI6MjA3NzM0ODE0N30.XCJaN5NOce__cTqqjmVWkI0aLcwsTa71sWjhQS3pGYY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
