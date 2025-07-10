-- Enable pgvector extension
create extension if not exists vector;

-- Users table
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  auth_id text not null unique,
  email text not null unique,
  name text,
  plan text default 'free',
  created_at timestamptz default now()
);

-- Leads table
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  source text,
  email text,
  name text,
  intent text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Projects table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  title text,
  status text default 'active',
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tasks table
create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  title text,
  description text,
  due_date date,
  status text default 'todo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Client messages table
create table if not exists public.client_messages (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  message text,
  role text, -- 'client' | 'assistant' | 'user'
  vector vector(1536),
  created_at timestamptz default now()
);

-- Vector index for semantic search
create index if not exists client_messages_vector_idx on public.client_messages using ivfflat (vector) with (lists = 100);
