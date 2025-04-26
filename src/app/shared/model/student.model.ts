export interface Student {
  id?: string;
  objectId?: string;
  registrationNumber: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate?: Date;
  additionalInfo?: string;
  person?: Person;
  class?: Class;
  enrollment?: Enrollment;
  createdAt?: Date;
  updatedAt?: Date;
  sNo?: number;
  isSelected?: boolean;
}

export interface Person {
  id?: string;
  objectId?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  placeOfBirth?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

export interface Class {
  id?: string;
  objectId?: string;
  name: string;
  maxCapacity?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  institution?: Institution;
  academicYear?: AcademicYear;
  teachingType?: EducationType;
  siteInstitution?: Campus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Institution {
  id?: string;
  objectId?: string;
  name: string;
  registrationNumber?: string;
  description?: string;
  logo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademicYear {
  id?: string;
  objectId?: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EducationType {
  id?: string;
  objectId?: string;
  name_fr: string;
  name_en?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Campus {
  id?: string;
  objectId?: string;
  name: string;
  address?: string;
  geoPoint?: {
    latitude: number;
    longitude: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Enrollment {
  id?: string;
  objectId?: string;
  enrollmentDate: Date;
  isValid?: boolean;
  validationDate?: Date;
  academicYear?: AcademicYear;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Transfer {
  id?: string;
  objectId?: string;
  student: Student;
  fromClass: Class;
  toClass: Class;
  reason?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentFilter {
  keyword?: string;
  status?: string;
  classId?: string;
  institutionId?: string;
  academicYearId?: string;
}

export interface ClassFilter {
  keyword?: string;
  status?: string;
  institutionId?: string;
  academicYearId?: string;
  educationTypeId?: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
} 