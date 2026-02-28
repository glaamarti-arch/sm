# Deployment Guide for Vercel

## Overview
This Student Management System is configured for deployment on Vercel with serverless functions.

## Pre-deployment Checklist

✅ All APIs tested and working locally
✅ Database initialized with SQLite
✅ Authentication implemented  
✅ All CRUD operations functional
✅ Environment configured for production

## Deployment Steps

### 1. Connect to Vercel

```bash
# If you don't have Vercel CLI installed
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel
```

### 2. Environment Variables

Configure these in Vercel Dashboard > Settings > Environment Variables:

```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### 3. Database Configuration

SQLite is used for simplicity. The database file will be created at runtime in `/tmp` directory which is writable on Vercel.

**For production with persistent data**, consider:
- Using Vercel Postgres (recommended)
- Using external PostgreSQL database
- Using MongoDB Atlas

### 4. API Testing on Vercel

After deployment, test these endpoints:

```bash
# Test login
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get all students
curl https://your-domain.vercel.app/api/students

# Create student
curl -X POST https://your-domain.vercel.app/api/students \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","status":"active"}'

# Get specific student
curl https://your-domain.vercel.app/api/students/1

# Update student
curl -X PUT https://your-domain.vercel.app/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jonathan"}'

# Delete student
curl -X DELETE https://your-domain.vercel.app/api/students/1
```

## Important Notes

### SQLite on Vercel
- Data persists in `.next` cache (cleared on redeploy)
- For production, use external database (PostgreSQL, MongoDB)
- Current setup is suitable for demos/testing

### Cold Starts
- First request may be slower due to serverless cold starts
- Subsequent requests will be faster
- Consider upgrading Vercel plan for faster performance

### File System
- `/tmp` directory is writable on Vercel
- Database file location: `process.cwd()/data/students.db`
- Files outside working directory may not persist

## Troubleshooting

### Database Not Found
- Ensure `.gitignore` doesn't block database creation
- Check write permissions in Vercel Function
- Consider using environment-specific database path

### Import Errors
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `next build`
- Redeploy

### Performance Issues
- Check Vercel Function duration in logs
- Optimize database queries
- Consider database indexing

## Next Steps

For persistent production data:

1. **Switch to Vercel Postgres**
   ```bash
   vercel env add DATABASE_URL
   # Use Vercel Postgres in Dashboard
   ```

2. **Use PostgreSQL**
   - Set `DATABASE_URL` environment variable
   - Update `app/api/db/db.ts` to use `pg` instead of `better-sqlite3`

3. **Use MongoDB**
   - Connect to MongoDB Atlas
   - Update database layer to use MongoDB driver

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel PostgreSQL](https://vercel.com/storage/postgres)
- [Next.js Database Options](https://nextjs.org/docs/getting-started/databases)
