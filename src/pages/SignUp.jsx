import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import { InputField, DropdownField } from '../components/FormComponents';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    faculty: '',
    department: '',
    regNo: '',
    level: '100',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  // State for the normalized data and loading status
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data fetching and normalization
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}school_management_api/registration_choices/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const apiResponse = await response.json();
        
        // Normalize the data for efficient lookups
        const normalized = {
          schoolOptions: [],
          facultiesBySchool: {},
          departmentsByFaculty: {}
        };

        apiResponse.schools.forEach(school => {
          // Populate School Options array
          normalized.schoolOptions.push({ code: school.code, full_name: school.full_name });

          // Initialize faculty array for this school
          normalized.facultiesBySchool[school.code] = [];

          school.faculties.forEach(faculty => {
            // Add faculty to the school's faculty list
            normalized.facultiesBySchool[school.code].push({
              code: faculty.code,
              full_name: faculty.full_name
            });

            // Populate departments map by faculty code
            normalized.departmentsByFaculty[faculty.code] = faculty.departments.map(dept => ({
              code: dept.code,
              full_name: dept.full_name
            }));
          });
        });

        setData(normalized);
        setLoading(false);
      } catch (err) {
        setError('Failed to load registration options. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Chained dropdown handlers
  const handleSchoolChange = (e) => {
    const schoolCode = e.target.value;
    setFormData(prev => ({
      ...prev,
      school: schoolCode,
      faculty: '', // Reset faculty
      department: '' // Reset department
    }));
  };

  const handleFacultyChange = (e) => {
    const facultyCode = e.target.value;
    setFormData(prev => ({
      ...prev,
      faculty: facultyCode,
      department: '' // Reset department
    }));
  };

  // Calculate options for chained dropdowns
  const facultyOptions = formData.school && data
    ? data.facultiesBySchool[formData.school] || []
    : [];

  const departmentOptions = formData.faculty && data
    ? data.departmentsByFaculty[formData.faculty] || []
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (!formData.profilePicture) {
      setError("Please upload a profile picture!");
      return;
    }
    
    // Check if all required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.school || !formData.faculty || !formData.department || 
        !formData.regNo || !formData.level || !formData.password) {
      setError("Please fill in all required fields!");
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('matric_number', formData.regNo);
      submitData.append('password', formData.password);
      submitData.append('confirm_password', formData.password);
      submitData.append('first_name', formData.firstName);
      submitData.append('last_name', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('school', formData.school);
      submitData.append('faculty', formData.faculty);
      submitData.append('department', formData.department);
      submitData.append('level', formData.level);
      submitData.append('profile_picture', formData.profilePicture);
      
      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of submitData.entries()) {
        console.log(key, value);
      }
      
      // Send request to the API
      const response = await fetch(`${BASE_URL}user_profile_api/register/`, {
        method: 'POST',
        body: submitData
      });
      
      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response body:", result);
      
      if (response.ok && response.status === 201) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle validation errors
        let errorMessage = 'Registration failed. Please check your inputs.';
        
        // Handle different error response formats
        if (result) {
          if (typeof result === 'object') {
            if (result.detail) {
              errorMessage = result.detail;
            } else {
              // Try to extract field-specific errors
              const errorFields = Object.keys(result);
              if (errorFields.length > 0) {
                const firstErrorField = errorFields[0];
                const firstErrorValue = result[firstErrorField];
                
                if (Array.isArray(firstErrorValue) && firstErrorValue.length > 0) {
                  errorMessage = `${firstErrorField}: ${firstErrorValue[0]}`;
                } else {
                  errorMessage = `${firstErrorField}: ${firstErrorValue}`;
                }
              }
            }
          } else if (typeof result === 'string') {
            errorMessage = result;
          }
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <LandingNav />
      
      {/* Decorative top wave - hidden on mobile for better performance */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-[#EEF1FF] -z-10 hidden sm:block">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#F5F5F5"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Sign up form */}
      <div className="max-w-md mx-auto px-4 sm:px-6 pt-16 pb-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">Sign up</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md border border-green-300 text-sm">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            
            <InputField
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />

          {loading ? (
            <div className="text-center py-4 text-primary-custom font-medium">
              Loading academic options...
            </div>
          ) : (
            <>
              {/* School Dropdown */}
              <DropdownField
                label="School"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleSchoolChange}
                options={data?.schoolOptions || []}
                disabled={false}
              />

              {/* Faculty Dropdown */}
              <DropdownField
                label="Faculty"
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleFacultyChange}
                options={facultyOptions}
                disabled={!formData.school}
              />

              {/* Department Dropdown */}
              <DropdownField
                label="Department"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departmentOptions}
                disabled={!formData.faculty}
              />
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Reg No."
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="Registration Number"
            />
            
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-primary-custom mb-1">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-custom/20 focus:border-primary-custom"
              >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>

          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
          />

          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-primary-custom mb-1">
              Profile Picture
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-custom"
                />
              )}
              <label className="flex flex-col items-center justify-center w-full px-4 py-6 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-1 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={`w-full py-2 px-4 rounded-md transition-colors ${
              loading || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-custom text-white hover:bg-primary-custom/90'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-custom hover:underline">
            click here to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;