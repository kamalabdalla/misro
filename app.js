require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/dbConfig');

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const savings_accountsRoute = require('./routes/savings_accountsRoute');
const groupsRoutes = require('./routes/groupsRoutes');
const groupMemberRoutes = require('./routes/groupMemberRoutes');
const auditLogsRoutes = require('./routes/auditLogsRoute');
const financialEducationRoutes = require('./routes/financialEducationRoute');
const savingsTransactionRoutes = require('./routes/savingsTransactionsRoute');
const programEnrollmentRoutes = require('./routes/programEnrollmentRoute');
const loansRoutes = require('./routes/loansRoute');
const loanRepaymentsRoutes = require('./routes/loanRepaymentsRoute');
const insurancePoliciesRoutes = require('./routes/insurancePoliciesRoute');
const insuranceClaimsRoutes = require('./routes/insuranceClaimsRoute');
const loginRoute = require('./routes/loginRoute');

// Authentication and Authorization Middlewares
const { authenticate } = require('./middlewares/authMiddleware');

// Middleware
app.use(express.json()); // Parse JSON bodies

// Apply Authentication and Authorization Middleware to specific routes
app.use('/api/auth', loginRoute);
app.use(authenticate); // Ensure this is a middleware function
app.use('/api/users', usersRoutes);
app.use('/api/savings-accounts', savings_accountsRoute);
app.use('/api/groups', groupsRoutes);
app.use('/api/group-members', groupMemberRoutes);
app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/financial-education', financialEducationRoutes);
app.use('/api/savings-transactions', savingsTransactionRoutes);
app.use('/api/program-enrollments', programEnrollmentRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/loan-repayments', loanRepaymentsRoutes);
app.use('/api/insurance-policies', insurancePoliciesRoutes);
app.use('/api/insurance-claims', insuranceClaimsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
