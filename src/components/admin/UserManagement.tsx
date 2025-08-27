import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Download,
  Upload,
  Shield,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [users] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@campus.edu',
      role: 'student',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2023-08-15',
      lastLogin: '2024-01-14 10:30 AM',
      studentId: 'ST2024001'
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@campus.edu',
      role: 'teacher',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2020-06-01',
      lastLogin: '2024-01-14 09:15 AM',
      employeeId: 'EMP001'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@campus.edu',
      role: 'staff',
      department: 'Administration',
      status: 'active',
      joinDate: '2021-03-15',
      lastLogin: '2024-01-14 08:45 AM',
      employeeId: 'EMP002'
    },
    {
      id: '4',
      name: 'Mary Smith',
      email: 'mary.smith@campus.edu',
      role: 'parent',
      department: 'N/A',
      status: 'active',
      joinDate: '2023-08-20',
      lastLogin: '2024-01-13 07:20 PM',
      childId: 'ST2024001'
    },
    {
      id: '5',
      name: 'Dr. Robert Chen',
      email: 'robert.chen@campus.edu',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      joinDate: '2019-01-10',
      lastLogin: '2024-01-14 11:00 AM',
      employeeId: 'ADM001'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const roles = ['student', 'teacher', 'staff', 'parent', 'admin'];
  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Administration'];

  const getFilteredUsers = () => {
    let filtered = users;
    
    if (filter !== 'all') {
      filtered = filtered.filter(user => user.status === filter);
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-100 text-blue-700',
      teacher: 'bg-green-100 text-green-700',
      staff: 'bg-purple-100 text-purple-700',
      parent: 'bg-orange-100 text-orange-700',
      admin: 'bg-red-100 text-red-700'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'suspended':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'suspended':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleEditUser = (userId: string) => {
    console.log('Editing user:', userId);
    setSelectedUser(users.find(u => u.id === userId) || null);
    setShowEditForm(true);
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Deleting user:', userId);
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // In a real app, this would call the delete API
      alert('User deletion would be implemented here with proper API call');
    }
  };

  const handleViewUser = (userId: string) => {
    console.log('Viewing user:', userId);
    setSelectedUser(users.find(u => u.id === userId) || null);
    setShowUserProfile(true);
  };

  const handleBulkImport = () => {
    setShowBulkImport(true);
  };

  const handleExportUsers = () => {
    // Create CSV export
    const csvContent = [
      ['Name', 'Email', 'Role', 'Department', 'Status', 'Join Date'],
      ...users.map(user => [
        user.name,
        user.email,
        user.role,
        user.department,
        user.status,
        user.joinDate
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: '',
    phone: '',
    address: ''
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the user via Supabase
    console.log('Creating user:', newUser);
    alert('User creation would be implemented with Supabase API');
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'student', department: '', phone: '', address: '' });
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    staff: users.filter(u => u.role === 'staff').length,
    parents: users.filter(u => u.role === 'parent').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">User Management</h1>
            <p className="text-red-100">Manage all campus users, roles, and permissions across the platform.</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{userStats.students}</p>
            <p className="text-sm text-gray-600">Students</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{userStats.teachers}</p>
            <p className="text-sm text-gray-600">Teachers</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{userStats.staff}</p>
            <p className="text-sm text-gray-600">Staff</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{userStats.parents}</p>
            <p className="text-sm text-gray-600">Parents</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{userStats.admins}</p>
            <p className="text-sm text-gray-600">Admins</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={handleBulkImport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button
              onClick={handleExportUsers}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID/Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredUsers().map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500">{user.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.studentId || user.employeeId || user.childId || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined: {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getFilteredUsers().length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UserPlus className="h-6 w-6 text-red-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Add New User</div>
              <div className="text-xs text-gray-500">Create individual user account</div>
            </div>
          </button>

          <button
            onClick={handleBulkImport}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Bulk Import</div>
              <div className="text-xs text-gray-500">Import users from CSV/Excel</div>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="h-6 w-6 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Manage Permissions</div>
              <div className="text-xs text-gray-500">Configure role-based access</div>
            </div>
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
              <button
                onClick={() => setShowAddUser(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newUser.address}
                    onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
              <button
                onClick={() => setShowUserProfile(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedUser.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Login</label>
                  <p className="text-gray-900">{selectedUser.lastLogin}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowUserProfile(false);
                    handleEditUser(selectedUser.id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit User
                </button>
                <button
                  onClick={() => setShowUserProfile(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;