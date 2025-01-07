export const developmentConfig = {
  mockUsers: [
    {
      email: 'admin@test.cz',
      roles: ['admin'],
      permissions: ['/admin/dashboard']
    },
    {
      email: 'normal@test.cz',
      roles: ['user'],
      permissions: ['/dashboard']
    }
  ]
}; 