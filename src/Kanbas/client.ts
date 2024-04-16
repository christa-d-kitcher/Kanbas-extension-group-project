// Imports and Configuration
import axios from 'axios';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COURSES_API = `${BASE_API}/api/courses`;
axios.defaults.withCredentials = true;

// TypeScript Interface for Course
export interface Course {
  _id: string;
  id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description?: string;
  image?: string;
}

// CRUD API Functions with Improved Error Handling
export const findCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await axios.get(`${COURSES_API}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch course by ID');
  }
};

export const findAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(COURSES_API);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch all courses');
  }
};

export const createCourse = async (course: Course): Promise<Course> => {
  const { _id, ...newCourse } = course;
  try {
    const response = await axios.post(COURSES_API, newCourse);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create course');
  }
};

export const updateCourse = async (course: Course): Promise<Course> => {
  try {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update course');
  }
};

export const deleteCourse = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${COURSES_API}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete course');
  }
};

export const findCoursesByDepartment = async (department: string): Promise<Course[]> => {
  try {
    const response = await axios.get(`${COURSES_API}?department=${department}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch courses by department');
  }
};
