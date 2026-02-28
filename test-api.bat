@echo off
setlocal enabledelayedexpansion

echo Testing Student Management API...
echo.

REM Test 1: Login
echo [TEST 1] Login Request
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/login' -Method POST -ContentType 'application/json' -Body '{\"username\":\"admin\",\"password\":\"admin123\"}' | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 2: Get all students (should be empty initially)
echo [TEST 2] Get All Students (Initial)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students' -Method GET | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 3: Create a student
echo [TEST 3] Create Student
powershell -Command "$body = @{firstName='John';lastName='Doe';email='john.doe@example.com';phone='1234567890';dateOfBirth='2000-01-15';address='123 Elm St';major='Computer Science';status='active'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:3000/api/students' -Method POST -ContentType 'application/json' -Body $body"
echo.
timeout /t 1 /nobreak > nul

REM Test 4: Create another student
echo [TEST 4] Create Second Student
powershell -Command "$body = @{firstName='Jane';lastName='Smith';email='jane.smith@example.com';phone='9876543210';dateOfBirth='2001-05-20';address='456 Oak Ave';major='Engineering';status='active'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:3000/api/students' -Method POST -ContentType 'application/json' -Body $body"
echo.
timeout /t 1 /nobreak > nul

REM Test 5: Get all students
echo [TEST 5] Get All Students (After Creation)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students' -Method GET | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 6: Get specific student
echo [TEST 6] Get Student by ID (ID=1)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students/1' -Method GET | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 7: Update student
echo [TEST 7] Update Student (ID=1)
powershell -Command "$body = @{firstName='Jonathan';lastName='Doe';email='jonathan.doe@example.com';phone='1111111111';major='Data Science'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:3000/api/students/1' -Method PUT -ContentType 'application/json' -Body $body"
echo.
timeout /t 1 /nobreak > nul

REM Test 8: Get updated student
echo [TEST 8] Get Updated Student (ID=1)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students/1' -Method GET | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 9: Delete student
echo [TEST 9] Delete Student (ID=2)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students/2' -Method DELETE | ConvertTo-Json"
echo.
timeout /t 1 /nobreak > nul

REM Test 10: Verify deletion
echo [TEST 10] Get All Students (After Deletion)
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3000/api/students' -Method GET | ConvertTo-Json"
echo.

echo All tests completed!
pause
