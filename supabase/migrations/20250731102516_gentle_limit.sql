/*
  # Campus Sphere Initial Database Schema

  1. New Tables
    - `users` - Store all user information (students, teachers, staff, parents, admins)
    - `fee_details` - Student fee information and payment tracking
    - `academic_records` - Student academic performance and grades
    - `documents` - Document requests and approvals
    - `scholarships` - Scholarship applications and status
    - `notifications` - Role-based notification system
    - `academic_materials` - Study materials and resources
    - `tasks` - Staff task assignments and tracking
    - `emails` - Campus email system

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Ensure data isolation between user roles
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'staff', 'parent', 'admin')),
  department text,
  student_id text,
  employee_id text,
  child_id text,
  phone text,
  address text,
  join_date timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fee_details table
CREATE TABLE IF NOT EXISTS fee_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  amount numeric NOT NULL,
  due_date timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'partial')),
  semester text NOT NULL,
  description text,
  paid_amount numeric DEFAULT 0,
  payment_date timestamptz,
  receipt_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create academic_records table
CREATE TABLE IF NOT EXISTS academic_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  subject_code text NOT NULL,
  credits integer NOT NULL,
  grade text NOT NULL,
  marks numeric NOT NULL,
  max_marks numeric NOT NULL,
  semester text NOT NULL,
  year text NOT NULL,
  teacher text NOT NULL,
  attendance numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected', 'processing')),
  request_date timestamptz DEFAULT now(),
  approval_date timestamptz,
  download_url text,
  description text,
  fees numeric DEFAULT 0,
  estimated_days integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('merit', 'need', 'sports', 'cultural')),
  amount numeric NOT NULL,
  status text DEFAULT 'applied' CHECK (status IN ('applied', 'under_review', 'approved', 'rejected')),
  application_date timestamptz DEFAULT now(),
  deadline timestamptz NOT NULL,
  description text NOT NULL,
  eligibility text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  target_role text[] NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  action_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create academic_materials table
CREATE TABLE IF NOT EXISTS academic_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('textbook', 'pdf', 'video', 'lab_manual', 'assignment')),
  subject text NOT NULL,
  semester text NOT NULL,
  download_url text,
  file_size text,
  upload_date timestamptz DEFAULT now(),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  assigned_date timestamptz DEFAULT now(),
  due_date timestamptz NOT NULL,
  completed_date timestamptz,
  assigned_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  to_user_ids uuid[] NOT NULL,
  cc_user_ids uuid[],
  subject text NOT NULL,
  body text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  starred boolean DEFAULT false,
  attachments text[],
  folder text DEFAULT 'inbox' CHECK (folder IN ('inbox', 'sent', 'drafts', 'trash')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Fee details policies
CREATE POLICY "Students can read own fees" ON fee_details
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'parent')
    )
  );

-- Academic records policies
CREATE POLICY "Students can read own records" ON academic_records
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher', 'parent')
    )
  );

-- Documents policies
CREATE POLICY "Users can read own documents" ON documents
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create document requests" ON documents
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Scholarships policies
CREATE POLICY "Students can read own scholarships" ON scholarships
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Students can create scholarship applications" ON scholarships
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can read role-based notifications" ON notifications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = ANY(target_role)
    )
  );

-- Academic materials policies
CREATE POLICY "All authenticated users can read materials" ON academic_materials
  FOR SELECT TO authenticated
  USING (true);

-- Tasks policies
CREATE POLICY "Staff can read own tasks" ON tasks
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Emails policies
CREATE POLICY "Users can read own emails" ON emails
  FOR SELECT TO authenticated
  USING (
    from_user_id = auth.uid() OR
    auth.uid() = ANY(to_user_ids) OR
    auth.uid() = ANY(cc_user_ids)
  );

CREATE POLICY "Users can send emails" ON emails
  FOR INSERT TO authenticated
  WITH CHECK (from_user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_fee_details_user_id ON fee_details(user_id);
CREATE INDEX IF NOT EXISTS idx_academic_records_user_id ON academic_records(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_scholarships_user_id ON scholarships(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_target_role ON notifications USING GIN(target_role);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_from_user_id ON emails(from_user_id);
CREATE INDEX IF NOT EXISTS idx_emails_to_user_ids ON emails USING GIN(to_user_ids);