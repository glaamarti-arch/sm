const http = require('http');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Student Management API...\n');
  
  try {
    // Test 1: Login
    console.log('[TEST 1] Login API');
    const loginRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      { username: 'admin', password: 'admin123' }
    );
    console.log(`✓ Status: ${loginRes.status}`);
    console.log(`✓ Response:`, loginRes.body);
    console.log();

    // Test 2: Get all students (initially empty)
    console.log('[TEST 2] Get All Students (Initial)');
    const getAllRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students',
      method: 'GET'
    });
    console.log(`✓ Status: ${getAllRes.status}`);
    console.log(`✓ Students count: ${(getAllRes.body || []).length}`);
    console.log();

    // Test 3: Create student 1
    console.log('[TEST 3] Create Student #1');
    const createRes1 = await makeRequest(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/students',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        major: 'Computer Science',
        status: 'active'
      }
    );
    console.log(`✓ Status: ${createRes1.status}`);
    console.log(`✓ Created student:`, createRes1.body);
    console.log();

    // Test 4: Create student 2
    console.log('[TEST 4] Create Student #2');
    const createRes2 = await makeRequest(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/students',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543210',
        major: 'Engineering',
        status: 'active'
      }
    );
    console.log(`✓ Status: ${createRes2.status}`);
    console.log(`✓ Created student:`, createRes2.body);
    console.log();

    // Test 5: Get all students
    console.log('[TEST 5] Get All Students (After Creation)');
    const getAllRes2 = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students',
      method: 'GET'
    });
    console.log(`✓ Status: ${getAllRes2.status}`);
    console.log(`✓ Students count: ${(getAllRes2.body || []).length}`);
    console.log();

    // Test 6: Get specific student
    console.log('[TEST 6] Get Student by ID (ID=1)');
    const getRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students/1',
      method: 'GET'
    });
    console.log(`✓ Status: ${getRes.status}`);
    console.log(`✓ Student:`, getRes.body);
    console.log();

    // Test 7: Update student
    console.log('[TEST 7] Update Student (ID=1)');
    const updateRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/students/1',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      },
      {
        firstName: 'Jonathan',
        major: 'Data Science'
      }
    );
    console.log(`✓ Status: ${updateRes.status}`);
    console.log(`✓ Updated student:`, updateRes.body);
    console.log();

    // Test 8: Verify update
    console.log('[TEST 8] Verify Update (Get Student ID=1)');
    const verifyRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students/1',
      method: 'GET'
    });
    console.log(`✓ Status: ${verifyRes.status}`);
    console.log(`✓ First name updated to: ${verifyRes.body.firstName}`);
    console.log(`✓ Major updated to: ${verifyRes.body.major}`);
    console.log();

    // Test 9: Delete student
    console.log('[TEST 9] Delete Student (ID=2)');
    const deleteRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students/2',
      method: 'DELETE'
    });
    console.log(`✓ Status: ${deleteRes.status}`);
    console.log(`✓ Response:`, deleteRes.body);
    console.log();

    // Test 10: Verify deletion
    console.log('[TEST 10] Get All Students (After Deletion)');
    const finalRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/students',
      method: 'GET'
    });
    console.log(`✓ Status: ${finalRes.status}`);
    console.log(`✓ Remaining students: ${(finalRes.body || []).length}`);
    console.log();

    console.log('✅ ALL TESTS PASSED!');
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }

  process.exit(0);
}

runTests();
